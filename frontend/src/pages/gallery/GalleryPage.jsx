// Main gallery page. Displays content grid with category filtering and favorites management.

import { useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Box, Container, Typography,Pagination} from '@mui/material';
import { styled } from '@mui/material/styles';
import useGalleryStore from '../../store/useGalleryStore';
import useFavoritesStore from '../../store/useFavoritesStore';
import useAuthStore from '../../store/useAuthStore';
import Navbar from '../../components/Navbar';
import MediaCard from '../../components/MediaCard';
import ImageViewer from '../../components/ImageViewer';
import VideoViewer from '../../components/VideoViewer';
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

const PaginationWrapper = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  padding: '32px 0',
  '& .MuiPaginationItem-root': {
    color: '#8B949E',
    borderColor: 'rgba(26,122,110,0.3)',
  },
  '& .MuiPaginationItem-root.Mui-selected': {
    background: '#1A7A6E',
    color: '#fff',
  },
});

function GalleryPage() {
  const [selectedItem, setSelectedItem] = useState(null);
  const location = useLocation();
  const { content, loading, fetchContent, selectedItems, toggleSelectItem, isSelected, pagination, setPage } = useGalleryStore();
  const { fetchFavorites, toggleFavorite, isFavorite } = useFavoritesStore();
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    fetchContent(1);
  }, [fetchContent]);

  useEffect(() => {
    if (isAuthenticated) fetchFavorites();
  }, [isAuthenticated, fetchFavorites]);

 useEffect(() => {
  const params = new URLSearchParams(location.search);
  const cat = params.get('category');
  fetchContent(1, cat);
}, [location.search, location.pathname, fetchContent]);


const getFilteredContent = () => {
  if (!content) return [];
  if (location.pathname === '/favorites') {
    const { favorites } = useFavoritesStore.getState();
    return favorites.map(f => f.Content || f.content).filter(Boolean);
  }
  const params = new URLSearchParams(location.search);
  const cat = params.get('category');
  if (cat) {
    return content.filter(item => item.category === cat);
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
        ) : filteredContent.length === 0 && !loading ? (
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
            {(() => {
              const isFavorites = location.pathname === '/favorites';
              const { pagination: favPagination, setFavoritesPage } = useFavoritesStore.getState();
              const totalPages = isFavorites ? favPagination.totalPages : pagination.totalPages;
              const currentPage = isFavorites ? favPagination.page : pagination.page;

              return totalPages > 1 ? (
                <PaginationWrapper>
                  <Pagination
                    count={totalPages}
                    page={currentPage}
                    onChange={(e, page) => {
                      if (isFavorites) {
                        setFavoritesPage(page);
                      } else {
                        const params = new URLSearchParams(location.search);
                        const cat = params.get('category');
                        setPage(page, cat);
                      }
                    }}
                    variant="outlined"
                    shape="rounded"
                  />
                </PaginationWrapper>
              ) : null;
            })()}

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