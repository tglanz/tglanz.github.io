/**
 * Cache the content.
 * 
 * Even if we didn't cache it wouldn't have affect on the actual site.
 * The only effect is on NextJS build times.
 */
import path from 'path';
import { readContent, readContentInfo } from './content';

import config from '../config.json';

const CACHE_ENABLED = true;

const ContentDirectory = path.join(process.cwd(), config.content.path);

type AsyncProvider<T> = () => Promise<T>;

function lazyEvaluator<T>(asyncProvider: AsyncProvider<T>): AsyncProvider<T> {
  let value: T | null = null;

  return async () => {
    if (!CACHE_ENABLED) {
      return await asyncProvider();
    }

    if (value === null) {
      value = await asyncProvider();
    }

    return value;
  };
}

export const getContent = lazyEvaluator(async () => readContent(ContentDirectory));
export const getContentInfo = lazyEvaluator(async () => readContentInfo(ContentDirectory));
