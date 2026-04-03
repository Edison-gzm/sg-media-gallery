// Login page. Handles user authentication and redirects to gallery on success.

import { useState } from 'react';
import { useNavigate,useLocation  } from 'react-router-dom';
import { Box, Paper, Typography, Alert } from '@mui/material';
import { LockOutlined, ArrowBack  } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import useAuthStore from '../../store/useAuthStore';
import Input from '../../atoms/Input/Input';
import Button from '../../atoms/Button/Button';

const PageWrapper = styled(Box)({
  minHeight: '100vh',
  background: '#0D1117',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 16,
});

const LoginCard = styled(Paper)({
  background: '#161B22',
  border: '1px solid rgba(26,122,110,0.3)',
  borderRadius: 8,
  padding: 32,
  width: '100%',
  maxWidth: 400,
});

const CardHeader = styled(Box)({
  textAlign: 'center',
  marginBottom: 24,
});

const FormWrapper = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
});

const CredentialsBox = styled(Box)({
  marginTop: 24,
  padding: 12,
  background: 'rgba(26,122,110,0.1)',
  border: '1px solid rgba(26,122,110,0.3)',
  borderRadius: 4,
  textAlign: 'center',
});

const HighlightText = styled('span')({
  color: '#1A7A6E',
  fontWeight: 500,
}); 

const BackButton = styled('button')({
  display: 'flex',
  alignItems: 'center',
  gap: 6,
  background: 'none',
  border: 'none',
  color: '#8B949E',
  cursor: 'pointer',
  fontSize: 14,
  padding: '0 0 16px 0',
  transition: 'color 0.2s',
  '&:hover': {
    color: '#1A7A6E',
  },
});

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      const destination = location.state?.from?.pathname + (location.state?.from?.search || '');
      navigate(destination || '/');
    } catch {
      setError('Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageWrapper>
      <LoginCard elevation={3}>

        <BackButton onClick={() => navigate('/')}>
          <ArrowBack sx={{ fontSize: 16 }} />
            Back to Gallery
          </BackButton>
        <CardHeader>
          <LockOutlined sx={{ fontSize: 40, color: '#1A7A6E', mb: 1 }} />
          <Typography variant="h5" color="#fff" fontWeight={700}>
            Sign In
          </Typography>
          <Typography variant="body2" color="#8B949E" mt={1}>
            Sign in to save your favorites
          </Typography>
        </CardHeader>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        <FormWrapper component="form" onSubmit={handleSubmit}>
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit" 
            fullWidth 
            disabled={loading}
            >
            {loading ? 'Signing in...' : 'Sign In'}
          </Button>
        </FormWrapper>

        <CredentialsBox>
          <Typography variant="caption" color="#8B949E">
            Test credentials: <HighlightText>usuario@sg.com</HighlightText> / <HighlightText>1234</HighlightText>
          </Typography>
        </CredentialsBox>
      </LoginCard>
    </PageWrapper>
  );
}

export default LoginPage;