import { FC } from 'react';

import { PaletteMode, useTheme } from '@mui/material';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Switch from '@mui/material/Switch';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

interface Props {
  mode: PaletteMode;
  onChange?: () => void;
}

const HeaderComponent: FC<Props> = ({ mode, onChange }) => {
  const customTheme = useTheme();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        style={{
          backgroundColor: customTheme.palette.background.paper,
          color: customTheme.palette.text.primary,
        }}
        position='static'
      >
        <Toolbar>
          <IconButton
            size='large'
            edge='start'
            color='inherit'
            aria-label='menu'
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
            Jon Peppinck
          </Typography>
          <Switch
            checked={mode === 'dark'}
            onChange={onChange}
            color='secondary'
          />
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default HeaderComponent;
