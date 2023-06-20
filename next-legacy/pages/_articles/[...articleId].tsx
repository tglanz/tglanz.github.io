import { NextPage } from "next";
import ArticlePage from "../../components/ArticlePage/ArticlePage";
import { Article } from "../../lib/article";
import { getContent } from "../../lib/content-cache";

interface Props {
  article: Article
}

interface Params {
  params: {
    articleId: string[]
  }
}

export async function getStaticPaths() {
  const content = await getContent();
  const articleIds = Array.from(new Set(content.articles.map(article => article.id)).values());

  return {
    paths: articleIds.map(articleId => ({ params: {
      articleId: articleId.split('/')
    }})),
    fallback: false,
  };
}

export const getStaticProps = async ({ params }: Params) => {
  const {articleId} = params;
  const content = await getContent();

  const article = content.articles.find(article => article.id === articleId.join("/"));

  return {
    props: {
      article
    }
  }
}

const NextCategoryPage: NextPage<Props> = ({ article }) => (
  <ArticlePage article={article} />
);

export default NextCategoryPage;