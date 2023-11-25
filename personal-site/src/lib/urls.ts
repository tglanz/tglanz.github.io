const url = (...values: string[]) => values.join("/");

export const home = () => "/";
export const tag = (tag: string) => url('/tags', tag);
export const categories = () => url('/categories');
export const category = (category: string) => url('/categories', category);
export const articles = () => url('/articles');
export const article = (articleId: string) => url('/articles', encodeURI(articleId));
export const search = (searchQuery: string) => url(home(), `_search?query=${searchQuery}`);