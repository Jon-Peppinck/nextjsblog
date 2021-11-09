import Link from 'next/link';

import { FC } from 'react';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { Post } from '../models/Post.interface';

const CardComponent: FC<{ post: Post }> = ({ post }: { post: Post }) => {
  const { slug, metaData } = post;
  const { title, dateString, mainImageUrl, excerpt } = metaData;
  return (
    <Card sx={{ maxWidth: 345, margin: 'auto', marginTop: 2 }}>
      <CardMedia component='img' height='200' image={mainImageUrl} />
      <CardContent>
        <Typography gutterBottom variant='h5' component='div'>
          {title}
        </Typography>
        <Typography variant='body2'>{dateString}</Typography>
        <Typography variant='body2' color='text.secondary'>
          {excerpt}
        </Typography>
      </CardContent>
      <CardActions>
        <Link href={`/blog/${slug}`} passHref>
          <Button size='small'>Read more</Button>
        </Link>
      </CardActions>
    </Card>
  );
};

export default CardComponent;
