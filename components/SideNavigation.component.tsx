import Link from 'next/link';

import { FC, useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import CssBaseline from '@mui/material/CssBaseline';

import { useTheme } from '@mui/material';

import { Menu, MenuItem } from '../models/Menu';
import { LearnMetaData } from '../models/LearnMetaData.interface';

const drawerWidth = 240;

interface Props {
  menu: Menu;
  slug: string;
  metaData: LearnMetaData;
}

const SideNavigationComponent: FC<Props> = ({ menu, slug, metaData }) => {
  const customTheme = useTheme();

  const getInitialMenu = (menu: Menu) =>
    menu.map((menuItem: MenuItem) => ({ ...menuItem, isOpen: false }));

  const [activeMenu, setActiveMenu] = useState(getInitialMenu(menu));

  useEffect(() => {
    setActiveMenu(getInitialMenu(menu));
  }, [menu]);

  const getMenuItemStyle = (v1: string, v2: string = slug) => ({
    color:
      v1?.toLowerCase() === v2.toLowerCase()
        ? customTheme.palette.primary.main
        : customTheme.palette.text.primary,
    cursor: 'pointer',
  });

  const getIntroductionLI = () => {
    return (
      <Link
        href={`/learn/${metaData.section.toLowerCase()}/introduction`}
        passHref
      >
        <ListItem className='list-item' key={-1}>
          <ListItemText
            primary='Introduction'
            style={getMenuItemStyle('introduction')}
          />
        </ListItem>
      </Link>
    );
  };

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Drawer
          variant='permanent'
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
          }}
        >
          <Toolbar />
          <Box sx={{ overflow: 'auto', marginTop: '48px' }}>
            {getIntroductionLI()}
            <List>
              {activeMenu.map((menuItem: any, index: number) => {
                let [[label, subMenu], [isOpenKey, isOpen]] =
                  Object.entries(menuItem);

                const href =
                  (subMenu as string[]).length > 0
                    ? `/learn/${metaData.section.toLowerCase()}/${slug}`
                    : `/learn/${metaData.section.toLowerCase()}/${label.toLowerCase()}`;

                const section2 = (
                  <Link key={index} href={href} passHref>
                    <ListItem
                      className='list-item'
                      onClick={() => {
                        const am = [...activeMenu];
                        if ((am[index] as any)[label].length > 0) {
                          am[index] = { ...am[index], isOpen: !isOpen };
                          setActiveMenu(am);
                        }
                      }}
                      secondaryAction={
                        (Object.values(menuItem)[0] as string[]).length > 0 && (
                          <>
                            {menuItem.isOpen ? (
                              <KeyboardArrowUpIcon
                                style={{ cursor: 'pointer' }}
                                color='primary'
                              />
                            ) : (
                              <KeyboardArrowDownIcon
                                style={{ cursor: 'pointer' }}
                                color='primary'
                              />
                            )}
                          </>
                        )
                      }
                    >
                      <ListItemText
                        primary={label}
                        style={getMenuItemStyle(
                          metaData?.subSection || metaData.topic,
                          label
                        )}
                      />
                    </ListItem>
                  </Link>
                );

                const subSection2 = (subMenu as string[]).map(
                  (item: string, index: number) => {
                    return (
                      menuItem.isOpen && (
                        <Link
                          key={label + '_' + index}
                          href={`/learn/${metaData.section.toLowerCase()}/${item.toLowerCase()}`}
                          passHref
                        >
                          <ListItem className='list-item'>
                            <ListItemText
                              primary={'> ' + item}
                              style={getMenuItemStyle(item)}
                            />
                          </ListItem>
                        </Link>
                      )
                    );
                  }
                );
                return [section2, subSection2];
              })}
            </List>
          </Box>
        </Drawer>
      </Box>
      <style>
        {`
    .list-item:hover {
      background-color: rgba(9, 211, 173, 0.08)
    }
    `}
      </style>
    </>
  );
};

export default SideNavigationComponent;
