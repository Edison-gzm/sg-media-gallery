// Reusable badge atom built on top of Material UI Chip component.

import { Chip } from '@mui/material';

function Badge({ label, color = 'default', size = 'small', variant = 'filled' }) {
  return (
    <Chip
      label={label}
      color={color}
      size={size}
      variant={variant}
      sx={{
        fontWeight: 500,
        fontSize: '11px',
      }}
    />
  );
}

export default Badge;