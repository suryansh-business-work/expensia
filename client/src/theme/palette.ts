/**
 * Expensia - Professional Color Palette
 * Smooth, light, and modern design system
 */

export const palette = {
  // Primary Colors - Light and Professional
  primary: {
    main: '#8892a9',        // Sephiroth Grey - Main brand color
    light: '#b7bac3',       // Silver Springs - Light variant
    lighter: '#d2d6db',     // Angel Hair Silver - Very light
    lightest: '#e8eaec',    // Mourn Mountain Snow - Subtle backgrounds
    white: '#fdfdfd',       // Brilliance - Pure white
    dark: '#845c58',        // Book Binder - Accent/dark elements
  },

  // Background Colors
  background: {
    default: '#fdfdfd',     // Brilliance - Main background
    paper: '#ffffff',       // Pure white for cards
    subtle: '#e8eaec',      // Mourn Mountain Snow - Subtle sections
    hover: '#f5f6f7',       // Light hover state
  },

  // Text Colors
  text: {
    primary: '#2c3e50',     // Dark professional text
    secondary: '#8892a9',   // Sephiroth Grey - Secondary text
    muted: '#b7bac3',       // Silver Springs - Muted text
    light: '#d2d6db',       // Angel Hair Silver - Very light text
    accent: '#845c58',      // Book Binder - Accent text
  },

  // Border Colors
  border: {
    light: '#e8eaec',       // Mourn Mountain Snow
    default: '#d2d6db',     // Angel Hair Silver
    medium: '#b7bac3',      // Silver Springs
  },

  // Status Colors - Adapted to palette
  status: {
    success: {
      main: '#8892a9',
      light: '#b7bac3',
      bg: '#e8eaec',
    },
    error: {
      main: '#845c58',
      light: '#a87873',
      bg: '#f5eeed',
    },
    warning: {
      main: '#b7bac3',
      light: '#d2d6db',
      bg: '#e8eaec',
    },
    info: {
      main: '#8892a9',
      light: '#b7bac3',
      bg: '#e8eaec',
    },
  },

  // Gradient Combinations
  gradients: {
    primary: 'linear-gradient(135deg, #8892a9 0%, #b7bac3 100%)',
    subtle: 'linear-gradient(135deg, #e8eaec 0%, #fdfdfd 100%)',
    accent: 'linear-gradient(135deg, #845c58 0%, #8892a9 100%)',
    card: 'linear-gradient(145deg, #ffffff 0%, #fdfdfd 100%)',
    overlay: 'linear-gradient(to bottom, rgba(136, 146, 169, 0.05), rgba(255, 255, 255, 0))',
  },

  // Shadow Colors
  shadows: {
    light: 'rgba(136, 146, 169, 0.08)',
    medium: 'rgba(136, 146, 169, 0.12)',
    strong: 'rgba(136, 146, 169, 0.16)',
    subtle: 'rgba(232, 234, 236, 0.5)',
  },
};

/**
 * Material-UI Theme Configuration
 */
export const themeConfig = {
  palette: {
    mode: 'light' as const,
    primary: {
      main: palette.primary.main,
      light: palette.primary.light,
      dark: palette.primary.dark,
      contrastText: '#ffffff',
    },
    secondary: {
      main: palette.primary.dark,
      light: palette.primary.lighter,
      dark: palette.primary.main,
      contrastText: '#ffffff',
    },
    background: {
      default: palette.background.default,
      paper: palette.background.paper,
    },
    text: {
      primary: palette.text.primary,
      secondary: palette.text.secondary,
      disabled: palette.text.muted,
    },
    divider: palette.border.light,
    error: {
      main: palette.status.error.main,
      light: palette.status.error.light,
      dark: '#6b4a47',
      contrastText: '#ffffff',
    },
    success: {
      main: palette.primary.main,
      light: palette.primary.light,
      dark: '#6b7589',
      contrastText: '#ffffff',
    },
    warning: {
      main: palette.primary.light,
      light: palette.primary.lighter,
      dark: palette.primary.main,
      contrastText: '#2c3e50',
    },
    info: {
      main: palette.primary.main,
      light: palette.primary.light,
      dark: palette.primary.dark,
      contrastText: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 800,
      color: palette.text.primary,
    },
    h2: {
      fontWeight: 700,
      color: palette.text.primary,
    },
    h3: {
      fontWeight: 700,
      color: palette.text.primary,
    },
    h4: {
      fontWeight: 600,
      color: palette.text.primary,
    },
    h5: {
      fontWeight: 600,
      color: palette.text.primary,
    },
    h6: {
      fontWeight: 600,
      color: palette.text.primary,
    },
    body1: {
      color: palette.text.primary,
    },
    body2: {
      color: palette.text.secondary,
    },
  },
  shape: {
    borderRadius: 12,
  },
  shadows: [
    'none',
    `0 2px 4px ${palette.shadows.light}`,
    `0 4px 8px ${palette.shadows.light}`,
    `0 6px 12px ${palette.shadows.medium}`,
    `0 8px 16px ${palette.shadows.medium}`,
    `0 10px 20px ${palette.shadows.medium}`,
    `0 12px 24px ${palette.shadows.strong}`,
    `0 14px 28px ${palette.shadows.strong}`,
    `0 16px 32px ${palette.shadows.strong}`,
    `0 18px 36px ${palette.shadows.strong}`,
    `0 20px 40px ${palette.shadows.strong}`,
    `0 22px 44px ${palette.shadows.strong}`,
    `0 24px 48px ${palette.shadows.strong}`,
    `0 26px 52px ${palette.shadows.strong}`,
    `0 28px 56px ${palette.shadows.strong}`,
    `0 30px 60px ${palette.shadows.strong}`,
    `0 32px 64px ${palette.shadows.strong}`,
    `0 34px 68px ${palette.shadows.strong}`,
    `0 36px 72px ${palette.shadows.strong}`,
    `0 38px 76px ${palette.shadows.strong}`,
    `0 40px 80px ${palette.shadows.strong}`,
    `0 42px 84px ${palette.shadows.strong}`,
    `0 44px 88px ${palette.shadows.strong}`,
    `0 46px 92px ${palette.shadows.strong}`,
    `0 48px 96px ${palette.shadows.strong}`,
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none' as const,
          fontWeight: 600,
          borderRadius: 10,
          padding: '10px 24px',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: `0 6px 16px ${palette.shadows.medium}`,
          },
        },
        contained: {
          background: palette.gradients.primary,
          boxShadow: `0 4px 12px ${palette.shadows.medium}`,
          '&:hover': {
            boxShadow: `0 6px 20px ${palette.shadows.strong}`,
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: `0 4px 12px ${palette.shadows.light}`,
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: `0 8px 24px ${palette.shadows.medium}`,
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
        },
        elevation1: {
          boxShadow: `0 2px 8px ${palette.shadows.light}`,
        },
        elevation2: {
          boxShadow: `0 4px 12px ${palette.shadows.light}`,
        },
        elevation3: {
          boxShadow: `0 6px 16px ${palette.shadows.medium}`,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 600,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 10,
            transition: 'all 0.3s ease',
            '&:hover': {
              boxShadow: `0 2px 8px ${palette.shadows.light}`,
            },
            '&.Mui-focused': {
              boxShadow: `0 4px 12px ${palette.shadows.medium}`,
            },
          },
        },
      },
    },
  },
};

export default palette;
