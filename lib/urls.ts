import config from '../config.json';

const url = (...values: string[]) => values.join("/");

export const home = () => config.site.homePath;
export const taxonomyArticles = (taxonomy: string, value: string) => url(home(), `_${taxonomy.toLowerCase()}`, value);
export const tagArticles = (tag: string) => taxonomyArticles('tags', tag);
export const categroyArticles = (category: string) => taxonomyArticles('categories', category);
export const article = (articleId: string) => url(home(), '_articles', articleId);
