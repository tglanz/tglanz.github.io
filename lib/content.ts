import { aggregateMetadata, Article, MetadataAggregation } from './article';
import { readArticle } from './article';

import * as path from 'path';
import * as fs from 'fs/promises';
import SearchIndex from './search-index';

export interface Content {
  articles: Article[],
  metadataAggregation: {
    tags: MetadataAggregation,
    categories: MetadataAggregation
  },
}

async function getFilesRecursivesly(directoryPath: string): Promise<string[]> {
  let ans: string[] = [];
  for (const entry of await fs.readdir(directoryPath)) {
    const entryPath = path.join(directoryPath, entry);
    const stat = await fs.lstat(entryPath);
    if (stat.isDirectory()) {
      const childs = await getFilesRecursivesly(entryPath);
      ans.push(...childs);
    } else {
      ans.push(entryPath);
    }
  }

  return ans;
}

export async function readContent(directoryPath: string) {
  const files = await getFilesRecursivesly(directoryPath);
  const articles = await Promise.all(files.map(readArticle));

  const metadataAggregation = aggregateMetadata(articles);

  return { articles, metadataAggregation };
}