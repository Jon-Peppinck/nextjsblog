import { Topic } from './../../models/Topic';

export interface TopicLogo {
  topic: Topic;
  logoUrl: string;
}

const topicLogo_Node: TopicLogo = {
  topic: 'Node',
  logoUrl: '/images/learn/node-logo-small.png',
};

const topicLogo_TS: TopicLogo = {
  topic: 'TypeScript',
  logoUrl: '/images/learn/typescript-logo-small.png',
};

export const allTopicLogos: TopicLogo[] = [topicLogo_Node, topicLogo_TS];
