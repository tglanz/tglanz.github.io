const url = (...values: string[]) => values.join("/");

export const home = () => "";
export const category = (category: string) => url('categories', category);
export const article = (articleId: string) => url(home(), 'articles', articleId);
export const search = (searchQuery: string) => url(home(), `_search?query=${searchQuery}`);