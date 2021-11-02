import type { AppProps } from 'next/app';

import { useEffect, useMemo, useState } from 'react';
import {
  createTheme,
  PaletteMode,
  ThemeProvider,
  useTheme,
  CssBaseline,
  Typography,
  Badge,
  Box,
  Divider,
} from '@mui/material';

import MailIcon from '@mui/icons-material/Mail';

import '../styles/globals.css';
import HeaderComponent from '../Header.component';

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

      <Box
        display='flex'
        justifyContent='center'
        alignItems='center'
        minHeight='100vh'
      >
        <div>
          <Badge badgeContent={1} color='primary'>
            <MailIcon />
          </Badge>
          <Badge badgeContent={2} color='secondary'>
            <MailIcon />
          </Badge>
          <Badge badgeContent={3} color='info'>
            <MailIcon />
          </Badge>
          <Badge badgeContent={4} color='warning'>
            <MailIcon />
          </Badge>
          <Badge badgeContent={5} color='error'>
            <MailIcon />
          </Badge>
          <Badge badgeContent={6} color='success'>
            <MailIcon />
          </Badge>
          <div
            style={{ height: '400px', color: customTheme.palette.warning.dark }}
          >
            <Typography color='primary' variant='h1'>
              Jon Peppinck
            </Typography>
            <Typography color='secondary' variant='h3'>
              Web Developer
            </Typography>
            <Divider />
            <Typography variant='h4'>
              NextJS TypeScript Dark Mode Material UI
            </Typography>
          </div>
          <p>This is the first video - Creating a coding blog</p>
        </div>
      </Box>

      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
