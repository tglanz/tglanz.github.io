import { ArticleInfo } from "../../lib/article";
import Headline from "../Headline";


import { ChangeEvent, useEffect, useRef, useState } from "react";
import { ContentInfo } from "../../lib/content";
import SearchIndex from "../../lib/search-index";
import ArticleCard from "../ArticleCard/ArticleCard";
import Layout from "../Layout/Layout";

export interface Props {
  contentInfo: ContentInfo
  initialQuery: string
}

const SearchPage = ({ contentInfo, initialQuery }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchIndex, setSearchIndex] = useState(new SearchIndex([]));
  const [articles, setArticles] = useState<ArticleInfo[]>([]);
  const [query, setQuery] = useState<string>("");

  useEffect(() => {
    inputRef.current?.focus();
  })

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  useEffect(() => {
    const newSearchIndex = new SearchIndex(contentInfo.articleInfos);
    setSearchIndex(newSearchIndex);
  }, [contentInfo]);

  useEffect(() => {
    const foundArticles = searchIndex.searchArticles(query, searchIndex.indexedArticlesCount);
    setArticles(foundArticles);
  }, [query]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  }

  return (
    <>
      <Layout.Header>
        <Headline title="Search" subtitle="" />
        <div className="m-4 flex flex-col justify-center items-center">
          <input ref={inputRef} className="text-input" type="text" value={query} onChange={handleInputChange} />
        </div>
      </Layout.Header>

      <Layout.Main>

        <div>
          {articles.map((articleInfo, index) => (
            <ArticleCard key={index} articleInfo={articleInfo} />
          ))}
        </div>
      </Layout.Main>
    </>
  );
};

export default SearchPage;