import { PaletteMode } from '@mui/material';
import { ThemeOptions } from '@mui/material/styles';

const primaryPalette = {
  main: '#09D3AD',
  light: '#3ADBBD',
  dark: '#069379',
  contrastText: '#FFFFFF',
};

const secondaryPalette = {
  main: '#F50057',
  light: '#F73378',
  dark: '#AB003C',
  contrastText: '#FFFFFF',
};

const errorPalette = {
  main: '#F44336',
  light: '#E57373',
  dark: '#D32F2F',
  contrastText: '#FFFFFF',
};

const warningPalette = {
  main: '#FF9800',
  light: '#FFB74D',
  dark: '#F57C00',
  contrastText: '#000000',
};

const infoPalette = {
  main: '#2196f3',
  light: '#64b5f6',
  dark: '#1976d2',
  contrastText: '#FFFFFF',
};

const successPalette = {
  main: '#4caf50',
  light: '#81c784',
  dark: '#388e3c',
  contrastText: '#000000',
};

const lightThemeOptions: ThemeOptions = {
  palette: {
    background: {
      default: '#FFFFFF',
      paper: '#EBEDF0',
    },
    text: {
      primary: '#1C1E21',
      secondary: '#606770',
      disabled: '#6A737D',
    },
    primary: primaryPalette,
    secondary: secondaryPalette,
    error: errorPalette,
    warning: warningPalette,
    info: infoPalette,
    success: successPalette,
  },
};

const darkThemeOptions: ThemeOptions = {
  palette: {
    background: {
      default: '#18191A',
      paper: '#242526',
    },
    text: {
      primary: '#F5F6F7',
      secondary: '#DADDE1',
      disabled: '#6A737D',
    },
    primary: primaryPalette,
    secondary: secondaryPalette,
    error: errorPalette,
    warning: warningPalette,
    info: infoPalette,
    success: successPalette,
  },
};

export const getThemeOptions = (mode: PaletteMode): ThemeOptions => {
  if (mode === 'dark') return darkThemeOptions;
  return lightThemeOptions;
};

export const getStoredTheme = (): PaletteMode | null => {
  return localStorage.getItem('user-theme') as PaletteMode | null;
};

export const setStoredTheme = (mode: PaletteMode): void => {
  localStorage.setItem('user-theme', mode);
};
