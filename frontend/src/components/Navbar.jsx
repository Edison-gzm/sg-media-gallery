// Navbar component. Displays category filters, presentation button and auth actions.


import { useState } from 'react';
import {
  AppBar, Toolbar, Box, Typography, Button as MuiButton,
  IconButton, Drawer, List, ListItem, ListItemButton, ListItemText, Divider
} from '@mui/material';
import { Slideshow, Menu as MenuIcon, Close } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { useNavigate, useLocation } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';
import useGalleryStore from '../store/useGalleryStore';
import Button from '../atoms/Button/Button';

const StyledAppBar = styled(AppBar)({
  background: '#161B22',
  borderBottom: '1px solid rgba(26,122,110,0.3)',
  boxShadow: 'none',
});

const Logo = styled(Typography)({
  fontSize: 20,
  fontWeight: 700,
  color: '#1A7A6E',
  letterSpacing: '-0.5px',
  cursor: 'pointer',
  '& span': { color: '#F0A500' },
});

const CategoriesWrapper = styled(Box)({
  display: 'flex',
  gap: 8,
  flexWrap: 'wrap',
  justifyContent: 'center',
  flex: 1,
  padding: '0 16px',
  '@media (max-width: 768px)': {
    display: 'none',
  },
});

const ActionsWrapper = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: 12,
  '@media (max-width: 768px)': {
    display: 'none',
  },
});

const CategoryButton = styled(MuiButton)(({ active }) => ({
  background: active === 'true' ? '#1A7A6E' : 'transparent',
  border: '1px solid',
  borderColor: active === 'true' ? '#1A7A6E' : 'rgba(26,122,110,0.3)',
  color: active === 'true' ? '#fff' : '#8B949E',
  borderRadius: 20,
  padding: '6px 18px',
  fontSize: 14,
  textTransform: 'none',
  '&:hover': {
    background: active === 'true' ? '#145F56' : 'rgba(26,122,110,0.1)',
    borderColor: '#1A7A6E',
    color: '#fff',
  },
}));

const DrawerWrapper = styled(Box)({
  width: 280,
  background: '#161B22',
  height: '100%',
  padding: '16px',
});

const DrawerHeader = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: 16,
});

const HamburgerButton = styled(IconButton)({
  color: '#fff',
  display: 'none',
  '@media (max-width: 768px)': {
    display: 'flex',
  },
});

const CATEGORIES = ['All', 'Nature', 'Technology', 'Art'];

function Navbar({ isAuthenticated, selectedCount }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { logout } = useAuthStore();
  const { setActiveCategory } = useGalleryStore();
  const navigate = useNavigate();
  const location = useLocation();

const getActiveCategory = () => {
  if (location.pathname === '/favorites') return 'Favorites';
  const params = new URLSearchParams(location.search);
  const cat = params.get('category');
  return cat || 'All';
};

  const handleCategoryClick = (category) => {
  setActiveCategory(category);
  setDrawerOpen(false);
  if (category === 'Favorites') {
    navigate('/favorites');
  } else if (category === 'All') {
    navigate('/');
  } else {
    navigate(`/?category=${category}`); 
  }
};

  const handleAuthAction = () => {
    setDrawerOpen(false);
    if (isAuthenticated) {
      logout();
      navigate('/');
    } else {
      navigate('/login');
    }
  };

const handlePresentation = () => {
  setDrawerOpen(false);
  const { selectedItems, content, activeCategory } = useGalleryStore.getState();

  if (selectedItems.length > 0) {
     const ids = selectedItems.map(i => i.id).join(',');
     navigate(`/presentation?ids=${ids}`, { state: { fromApp: true } });
    } else if (location.pathname === '/favorites') {
      navigate('/presentation?category=Favorites', { state: { fromApp: true } });
    } else if (activeCategory && activeCategory !== 'All') {
      navigate(`/presentation?category=${activeCategory}`, { state: { fromApp: true } });
    } else {
      navigate('/presentation', { state: { fromApp: true } });
    }

};

  const allCategories = [...CATEGORIES, ...(isAuthenticated ? ['Favorites'] : [])];

  return (
    <>
      <StyledAppBar position="sticky">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Logo onClick={() => navigate('/')}>SG<span>Gallery</span></Logo>

          
          <CategoriesWrapper>
            {allCategories.map(category => (
              <CategoryButton
                key={category}
                active={(getActiveCategory() === category).toString()}
                onClick={() => handleCategoryClick(category)}
              >
                {category === 'Favorites' ? '★ Favorites' : category}
              </CategoryButton>
            ))}
          </CategoriesWrapper>

         
          <ActionsWrapper>
            <Button
              variant="contained"
              startIcon={<Slideshow />}
              onClick={handlePresentation}
              sx={{ background: '#F0A500', color: '#000', '&:hover': { background: '#d4920a' } }}
            >
              {selectedCount > 0 ? `Present (${selectedCount})` : 'Presentation'}
            </Button>
            <Button
              variant="outlined"
              onClick={handleAuthAction}
              sx={{ borderColor: '#1A7A6E', color: '#1A7A6E' }}
            >
              {isAuthenticated ? 'Sign Out' : 'Sign In'}
            </Button>
          </ActionsWrapper>
   
          {/* Navbar component with hamburger menu for mobile.*/}
          <HamburgerButton onClick={() => setDrawerOpen(true)}>
            <MenuIcon />
          </HamburgerButton>
        </Toolbar>
      </StyledAppBar>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{ sx: { background: '#161B22' } }}
      >
        <DrawerWrapper>
          <DrawerHeader>
            <Logo>SG<span>Gallery</span></Logo>
            <IconButton onClick={() => setDrawerOpen(false)} sx={{ color: '#fff' }}>
              <Close />
            </IconButton>
          </DrawerHeader>

          <Divider sx={{ borderColor: 'rgba(26,122,110,0.3)', mb: 2 }} />

        
          <List>
            {allCategories.map(category => (
              <ListItem key={category} disablePadding>
                <ListItemButton
                  onClick={() => handleCategoryClick(category)}
                  sx={{
                    borderRadius: 2,
                    mb: 0.5,
                    background: getActiveCategory() === category ? 'rgba(26,122,110,0.2)' : 'transparent',
                    color: getActiveCategory() === category ? '#1A7A6E' : '#8B949E',
                    '&:hover': { background: 'rgba(26,122,110,0.1)', color: '#fff' },
                  }}
                >
                  <ListItemText primary={category === 'Favorites' ? '★ Favorites' : category} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>

          <Divider sx={{ borderColor: 'rgba(26,122,110,0.3)', my: 2 }} />

         
          <Button
            fullWidth
            variant="contained"
            startIcon={<Slideshow />}
            onClick={handlePresentation}
            sx={{ background: '#F0A500', color: '#000', mb: 1, '&:hover': { background: '#d4920a' } }}
          >
            {selectedCount > 0 ? `Present (${selectedCount})` : 'Presentation'}
          </Button>

          <Button
            fullWidth
            variant="outlined"
            onClick={handleAuthAction}
            sx={{ borderColor: '#1A7A6E', color: '#1A7A6E' }}
          >
            {isAuthenticated ? 'Sign Out' : 'Sign In'}
          </Button>
        </DrawerWrapper>
      </Drawer>
    </>
  );
}

export default Navbar;