import { NextPage } from "next";
import ArticleListPage from "../../components/ArticleListPage/ArticleListPage";
import { Article } from "../../lib/article";
import { getContent } from "../../lib/content-cache";

interface Props {
  category: string,
  articles: Article[]
}

interface Params {
  params: {
    category: string
  }
}

export async function getStaticPaths() {

  const content = await getContent();

  const categories = Array.from(new Set(content.articles
    .flatMap(article => article.metadata.categories))
    .values());

  return {
    paths: categories.map(category => ({ params: {
      category
    }})),
    fallback: false,
  };
}

export const getStaticProps = async ({ params }: Params) => {
  const {category} = params;
  const content = await getContent();
  const articles = content.articles
    .filter(article => article.metadata.categories.includes(category));

  return {
    props: {
      category, articles
    }
  }
}

const NextCategoryPage: NextPage<Props> = ({ category, articles }) => (
  <ArticleListPage title={category} subtitle="Category" articles={articles} />
);

export default NextCategoryPage;