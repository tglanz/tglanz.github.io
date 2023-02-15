import path from 'path';
import fs from 'fs/promises';
import matter from 'gray-matter';

import config from '../config.json';
import * as matterDataRules from './matter-data-rules';

import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeDocument from 'rehype-document';
import rehypeFormat from 'rehype-format';
import rehypeStringify from 'rehype-stringify';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';

export interface MetadataAggregationStats {
  count: number
}

export interface MetadataAggregation {
  [key: string]: MetadataAggregationStats
}

export interface ArticleMetadata {
  title: string,
  description?: string,
  priority: number,
  permalink?: string,
  tags: string[],
  categories: string[],
}

export interface ArticleContent {
  raw: string,
  html: string,
}

export interface Article {
  id: string,
  filePath: string,
  metadata: ArticleMetadata,
  content: ArticleContent
}

function createArticleIdFromFilePath(filePath: string) {
  const relativePath = path.relative(config.content.path, filePath);
  const id = relativePath.replace(path.extname(relativePath), '');
  return encodeURI(id);
}

export async function readArticle(filePath: string): Promise<Article> {
  const fileBaseName = path.basename(filePath).replace(/(\.[^\.]+)$/, '')
  const articleContents = await fs.readFile(filePath);
  const articleMatter = matter(articleContents);

  const processedContent = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeHighlight)
    .use(rehypeDocument)
    .use(rehypeFormat)
    .use(rehypeStringify)
    .process(articleMatter.content);

  const contentHtml = processedContent.toString()

  const matterData = articleMatter.data;

  matterDataRules.apply(matterData,
    // matterDataRules.defaultTitle(fileBaseName[0].toUpperCase() + fileBaseName.substring(1)),
    // i'd rather not set a default title to allow articles without titles
    matterDataRules.defaultTitle(null),
    matterDataRules.defaultCategories(config.content.showUncategorized ? ["Uncategories"] : []),
    matterDataRules.defaultTags(config.content.showUntagged ? ["[Untagged]"] : []),
  )
 
  const metadata: ArticleMetadata = {
    title: matterData.title,
    description: matterData.description || null,
    permalink: matterData.permalink || null,
    priority: matterData.priority || 0,
    tags: matterData.tags || [],
    categories: matterData.categories || [],
  }

  return {
    id: metadata.permalink || createArticleIdFromFilePath(filePath),
    filePath,
    metadata,
    content: {
      raw: articleMatter.content,
      html: contentHtml,
    },
  };
}

export function aggregateMetadata(articles: Article[]) {
  let categories: MetadataAggregation = {};
  let tags: MetadataAggregation = {};

  articles.forEach(article => {
    article.metadata.categories.forEach(category => {
      categories[category] = categories[category] || {count: 0};
      categories[category].count += 1;
    });

    article.metadata.tags.forEach(tag => {
      tags[tag] = tags[tag] || {count: 0};
      tags[tag].count += 1;
    });
  });

  return { categories, tags };
}