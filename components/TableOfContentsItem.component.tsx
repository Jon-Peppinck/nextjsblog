import { FC, ReactNode } from 'react';

interface Props {
  topic: string;
  children: ReactNode;
}

const TableOfContentsItemComponent: FC<Props> = ({ topic, children }) => {
  return (
    <section id={topic.toLowerCase()} className='section-heading'>
      <h2>{topic}</h2>
      <div>{children}</div>
    </section>
  );
};

export default TableOfContentsItemComponent;
