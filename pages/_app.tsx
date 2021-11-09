import type { AppProps } from 'next/app';

import { useEffect, useMemo, useState } from 'react';
import {
  createTheme,
  PaletteMode,
  ThemeProvider,
  useTheme,
  CssBaseline,
} from '@mui/material';

import '../styles/globals.css';
import HeaderComponent from '../components/Header.component';

import {
  getStoredTheme,
  getThemeOptions,
  setStoredTheme,
} from '../utils/theme';

function MyApp({ Component, pageProps }: AppProps) {
  const [mode, setMode] = useState<PaletteMode>('dark'); // default is dark mode

  useEffect(() => {
    const storedTheme = getStoredTheme();

    if (storedTheme) {
      setMode(storedTheme);
    }
  }, []);

  // Update the theme only if it changes
  const theme = useMemo(() => createTheme(getThemeOptions(mode)), [mode]);

  const customTheme = useTheme(); // for use in other components - could potentially use theme

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <HeaderComponent
        mode={mode}
        onChange={() => {
          const newMode: PaletteMode = mode === 'dark' ? 'light' : 'dark';
          setMode(newMode);
          setStoredTheme(newMode);
        }}
      />

      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
