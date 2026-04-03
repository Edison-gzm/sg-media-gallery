// Reusable button atom built on top of Material UI Button component.

import { Button as MuiButton } from '@mui/material';

function Button({ children, variant = 'contained', color = 'primary', onClick, disabled, fullWidth, size = 'medium', startIcon, type = 'button' }) {
  return (
    <MuiButton
      type={type}
      variant={variant}
      color={color}
      onClick={onClick}
      disabled={disabled}
      fullWidth={fullWidth}
      size={size}
      startIcon={startIcon}
    >
      {children}
    </MuiButton>
  );
}

export default Button;