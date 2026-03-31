// Main gallery page. Displays content grid with category filtering and favorites management.

import { useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { Box, Container, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import useGalleryStore from '../../states/useGalleryStore';
import useFavoritesStore from '../../states/useFavoritesStore';
import useAuthStore from '../../states/useAuthStore';
import Navbar from '../../components/Navbar/Navbar';
import MediaCard from '../../components/MediaCard/MediaCard';
import ImageViewer from '../../components/ImageViewer/ImageViewer';
import VideoViewer from '../../components/VideoViewer/VideoViewer';
import { useState } from 'react';

const PageWrapper = styled(Box)({
  minHeight: '100vh',
  background: '#0D1117',
});

const ContentGrid = styled(Box)({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
  gap: 20,
  padding: '32px 0',
  '@media (max-width: 768px)': {
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: 12,
  },
  '@media (max-width: 480px)': {
    gridTemplateColumns: '1fr',
  },
});

const EmptyState = styled(Box)({
  textAlign: 'center',
  padding: '80px 24px',
  color: '#8B949E',
});

function GalleryPage() {
  const [selectedItem, setSelectedItem] = useState(null);
  const { category } = useParams();
  const location = useLocation();
  const { content, loading, fetchContent, selectedItems, toggleSelectItem, isSelected } = useGalleryStore();
  const { fetchFavorites, toggleFavorite, isFavorite } = useFavoritesStore();
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    fetchContent();
  }, [fetchContent]);

  useEffect(() => {
    if (isAuthenticated) fetchFavorites();
  }, [isAuthenticated, fetchFavorites]);

  const getFilteredContent = () => {
    if (location.pathname === '/favorites') {
      return content.filter(item => isFavorite(item.id));
    }
    if (category) {
      return content.filter(item => item.category === category);
    }
    return content;
  };

  const filteredContent = getFilteredContent();

  return (
    <PageWrapper>
      <Navbar
        isAuthenticated={isAuthenticated}
        selectedCount={selectedItems.length}
      />

      <Container maxWidth="xl">
        {loading ? (
          <EmptyState>
            <Typography variant="h6">Loading gallery...</Typography>
          </EmptyState>
        ) : filteredContent.length === 0 ? (
          <EmptyState>
            <Typography variant="h6">No content in this category</Typography>
          </EmptyState>
        ) : (
          <ContentGrid>
            {filteredContent.map(item => (
              <MediaCard
                key={item.id}
                item={item}
                isFavorite={isFavorite(item.id)}
                isAuthenticated={isAuthenticated}
                isSelected={isSelected(item.id)}
                onSelect={setSelectedItem}
                onToggleFavorite={toggleFavorite}
                onToggleSelect={toggleSelectItem}
              />
            ))}
          </ContentGrid>
        )}
      </Container>

      {selectedItem?.type === 'image' && (
        <ImageViewer item={selectedItem} onClose={() => setSelectedItem(null)} />
      )}
      {selectedItem?.type === 'video' && (
        <VideoViewer item={selectedItem} onClose={() => setSelectedItem(null)} />
      )}
    </PageWrapper>
  );
}

export default GalleryPage;