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

const components = {};

export default function Learn({
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
  const learnDirectory = path.join('learn');

  const topicDirectories = fs.readdirSync(learnDirectory);

  const allPaths: {
    params: {
      topic: string;
      slug: string;
    };
  }[] = [];

  topicDirectories.forEach((topic: string) => {
    const topicDirectory = path.join(learnDirectory, topic);
    const files = fs.readdirSync(topicDirectory);

    files.forEach((fileName: string) => {
      const path = {
        params: {
          topic: topic,
          slug: fileName.replace('.mdx', ''),
        },
      };

      allPaths.push(path);
    });
  });

  return {
    paths: allPaths,
    fallback: false, // if access path/slug that doesn't exist -> 404 page
  };
};

type Params = {
  [param: string]: any;
};

export const getStaticProps: GetStaticProps<Params> = async ({
  params: { topic, slug },
}: Params) => {
  const learn = fs.readFileSync(path.join('learn', topic, slug + '.mdx'));

  const { data: metaData, content } = matter(learn);

  const mdxSource = await serialize(content, { scope: metaData });
  return { props: { source: mdxSource } };
};
