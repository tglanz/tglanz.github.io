import path from 'path';
import { readContent } from './content';

import config from '../config.json';

const ContentDirectory = path.join(process.cwd(), config.content.path);

type AsyncProvider<T> = () => Promise<T>;

function lazyEvaluator<T>(asyncProvider: AsyncProvider<T>): AsyncProvider<T> {
  let value: T | null = null;

  return async () => {
    if (value === null) {
      value = await asyncProvider();
    }

    return value;
  };
}

export const getContent = lazyEvaluator(async () => readContent(ContentDirectory));