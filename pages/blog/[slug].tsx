import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';

import { useEffect } from 'react';

import fs from 'fs';
import path from 'path';

import matter from 'gray-matter';

import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote } from 'next-mdx-remote';

import hljs from 'highlight.js';
import typescript from 'highlight.js/lib/languages/typescript';

import 'highlight.js/styles/vs2015.css';

hljs.registerLanguage('typescript', typescript);

import BlogHeaderComponent from '../../components/BlogHeader.component';
import TableOfContentsComponent from '../../components/TableOfContents.component';
import TableOfContentsItemComponent from '../../components/TableOfContentsItem.component';

const components = {
  BlogHeaderComponent,
  TableOfContentsComponent,
  TableOfContentsItemComponent,
};

export default function Article({
  source,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  useEffect(() => {
    hljs.highlightAll();
  }, []);

  return (
    <div style={{ width: '600px', margin: 'auto' }}>
      <MDXRemote {...source} components={components} />
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const articlesDirectory = path.join('articles');

  const files = fs.readdirSync(articlesDirectory);

  const paths = files.map((fileName: string) => ({
    params: {
      slug: fileName.replace('.mdx', ''),
    },
  }));

  return {
    paths,
    fallback: false, // if access path/slug that doesn't exist -> 404 page
  };
};

type Params = {
  [param: string]: any;
};

export const getStaticProps: GetStaticProps<Params> = async ({
  params: { slug },
}: Params) => {
  const article = fs.readFileSync(path.join('articles', slug + '.mdx'));

  const { data: metaData, content } = matter(article);

  const mdxSource = await serialize(content, { scope: metaData });
  return { props: { source: mdxSource } };
};
