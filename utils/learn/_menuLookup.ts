import { Menu } from '../../models/Menu';
import { Topic } from '../../models/Topic';
import { nodeMenu } from './node';
import { typescriptMenu } from './typescript';

export const _menuLookup = (topic: Topic): Menu | null => {
  const topicLowerCase = topic.toLowerCase();

  if (topicLowerCase === 'typescript') return typescriptMenu;
  else if (topicLowerCase === 'node') return nodeMenu;
  return null;
};
