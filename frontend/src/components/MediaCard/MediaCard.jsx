// Displays a single media item with favorite toggle and selection support.

import { Box, Typography, IconButton, Checkbox } from '@mui/material';
import { Star, StarBorder, PlayArrow } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const Card = styled(Box)(({ selected }) => ({
  background: '#161B22',
  border: `1px solid ${selected === 'true' ? '#F0A500' : 'rgba(26,122,110,0.3)'}`,
  borderRadius: 8,
  overflow: 'hidden',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-4px)',
    borderColor: '#1A7A6E',
    boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
  },
}));

const ImageWrapper = styled(Box)({
  position: 'relative',
  width: '100%',
  height: 200,
  overflow: 'hidden',
});

const StyledImage = styled('img')({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  transition: 'transform 0.3s ease',
});

const VideoOverlay = styled(Box)({
  position: 'absolute',
  inset: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'rgba(0,0,0,0.3)',
});

const PlayButton = styled(Box)({
  background: 'rgba(240,165,0,0.9)',
  borderRadius: '50%',
  width: 48,
  height: 48,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const TypeBadge = styled(Box)({
  position: 'absolute',
  top: 10,
  right: 10,
  background: 'rgba(0,0,0,0.7)',
  color: '#fff',
  padding: '4px 10px',
  borderRadius: 12,
  fontSize: 11,
  fontWeight: 500,
});

const FavoriteButton = styled(IconButton)({
  position: 'absolute',
  top: 6,
  left: 6,
  background: 'rgba(0,0,0,0.7)',
  color: '#fff',
  width: 32,
  height: 32,
  '&:hover': {
    background: 'rgba(240,165,0,0.85)',
    color: '#000',
  },
});

const SelectCheckbox = styled(Checkbox)({
  position: 'absolute',
  bottom: 6,
  right: 6,
  color: '#fff',
  '&.Mui-checked': { color: '#F0A500' },
});

const CardInfo = styled(Box)({
  padding: '14px 16px',
});

function MediaCard({ item, isFavorite, isAuthenticated, isSelected, onSelect, onToggleFavorite, onToggleSelect }) {
  const thumbnailUrl = item.type === 'image'
    ? item.url
    : `https://picsum.photos/seed/${item.title}/800/600`;

  return (
    <Card
      selected={isSelected.toString()}
      onClick={() => onSelect(item)}
    >
      <ImageWrapper>
        <StyledImage src={thumbnailUrl} alt={item.title} />

        {item.type === 'video' && (
          <VideoOverlay>
            <PlayButton>
              <PlayArrow sx={{ color: '#000', fontSize: 24 }} />
            </PlayButton>
          </VideoOverlay>
        )}

        <TypeBadge>{item.type === 'video' ? '▶ Video' : '🖼 Image'}</TypeBadge>

        {isAuthenticated && (
          <FavoriteButton
            onClick={(e) => { e.stopPropagation(); onToggleFavorite(item); }}
            size="small"
          >
            {isFavorite
              ? <Star sx={{ fontSize: 16, color: '#F0A500' }} />
              : <StarBorder sx={{ fontSize: 16 }} />
            }
          </FavoriteButton>
        )}

        <SelectCheckbox
          checked={isSelected}
          onClick={(e) => { e.stopPropagation(); onToggleSelect(item); }}
          size="small"
        />
      </ImageWrapper>

      <CardInfo>
        <Typography variant="body2" color="#fff" fontWeight={500}>{item.title}</Typography>
        <Typography variant="caption" color="#8B949E">{item.category}</Typography>
      </CardInfo>
    </Card>
  );
}

export default MediaCard;