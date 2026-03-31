// ImageViewer component. Displays a single image in a modal with interactive zoom.

import { useState } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { Close, ZoomIn, ZoomOut } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const Overlay = styled(Box)({
  position: 'fixed',
  inset: 0,
  background: 'rgba(0,0,0,0.85)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 500,
  padding: 24,
  animation: 'fadeIn 0.3s ease',
});

const Container = styled(Box)({
  background: '#161B22',
  border: '1px solid rgba(26,122,110,0.3)',
  borderRadius: 8,
  width: '100%',
  maxWidth: 800,
  overflow: 'hidden',
  position: 'relative',
  animation: 'scaleIn 0.25s ease',
});

const CloseButton = styled(IconButton)({
  position: 'absolute',
  top: 8,
  right: 8,
  background: 'rgba(0,0,0,0.6)',
  color: '#fff',
  zIndex: 10,
  '&:hover': {
    background: '#1A7A6E',
  },
});

const ImageWrapper = styled(Box)(({ zoomed }) => ({
  overflow: 'hidden',
  cursor: zoomed === 'true' ? 'zoom-out' : 'zoom-in',
  maxHeight: 500,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: '#000',
}));

const StyledImage = styled('img')(({ zoomed }) => ({
  width: '100%',
  maxHeight: 500,
  objectFit: 'contain',
  transition: 'transform 0.4s ease',
  transform: zoomed === 'true' ? 'scale(1.8)' : 'scale(1)',
}));

const InfoBar = styled(Box)({
  padding: '16px 20px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
});

const ZoomHint = styled(Typography)({
  fontSize: 11,
  color: '#8B949E',
});

function ImageViewer({ item, onClose }) {
  const [zoomed, setZoomed] = useState(false);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <Overlay onClick={handleOverlayClick}>
      <Container>
        <CloseButton onClick={onClose} size="small">
          <Close fontSize="small" />
        </CloseButton>

        <ImageWrapper
          zoomed={zoomed.toString()}
          onClick={() => setZoomed(!zoomed)}
        >
          <StyledImage
            src={item.url}
            alt={item.titulo}
            zoomed={zoomed.toString()}
          />
        </ImageWrapper>

        <InfoBar>
          <Box>
            <Typography variant="subtitle1" color="#fff" fontWeight={600}>
              {item.titulo}
            </Typography>
            <Typography variant="caption" color="#8B949E">
              {item.categoria}
            </Typography>
          </Box>
          <ZoomHint>
            {zoomed ? <ZoomOut sx={{ fontSize: 16, mr: 0.5 }} /> : <ZoomIn sx={{ fontSize: 16, mr: 0.5 }} />}
            {zoomed ? 'Click to zoom out' : 'Click to zoom in'}
          </ZoomHint>
        </InfoBar>
      </Container>
    </Overlay>
  );
}

export default ImageViewer;