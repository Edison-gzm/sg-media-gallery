// Navbar component. Displays category filters, presentation button and auth actions.

import { AppBar, Toolbar, Box, Typography, Button as MuiButton } from '@mui/material';
import { Slideshow } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { useNavigate, useLocation } from 'react-router-dom';
import useAuthStore from '../../states/useAuthStore';
import useGalleryStore from '../../states/useGalleryStore';
import Button from '../../atoms/Button/Button';

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

const ActionsWrapper = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: 12,
});

const CATEGORIES = ['All', 'Nature', 'Technology', 'Art'];

function Navbar({ isAuthenticated, selectedCount }) {
  const { logout } = useAuthStore();
  const { setActiveCategory } = useGalleryStore();
  const navigate = useNavigate();
  const location = useLocation();

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    if (category === 'Favorites') {
      navigate('/favorites');
    } else if (category === 'All') {
      navigate('/');
    } else {
      navigate(`/category/${category}`);
    }
  };

  const getActiveCategory = () => {
    if (location.pathname === '/favorites') return 'Favorites';
    if (location.pathname === '/') return 'All';
    const match = location.pathname.match(/\/category\/(.+)/);
    return match ? match[1] : 'All';
  };

  return (
    <StyledAppBar position="sticky">
      <Toolbar sx={{ justifyContent: 'space-between', flexWrap: 'wrap', gap: 1 }}>
        <Logo onClick={() => navigate('/')}>SG<span>Gallery</span></Logo>

        <CategoriesWrapper>
          {[...CATEGORIES, ...(isAuthenticated ? ['Favorites'] : [])].map(category => (
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
            onClick={() => navigate('/presentation')}
            sx={{ background: '#F0A500', color: '#000', '&:hover': { background: '#d4920a' } }}
          >
            {selectedCount > 0 ? `Present (${selectedCount})` : 'Presentation'}
          </Button>
          <Button
            variant="outlined"
            onClick={() => isAuthenticated ? logout() : navigate('/login')}
            sx={{ borderColor: '#1A7A6E', color: '#1A7A6E' }}
          >
            {isAuthenticated ? 'Sign Out' : 'Sign In'}
          </Button>
        </ActionsWrapper>
      </Toolbar>
    </StyledAppBar>
  );
}

export default Navbar;