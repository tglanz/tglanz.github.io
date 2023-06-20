import { NextPage } from "next";
import ArticleListPage from "../../components/ArticleListPage/ArticleListPage";
import { ArticleInfo } from "../../lib/article";
import { getContent, getContentInfo } from "../../lib/content-cache";

interface Props {
  category: string,
  articles: ArticleInfo[]
}

interface Params {
  params: {
    category: string
  }
}

export async function getStaticPaths() {

  const content = await getContentInfo();

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
  const content = await getContentInfo();
  const articles = content.articles
    .filter(article => article.metadata.categories.includes(category))
    .sort((a, b) => a.metadata.priority - b.metadata.priority);

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