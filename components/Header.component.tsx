import Link from 'next/link';

import { FC, useState, useRef } from 'react';

import { PaletteMode, useTheme } from '@mui/material';

import Popover from '@mui/material/Popover';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Switch from '@mui/material/Switch';
import IconButton from '@mui/material/IconButton';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import YouTubeIcon from '@mui/icons-material/YouTube';

import { makeStyles } from '@mui/styles';

import LearnMenuComponent from './LearnMenu.component';

interface Props {
  mode: PaletteMode;
  onChange?: () => void;
}

const useStyles = makeStyles(() => ({
  popover: {
    pointerEvents: 'none',
  },
  popoverContent: {
    pointerEvents: 'auto',
  },
}));

const HeaderComponent: FC<Props> = ({ mode, onChange }) => {
  const customTheme = useTheme();

  const [openedPopover, setOpenedPopover] = useState(false);

  const popoverAnchor = useRef(null);

  const classes = useStyles();

  const popoverEnter = () => {
    setOpenedPopover(true);
  };

  const popoverLeave = () => {
    setOpenedPopover(false);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position='fixed'
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        style={{
          backgroundColor: customTheme.palette.background.paper,
          color: customTheme.palette.text.primary,
        }}
      >
        <Toolbar>
          <Link href='/' passHref>
            <IconButton
              size='large'
              edge='start'
              color='inherit'
              aria-label='menu'
              sx={{ mr: 2 }}
            >
              <img src='/images/logo/JP-logo-small.gif' alt='JP-logo' />
            </IconButton>
          </Link>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: 'flex', width: 'auto' }}>
            <Typography
              onMouseEnter={popoverEnter}
              onMouseLeave={popoverLeave}
              style={{ cursor: 'pointer' }}
              variant='h6'
              component={'span'}
              ref={popoverAnchor}
              aria-owns={openedPopover ? 'mouse-over-popover' : undefined}
              aria-haspopup='true'
            >
              Learn
              <KeyboardArrowDownIcon
                color='primary'
                sx={{
                  verticalAlign: 'middle',
                  display: 'inline-flex',
                  marginRight: '20px',
                }}
              />
            </Typography>
            <Popover
              container={popoverAnchor.current}
              className={classes.popover}
              id='mouse-over-popover'
              classes={{ paper: classes.popoverContent }}
              open={openedPopover}
              anchorEl={popoverAnchor.current}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
              transformOrigin={{ vertical: 'top', horizontal: 'left' }}
              PaperProps={{
                onMouseEnter: popoverEnter,
                onMouseLeave: popoverLeave,
              }}
            >
              <LearnMenuComponent />
            </Popover>
            <Link href='/blog' passHref>
              <Typography
                variant='h6'
                style={{ cursor: 'pointer', marginRight: '20px' }}
              >
                Blog
              </Typography>
            </Link>
            <a
              style={{
                color: customTheme.palette.text.primary,
                textDecoration: 'none',
              }}
              target='_blank'
              href='https://www.youtube.com/c/JonPeppinck/videos?sub_confirmation=1'
              rel='noopener noreferrer'
            >
              <Typography
                variant='h6'
                style={{ cursor: 'pointer', marginRight: '20px' }}
              >
                YouTube{' '}
                <YouTubeIcon
                  color='secondary'
                  sx={{
                    fontSize: '40px',
                    verticalAlign: 'top',
                    display: 'inline-flex',
                    marginTop: '-4px',
                  }}
                />
              </Typography>
            </a>
            <Switch
              checked={mode === 'dark'}
              onChange={onChange}
              color='primary'
            />
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default HeaderComponent;
