// VideoViewer component. Displays a single video in a modal with autoplay support.

import { useRef, useEffect } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';
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

const VideoWrapper = styled(Box)({
  width: '100%',
  background: '#000',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const InfoBar = styled(Box)({
  padding: '16px 20px',
});

function VideoViewer({ item, onClose }) {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
    }
  }, [item]);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <Overlay onClick={handleOverlayClick}>
      <Container>
        <CloseButton onClick={onClose} size="small">
          <Close fontSize="small" />
        </CloseButton>

        <VideoWrapper>
          <video
            ref={videoRef}
            controls
            autoPlay
            style={{ width: '100%', maxHeight: 500, objectFit: 'contain' }}
          >
            <source src={item.url} type="video/mp4" />
          </video>
        </VideoWrapper>

        <InfoBar>
          <Typography variant="subtitle1" color="#fff" fontWeight={600}>
            {item.titulo}
          </Typography>
          <Typography variant="caption" color="#8B949E">
            {item.categoria}
          </Typography>
        </InfoBar>
      </Container>
    </Overlay>
  );
}

export default VideoViewer;