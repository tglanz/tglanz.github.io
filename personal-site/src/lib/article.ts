import path from 'path';
import fs from 'fs/promises';
import matter from 'gray-matter';

import config from '../config.json';
import * as matterDataRules from './matter-data-rules';

import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
// import remarkMermaid from 'remark-mermaidjs';
import remarkHint from 'remark-hint';
import remarkPlantUML from '@akebifiky/remark-simple-plantuml'
import rehypeDocument from 'rehype-document';
import rehypeFormat from 'rehype-format';
import rehypeStringify from 'rehype-stringify';
import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';
import rehypeWrapAll from 'rehype-wrap-all';
import rehypeToc from 'rehype-toc';
import remarkGfm from 'remark-gfm';

export interface MetadataAggregationStats {
  count: number
}

export interface MetadataAggregation {
  [key: string]: MetadataAggregationStats
}

export interface ArticleMetadata {
  title: string;
  description?: string;
  priority: number;
  toc: boolean;
  tags: string[];
  categories: string[];
  highlight: boolean;
  thumbnail?: string;
  contentLength: number;
}

export interface ArticleContent {
  raw: string;
  html: string;
}

export interface ArticleInfo {
  id: string;
  filePath: string;
  metadata: ArticleMetadata;
}

export interface Article extends ArticleInfo {
  content: ArticleContent
}

function createArticleIdFromFilePath(filePath: string) {
  const relativePath = path.relative(config.content.path, filePath);
  const id = relativePath.replace(path.extname(relativePath), '');
  return encodeURI(id);
}

function parseArticleInfo(filePath: string, articleContents: Buffer): ArticleInfo {
  const articleMatter = matter(articleContents);

  const matterData = articleMatter.data;

  matterDataRules.apply(matterData,
    matterDataRules.defaultTitle(null),
    // matterDataRules.defaultCategories(config.content.showUncategorized ? ["[Uncategorized]"] : []),
    // matterDataRules.defaultTags(config.content.showUntagged ? ["[Untagged]"] : []),
  )

  const metadata: ArticleMetadata = {
    title: matterData.title,
    description: matterData.description || null,
    priority: matterData.priority || 0,
    tags: matterData.tags || [],
    categories: matterData.categories || [],
    toc: matterData.toc == false ? false : true, // take into account that other or even empty strings
    highlight: matterData.highlight === true, // any other value than true is false
    thumbnail: matterData.thumbnail, // any other value than true is false
    contentLength: articleMatter.content.length,
  }

  return {
    id: createArticleIdFromFilePath(filePath),
    filePath,
    metadata,
  };
}

// Read only the core information of the articles - Imporantly, no content.
// Use it to reduce Processing/Space times.
export async function readArticleInfo(filePath: string): Promise<ArticleInfo> {
  const articleContents = await fs.readFile(filePath);
  return parseArticleInfo(filePath, articleContents);
}

export async function readArticle(filePath: string): Promise<Article> {
  const articleContents = await fs.readFile(filePath);
  const articleInfo = parseArticleInfo(filePath, articleContents);

  const articleMatter = matter(articleContents);

  const builder = unified();
  
  builder
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkPlantUML)
    .use(remarkHint)
    .use(remarkRehype)
    .use(rehypeWrapAll, {
      selector: "table",
      wrapper: "div.table-container",
    })
    // .use(rehypeWrapAll, {
    //   selector: "pre",
    //   wrapper: "div.pre-container",
    // })
    .use(rehypeHighlight, {
      ignoreMissing: true,
    })
    .use(rehypeDocument)
    .use(rehypeSlug);

  if (articleInfo.metadata.toc) {
    builder.use(rehypeToc, {
      nav: true,
      headings: ["h1", "h2"],
      cssClasses: {
        toc: "toc",
      }
    });
  }

  builder
    .use(rehypeFormat)
    .use(rehypeStringify);
  
  const processedContent = await builder.process(articleMatter.content);

  const contentHtml = processedContent.toString()

  return {
    ...articleInfo,
    content: {
      raw: articleMatter.content,
      html: contentHtml,
    },
  };
}

export function aggregateMetadata(articles: ArticleInfo[]) {
  let categories: MetadataAggregation = {};
  let tags: MetadataAggregation = {};

  articles.forEach(article => {
    article.metadata.categories.forEach(category => {
      categories[category] = categories[category] || { count: 0 };
      categories[category].count += 1;
    });

    article.metadata.tags.forEach(tag => {
      tags[tag] = tags[tag] || { count: 0 };
      tags[tag].count += 1;
    });
  });

  return { categories, tags };
}
