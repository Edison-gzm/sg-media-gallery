// Reusable input atom built on top of Material UI TextField component.

import { TextField } from '@mui/material';

function Input({ label, type = 'text', value, onChange, placeholder, required, fullWidth = true, error, helperText }) {
  return (
    <TextField
      label={label}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      fullWidth={fullWidth}
      error={error}
      helperText={helperText}
      variant="outlined"
      size="small"
      sx={{
        '& .MuiOutlinedInput-root': {
          color: '#fff',
          '& fieldset': { borderColor: 'rgba(26,122,110,0.3)' },
          '&:hover fieldset': { borderColor: '#1A7A6E' },
          '&.Mui-focused fieldset': { borderColor: '#1A7A6E' },
        },
        '& .MuiInputLabel-root': { color: '#8B949E' },
        '& .MuiInputLabel-root.Mui-focused': { color: '#1A7A6E' },
      }}
    />
  );
}

export default Input;