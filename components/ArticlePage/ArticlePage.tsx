import { Article } from "../../lib/article";
import ArticleContent from "../ArticleContent/ArticleContent";
import Headline from "../Headline";
import hljs from "highlight.js";

import {renderMath} from '../../lib/math';

import TaxonomyLinks from "../TaxonomoyLinks";
import { useEffect } from "react";
import Layout from "../Layout/Layout";

export interface Props {
  article: Article
}

const ArticlePage = ({ article }: Props) => {

  useEffect(() => {
    renderMath();
    hljs.highlightAll();
  });

  return (
    <>
      { article.metadata.title && <Layout.Header>
        <Headline title={article.metadata.title} subtitle={""} />
      </Layout.Header> }

      <Layout.Main>
        {article.metadata.description
          ? <p>{article.metadata.description}</p>
          : undefined}
    
        <div className="text-sm m-4">
          {article.metadata.categories.length > 0
            ? <TaxonomyLinks taxonomy="Categories" values={article.metadata.categories} />
            : null}

          {article.metadata.tags.length > 0
            ? <TaxonomyLinks taxonomy="Tags" values={article.metadata.tags} />
            : null}
        </div>
    
        <ArticleContent content={article.content} />
      </Layout.Main>
    </>
  );
};

export default ArticlePage;