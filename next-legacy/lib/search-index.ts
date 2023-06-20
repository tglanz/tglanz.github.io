import { ArticleInfo } from './article';
import Fuse from 'fuse.js';

interface CanonizedArticleInfo {
  articleInfo: ArticleInfo
  abbreviations: string[]
}

const abbreviationMap = {
  "kubernetes": ["k8s"],
  "elasticsearch": ["es"],
}

const makeAbbreviations = (articleInfo: ArticleInfo): string[] => {
  let set = new Set<string>();

  const flat = [
    articleInfo.metadata.title,
    articleInfo.metadata.description,
    articleInfo.metadata.tags.join(" "),
    articleInfo.metadata.categories.join(" ")
  ]
    .join(" ")
    .toLowerCase()

  Object.entries(abbreviationMap).forEach(([keyword, abbreviations]) => {
    if (flat.includes(keyword)) {
      abbreviations.forEach(abbreviation => set.add(abbreviation));
    }
  });

  return Array.from(set);
}

const canonizeArticleInfo = (articleInfo: ArticleInfo): CanonizedArticleInfo => ({
  articleInfo,
  abbreviations: makeAbbreviations(articleInfo),
});

export default class SearchIndex {

  indexedArticlesCount: number
  articlesFuse: Fuse<CanonizedArticleInfo>

  constructor(articles: ArticleInfo[]) {
    const canonized = articles.map(canonizeArticleInfo);
    this.indexedArticlesCount = articles.length
    this.articlesFuse = new Fuse(canonized, {
      isCaseSensitive: false,
      includeScore: true,
      threshold: 0.3,
      keys: [
        "articleInfo.metadata.title",
        "articleInfo.metadata.description",
        "articleInfo.metadata.tags",
        "articleInfo.metadata.categories",
        "abbreviations"
      ]
    })
  }

  searchArticles(pattern: string, limit: number): ArticleInfo[] {
    return this.articlesFuse
      .search(pattern, { limit })
      .filter(item => item.score !== 0)
      .sort((a, b) => (a.score || 0) - (b.score || 0))
      .map(entry => entry.item.articleInfo);
  }
}