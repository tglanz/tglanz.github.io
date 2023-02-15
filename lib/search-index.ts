import { Article } from './article';
import Fuse from 'fuse.js';

export default class SearchIndex {

  indexedArticlesCount: number
  articlesFuse: Fuse<Article>

  constructor(articles: Article[]) {
    this.indexedArticlesCount = articles.length
    this.articlesFuse = new Fuse(articles, {
      keys: [
        "metadata.title",
        "metadata.description",
        "metadata.tags",
        "metadata.categories",
      ]
    })
  }

  searchArticles(pattern: string, limit: number): Article[] {
    return this.articlesFuse
      .search(pattern, { limit })
      .filter(item => item.score !== 0)
      .sort((a, b) => (a.score || 0) - (b.score || 0))
      .map(entry => entry.item);
  }
}