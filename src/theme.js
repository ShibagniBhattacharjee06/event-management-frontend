import { createTheme } from '@mui/material/styles';

const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          // APPLE LIGHT MODE - Enhanced
          primary: {
            main: '#007AFF', // System Blue
            light: '#5AC8FA',
            dark: '#0062CC',
            contrastText: '#fff',
          },
          secondary: {
            main: '#5856D6', // Purple
          },
          background: {
            default: '#FFFFFF',
            paper: '#F5F5F7', // Apple Frosted Gray
            subtle: '#E5E5EA', // Silver
          },
          text: {
            primary: '#1D1D1F', // Almost Black
            secondary: '#86868B', // Apple Gray Text
            disabled: '#D1D1D6',
          },
          action: {
            hover: 'rgba(0, 0, 0, 0.04)',
            selected: 'rgba(0, 0, 0, 0.08)',
          },
          divider: '#E5E5EA',
        }
      : {
          // APPLE DARK MODE - Enhanced
          primary: {
            main: '#0A84FF', // Dark Mode Blue
            light: '#64D2FF',
            dark: '#0066CC',
            contrastText: '#fff',
          },
          secondary: {
            main: '#5E5CE6',
          },
          background: {
            default: '#000000',
            paper: '#1C1C1E', // Space Gray
            subtle: '#2C2C2E', // Deep Slate
          },
          text: {
            primary: '#F5F5F7', // Off White
            secondary: '#86868B',
            disabled: '#48484A',
          },
          action: {
            hover: 'rgba(255, 255, 255, 0.08)',
            selected: 'rgba(255, 255, 255, 0.12)',
          },
          divider: '#38383A',
        }),
  },
  typography: {
    fontFamily: [
      '"Inter"',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    h1: {
      fontSize: '3.5rem', // 56px
      fontWeight: 700,
      lineHeight: 1.07,
      letterSpacing: '-0.02em',
      '@media (min-width:600px)': {
        fontSize: '4.5rem', // 72px
      },
    },
    h2: {
      fontSize: '2.5rem', // 40px
      fontWeight: 600,
      lineHeight: 1.1,
      letterSpacing: '-0.015em',
      '@media (min-width:600px)': {
        fontSize: '3rem', // 48px
      },
    },
    h3: {
      fontSize: '2rem', // 32px
      fontWeight: 600,
      lineHeight: 1.16,
      letterSpacing: '-0.01em',
    },
    h4: {
      fontSize: '1.5rem', // 24px
      fontWeight: 600,
      lineHeight: 1.25,
      letterSpacing: '0.005em',
    },
    h5: {
      fontSize: '1.25rem', // 20px
      fontWeight: 600,
    },
    h6: {
      fontSize: '1.125rem', // 18px
      fontWeight: 600,
    },
    subtitle1: {
      fontSize: '1.25rem', // 20px
      fontWeight: 400,
      lineHeight: 1.4,
      letterSpacing: '0.01em',
    },
    body1: {
      fontSize: '1.0625rem', // 17px
      lineHeight: 1.5,
      letterSpacing: '-0.01em',
    },
    body2: {
      fontSize: '0.9375rem', // 15px
      lineHeight: 1.5,
      letterSpacing: '-0.01em',
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
      fontSize: '1.0625rem', // 17px
    },
  },
  shape: {
    borderRadius: 12, // More rounded, Apple-style
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '980px', // Pill shape
          padding: '10px 24px',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
        containedPrimary: {
          background: mode === 'light' ? '#007AFF' : '#0A84FF',
          '&:hover': {
             background: mode === 'light' ? '#0062CC' : '#0066CC',
          }
        },
        sizeLarge: {
          padding: '14px 32px',
          fontSize: '1.125rem',
        }
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
        elevation1: {
          boxShadow: mode === 'light' 
            ? '0 4px 20px rgba(0,0,0,0.05)' 
            : '0 4px 20px rgba(0,0,0,0.4)',
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          maxWidth: '1280px !important', // Similar to Apple's max-content width
        }
      }
    }
  },
});

export const lightTheme = createTheme(getDesignTokens('light'));
export const darkTheme = createTheme(getDesignTokens('dark'));
