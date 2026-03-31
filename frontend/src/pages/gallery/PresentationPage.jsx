// Presentation page. Auto-plays selected or all content sequentially.

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, IconButton } from '@mui/material';
import { Close, ArrowBack, ArrowForward } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import useGalleryStore from '../../states/useGalleryStore';
import Input from '../../atoms/Input/Input';
import Button from '../../atoms/Button/Button';

const PageWrapper = styled(Box)({
  position: 'fixed',
  inset: 0,
  background: '#000',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 900,
});

const Header = styled(Box)({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '16px 24px',
  background: 'linear-gradient(to bottom, rgba(0,0,0,0.8), transparent)',
});

const ContentWrapper = styled(Box)({
  width: '100%',
  maxWidth: 900,
  padding: '80px 24px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const StyledImage = styled('img')({
  maxWidth: '100%',
  maxHeight: '70vh',
  objectFit: 'contain',
  borderRadius: 8,
});

const ProgressBar = styled(Box)({
  position: 'absolute',
  bottom: 0,
  left: 0,
  height: 3,
  background: '#1A7A6E',
});

function PresentationPage() {
  const [index, setIndex] = useState(0);
  const [duration, setDuration] = useState(4);
  const [progress, setProgress] = useState(0);
  const { content, selectedItems, clearSelection } = useGalleryStore();
  const navigate = useNavigate();

  // Use selected items if any, otherwise use all content
  const items = selectedItems.length > 0 ? selectedItems : content;
  const currentItem = items[index];

    useEffect(() => {
      if (!currentItem || currentItem.type === 'video') return;

      const interval = setInterval(() => {
        const nextIndex = index + 1;
        // If we reached the end, exit presentation
        if (nextIndex >= items.length) {
          clearSelection();
          navigate(-1);
          return;
        }
        setIndex(nextIndex);
        setProgress(0);
      }, duration * 1000);

      const progressInterval = setInterval(() => {
        setProgress(prev => Math.min(prev + (100 / (duration * 10)), 100));
      }, 100);

      return () => { clearInterval(interval); clearInterval(progressInterval); };
    }, [index, duration, items, currentItem]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') { clearSelection(); navigate('/'); }
      if (e.key === 'ArrowRight') setIndex(prev => (prev + 1) % items.length);
      if (e.key === 'ArrowLeft') setIndex(prev => (prev - 1 + items.length) % items.length);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [items, navigate, clearSelection]);

  if (!currentItem) return null;

  const handleExit = () => {
    clearSelection();
    navigate('/');
  };

  return (
    <PageWrapper>
      <Header>
        <Typography variant="body2" color="#8B949E">
          {index + 1} / {items.length}
          {selectedItems.length > 0 && ' (selected)'}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: '#8B949E' }}>
          <Typography variant="body2">Duration:</Typography>
          <Input type="number" value={duration} onChange={(e) => setDuration(Number(e.target.value))} fullWidth={false} />
          <Typography variant="body2">sec</Typography>
        </Box>

        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          <IconButton onClick={() => setIndex(prev => (prev - 1 + items.length) % items.length)} sx={{ color: '#fff' }}>
            <ArrowBack />
          </IconButton>
          <IconButton onClick={() => setIndex(prev => (prev + 1) % items.length)} sx={{ color: '#fff' }}>
            <ArrowForward />
          </IconButton>
          <Button variant="outlined" onClick={handleExit} startIcon={<Close />}>Exit</Button>
        </Box>
      </Header>

      <ContentWrapper>
        {currentItem.type === 'image' ? (
          <StyledImage key={currentItem.id} src={currentItem.url} alt={currentItem.title} />
        ) : (
          <video
            key={currentItem.id}
            controls
            autoPlay
            style={{ width: '100%', maxHeight: '70vh', objectFit: 'contain' }}
            onEnded={() => {
              const nextIndex = index + 1;
              if (nextIndex >= items.length) {
                clearSelection();
                navigate(-1);
              } else {
                setIndex(nextIndex);
              }
            }}
          >
            <source src={currentItem.url} type="video/mp4" />
          </video>
        )}
      </ContentWrapper>

      <Typography
        variant="h6"
        sx={{
          position: 'absolute',
          bottom: 40,
          left: '50%',
          transform: 'translateX(-50%)',
          color: '#fff',
          fontWeight: 600,
          textShadow: '0 2px 8px rgba(0,0,0,0.8)',
          whiteSpace: 'nowrap',
        }}
      >
        {currentItem.title}
      </Typography>

      {currentItem.type === 'image' && (
        <ProgressBar style={{ width: `${progress}%`, transition: `width ${duration}s linear` }} />
      )}
    </PageWrapper>
  );
}

export default PresentationPage;