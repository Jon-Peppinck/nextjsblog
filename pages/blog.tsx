import { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import { ChangeEvent, useEffect, useState } from 'react';

import fs from 'fs';
import path from 'path';

import matter from 'gray-matter';

import { TextField, Typography, Chip, Stack, Paper } from '@mui/material';

import SearchIcon from '@mui/icons-material/Search';

import CardComponent from '../components/Card.component';

import { Post } from '../models/Post.interface';
import { Tag, tagFilters } from '../models/Tag';

const Blog: NextPage = ({
  posts,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [filteredPosts, setFilteredPosts] = useState<Post[]>(posts);
  const [postTitles, setPostTitles] = useState<string[]>(
    posts.map((post: Post) => post.metaData.title.toLowerCase())
  );
  const [searchString, setSearchString] = useState('');
  const [isAllTag, setIsAllTag] = useState(true);
  const [tags, setTags] = useState<Tag[]>([]);

  useEffect(() => {
    const filteredPostsTitles: string[] = [...postTitles].filter(
      (title: string) => title.indexOf(searchString.trim().toLowerCase()) !== -1
    );

    const refilteredPosts: Post[] = [...posts].filter((post: Post) =>
      filteredPostsTitles.includes(post.metaData.title.toLowerCase())
    );

    setFilteredPosts(refilteredPosts);
  }, [searchString, postTitles, posts]);

  useEffect(() => {
    if (tags.length > 0) {
      setIsAllTag(false);
    } else {
      setIsAllTag(true);
    }
  }, [tags]);

  return (
    <div style={{ paddingTop: '72px', marginBottom: '48px' }}>
      <Typography align='center' color='primary' variant='h1'>
        Blog
      </Typography>
      <Paper
        component='form'
        sx={{ width: 400, margin: '20px auto', boxShadow: 0 }}
      >
        <TextField
          style={{ width: 400 }}
          placeholder='Search...'
          value={searchString}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setSearchString(e.target.value)
          }
          InputProps={{
            startAdornment: (
              <SearchIcon style={{ fontSize: 30, marginRight: 8 }} />
            ),
            style: { fontSize: 20 },
          }}
        />
      </Paper>
      <Paper
        sx={{
          height: 50,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '20px auto',
          boxShadow: 0,
        }}
      >
        <Stack direction='row' spacing={1}>
          <Chip
            onClick={() => {
              setTags([]);
              setIsAllTag(true);
            }}
            label='All'
            variant='outlined'
            color={isAllTag ? 'secondary' : 'default'}
          />
          {tagFilters.map((tag: Tag, index: number) => (
            <Chip
              onClick={() => {
                if (!tags.includes(tag)) {
                  setTags([...tags, tag]);
                } else {
                  const selectedTags = [...tags].filter(
                    (selectedTag: Tag) => selectedTag !== tag
                  );
                  setTags(selectedTags);
                }
              }}
              key={index}
              label={tag}
              variant='outlined'
              color={tags.includes(tag) ? 'secondary' : 'default'}
            />
          ))}
        </Stack>
      </Paper>

      <div style={{ display: 'flex' }}>
        {filteredPosts.map((post: Post, index: number) => {
          if (
            !isAllTag &&
            post.metaData.tags.some((tag: Tag) => tags.includes(tag))
          ) {
            return <CardComponent key={index} post={post} />;
          } else if (isAllTag) {
            return <CardComponent key={index} post={post} />;
          }
        })}
      </div>
    </div>
  );
};

export default Blog;

export const getStaticProps: GetStaticProps = async () => {
  const articlesDirectory = path.join('articles');

  const files = fs.readdirSync(articlesDirectory);

  const blogPosts: Post[] = files.map((fileName: string) => {
    const slug = fileName.replace('.mdx', '');
    const article = fs.readFileSync(path.join('articles', fileName));
    const { data: metaData } = matter(article);
    return { slug, metaData } as Post;
  });

  return {
    props: {
      posts: blogPosts.sort(
        (a: Post, b: Post) =>
          new Date(b.metaData.dateString).valueOf() -
          new Date(a.metaData.dateString).valueOf()
      ),
    },
  };
};
