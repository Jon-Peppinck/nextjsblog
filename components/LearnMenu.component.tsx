import Link from 'next/link';

import { FC } from 'react';

import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';

import { TopicLogo, allTopicLogos } from '../utils/learn/topicLogos';

const LearnMenuComponent: FC = () => {
  return (
    <>
      <Paper sx={{ width: 320, maxWidth: '100%' }}>
        <MenuList>
          {allTopicLogos.map((topic: TopicLogo, index: number) => (
            <Link
              key={index}
              href={`/learn/${topic.topic.toLowerCase()}/introduction`}
              passHref
            >
              <MenuItem
                className='menu-item'
                sx={{
                  height: '50px',
                }}
              >
                <img
                  style={{ marginRight: '20px' }}
                  src={topic.logoUrl}
                  alt='topic-logo'
                />
                <Typography variant='body1' color='text.secondary'>
                  {topic.topic}
                </Typography>
              </MenuItem>
            </Link>
          ))}
        </MenuList>
      </Paper>
      <style>{`
          .menu-item:hover {
            background-color: rgba(9, 211, 173, 0.08);
          }
        `}</style>
    </>
  );
};

export default LearnMenuComponent;
