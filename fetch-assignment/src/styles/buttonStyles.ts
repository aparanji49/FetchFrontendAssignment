// styles/buttonStyles.ts

export const primaryButton = {
  bgcolor: '#000000',                  // Black background
  color: '#ffffff',                    // White text
  fontWeight: 'bold',
  borderRadius: '10px',
  boxShadow: '0 2px 6px rgba(0, 0, 0, 0.2)',
  px: 3,
  '&:hover': {
    bgcolor: '#333333',                // Dark grey on hover
    boxShadow: '0 3px 8px rgba(0, 0, 0, 0.3)',
  },
};

export const secondaryButton = {
  bgcolor: '#f5f5f5',                  // Light grey background
  color: '#000000',                    // Dark grey text
  border: '1px solidrgb(0, 0, 0)',         // Medium grey border
  fontWeight: 'bold',
  borderRadius: '10px',
  px: 3,
  '&:hover': {
    bgcolor: '#e0e0e0',                // Slightly darker grey on hover
    borderColor: '#999999',
  },
};
