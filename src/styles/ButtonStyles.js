

export const buttonStyles = {
  primary: {
    padding: '8px 16px',
    backgroundColor: 'primary.main',
    color: 'text.light',
    borderRadius: 2,
    '&:hover': {
      backgroundColor: 'secondary.main',
      color:'text.dark'
    },
    textDecoration: 'none'
  },
  secondary: {
    borderColor: 'primary.main',
    color: 'text.dark',
    '&:hover': {
      backgroundColor: 'secondary.main',
      color: 'text.dark'
    },
  },  
  critical: {
    borderColor: 'critical.main',
    backgroundColor: 'critical.main',
    color: 'text.light',
    '&:hover': {
      backgroundColor: 'secondary.main',
      color: 'text.dark'
    },
  },
  
};