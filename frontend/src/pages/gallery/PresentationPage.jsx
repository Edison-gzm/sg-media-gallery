// Presentation page. Auto-plays selected or all content sequentially.

import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, useLocation  } from 'react-router-dom';
import { Box, Typography, IconButton } from '@mui/material';
import { Close, ArrowBack, ArrowForward } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import useGalleryStore from '../../store/useGalleryStore';
import Input from '../../atoms/Input/Input';
import Button from '../../atoms/Button/Button';
import useFavoritesStore from '../../store/useFavoritesStore';
import { getContentById } from '../../api/content.api';

const PageWrapper = styled(Box)({
  position: 'fixed',
  inset: 0,
  background: '#000',
  display: 'grid',
  gridTemplateRows: 'auto 1fr auto',
  zIndex: 900,
  overflow: 'hidden',
});

const Header = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '12px 20px',
  background: 'linear-gradient(to bottom, rgba(0,0,0,0.8), transparent)',
  gap: 8,
  '@media (max-width: 768px)': {
    padding: '8px 12px',
  },
});

const MiddleRow = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  overflow: 'hidden',
  padding: '0 12px',
  '@media (max-width: 768px)': {
    padding: '0 4px',
  },
});

const NavArrow = styled(IconButton)({
  color: '#fff',
  background: 'rgba(255,255,255,0.08)',
  flexShrink: 0,
  width: 48,
  height: 48,
  '&:hover': { background: 'rgba(255,255,255,0.18)' },
  '@media (max-width: 768px)': {
    width: 36,
    height: 36,
    '& svg': { fontSize: 20 },
  },
});

const MediaArea = styled(Box)({
  flex: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden',
  padding: '0 8px',
  height: '80%',
});

const StyledImage = styled('img')({
  maxWidth: '100%',
  maxHeight: '100%',
  objectFit: 'contain',
  borderRadius: 8,
});

const BottomBar = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 6,
  padding: '8px 16px 14px',
});

const ProgressBar = styled(Box)({
  height: 3,
  background: '#1A7A6E',
  borderRadius: 2,
});

function PresentationPage() {
  const [searchParams] = useSearchParams();
  const routerLocation = useLocation(); 

  const [index, setIndex] = useState(0);
  const [duration, setDuration] = useState(4);
  const [progress, setProgress] = useState(0);
  const [urlItems, setUrlItems] = useState([]);
  const [cameFromUrl] = useState(() => { 
    return !!searchParams.get('ids') && !routerLocation.state?.fromApp;
  });
  const { content, selectedItems, clearSelection, fetchContent } = useGalleryStore();
  const navigate = useNavigate();
  const { favorites, fetchFavorites } = useFavoritesStore();

    const items = (() => {
      const ids = searchParams.get('ids');
      const category = searchParams.get('category');

      if (ids) return urlItems.length > 0 ? urlItems : selectedItems;
      if (category === 'Favorites') {
        return favorites.map(f => f.Content || f.content).filter(Boolean);
      }
      if (category) return content.filter(item => item.category === category);
      if (selectedItems.length > 0) return selectedItems;
      return content;
    })();

  const currentItem = items[index];

      useEffect(() => {
        const ids = searchParams.get('ids');
        if (ids) {
          const idList = ids.split(',').map(Number);
          Promise.all(idList.map(id => getContentById(id)))
            .then(responses => setUrlItems(responses.map(r => r.data)))
            .catch(err => console.error('Error loading items by id:', err));
        } else {
          if (content.length === 0) fetchContent();
        }
        if (favorites.length === 0) fetchFavorites();
      }, []);

    useEffect(() => {
    if (!currentItem) return;
    if (currentItem.type === 'video') return;

    const interval = setInterval(() => {
      const nextIndex = index + 1;
      if (nextIndex >= items.length) {
        clearSelection();
        cameFromUrl ? navigate('/') : navigate(-1);
        return;
      }
      setIndex(nextIndex);
      setProgress(0);
    }, duration * 1000);

    const progressInterval = setInterval(() => {
      setProgress(prev => Math.min(prev + (100 / (duration * 10)), 100));
    }, 100);

    return () => { clearInterval(interval); clearInterval(progressInterval); };
  }, [index, duration, currentItem]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') { clearSelection(); navigate('/'); }
      if (e.key === 'ArrowRight') {
      if (index === items.length - 1) { clearSelection(); cameFromUrl ? navigate('/') : navigate(-1); }
        else setIndex(prev => prev + 1);
      }
      if (e.key === 'ArrowLeft') setIndex(prev => Math.max(prev - 1, 0));
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [items, navigate, clearSelection]);

  if (!currentItem && items.length === 0) return null;
  if (!currentItem && items.length > 0) { clearSelection(); cameFromUrl ? navigate('/') : navigate(-1); return null; }

    const handleExit = () => {
    clearSelection();
    cameFromUrl ? navigate('/') : cameFromUrl ? navigate('/') : navigate(-1);
  };

  return (
    <PageWrapper>
      <Header>
        <Typography variant="body2" color="#8B949E" sx={{ whiteSpace: 'nowrap', minWidth: 40 }}>
          {index + 1} / {items.length}
          {selectedItems.length > 0 && ' (sel)'}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: '#8B949E' }}>
          <Typography variant="body2">Duration:</Typography>
          <Input
            type="number"
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            fullWidth={false}
            sx={{ width: 60 }}
          />
          <Typography variant="body2">sec</Typography>
        </Box>

        <Button variant="outlined" onClick={handleExit} startIcon={<Close />}
          sx={{ whiteSpace: 'nowrap' }}>
          Exit
        </Button>
      </Header>

      <MiddleRow>
        <NavArrow onClick={() => setIndex(prev => Math.max(prev - 1, 0))}>
          <ArrowBack />
        </NavArrow>

        <MediaArea>
          {currentItem.type === 'image' ? (
            <StyledImage key={currentItem.id} src={currentItem.url} alt={currentItem.title} />
          ) : (
            <video
              key={currentItem.id}
              controls
              autoPlay
              style={{
                maxWidth: '100%',
                maxHeight: '100%',
                width: '100%',
                objectFit: 'contain',
                borderRadius: 8,
              }}
              onEnded={() => {
                const nextIndex = index + 1;
                if (nextIndex >= items.length) { clearSelection(); cameFromUrl ? navigate('/') : navigate(-1) ; }
                else setIndex(nextIndex);
              }}
            >
              <source src={currentItem.url} type="video/mp4" />
            </video>
          )}
        </MediaArea>

        <NavArrow onClick={() => {
            if (index === items.length - 1) { clearSelection(); cameFromUrl ? navigate('/') : navigate(-1); }
            else setIndex(prev => prev + 1);
          }}>
          <ArrowForward />
        </NavArrow>
      </MiddleRow>

      <BottomBar>
        <Typography
          variant="h6"
          sx={{
            color: '#fff',
            fontWeight: 600,
            textShadow: '0 2px 8px rgba(0,0,0,0.8)',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            maxWidth: '80vw',
            fontSize: { xs: 14, sm: 18 },
          }}
        >
          {currentItem.title}
        </Typography>

        {currentItem.type === 'image' && (
          <Box sx={{
            width: '100%',
            maxWidth: 300,
            height: 3,
            background: 'rgba(255,255,255,0.1)',
            borderRadius: 2,
            overflow: 'hidden',
          }}>
            <ProgressBar style={{ width: `${progress}%` }} />
          </Box>
        )}
      </BottomBar>
    </PageWrapper>
  );
}

export default PresentationPage;