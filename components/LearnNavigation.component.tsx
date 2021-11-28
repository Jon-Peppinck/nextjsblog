import Link from 'next/link';

import { FC } from 'react';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import { useTheme } from '@mui/material';

import { Topic } from '../models/Topic';

interface Props {
  topic: Lowercase<Topic>;
}

const LearnNavigationComponent: FC<Props> = ({ topic }) => {
  const customTheme = useTheme();

  const menuItemActive = {
    cursor: 'pointer',
    background: customTheme.palette.primary.light,
    color: customTheme.palette.primary.contrastText,
    height: '48px',
    lineHeight: '48px',
  };

  const menuItem = {
    padding: '0 8px',
    '&:hover': menuItemActive,
  };

  return (
    <AppBar
      position='fixed'
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        top: '64px',
        backgroundColor: customTheme.palette.primary.dark,
        color: customTheme.palette.primary.contrastText,
      }}
    >
      <Toolbar style={{ minHeight: '48px' }}>
        <Link href='/learn/typescript/introduction' passHref>
          <Typography
            style={
              topic === 'typescript'
                ? { ...menuItemActive, marginLeft: '216px' }
                : { marginLeft: '216px' }
            }
            sx={menuItem}
            variant='h6'
          >
            TYPESCRIPT
          </Typography>
        </Link>
        <Link href='/learn/node/introduction' passHref>
          <Typography
            style={topic === 'node' ? { ...menuItemActive } : {}}
            sx={menuItem}
            variant='h6'
          >
            NODE
          </Typography>
        </Link>
      </Toolbar>
    </AppBar>
  );
};

export default LearnNavigationComponent;
