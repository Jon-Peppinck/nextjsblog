import { Tag } from './Tag';

export interface MetaData {
  title: string;
  dateString: string;
  mainImageUrl: string;
  excerpt: string;
  tags: Tag[];
}
