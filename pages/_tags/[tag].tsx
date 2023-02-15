import { GetStaticProps, NextPage } from "next";
import ArticleListPage from "../../components/ArticleListPage/ArticleListPage";
import { Article } from "../../lib/article";
import { getContent } from "../../lib/content-cache";

interface Props {
  tag: string,
  articles: Article[]
}

interface Params {
  params: {
    tag: string
  }
}

export async function getStaticPaths() {

  const content = await getContent();

  const tags = Array.from(new Set(content.articles
    .flatMap(article => article.metadata.tags))
    .values());

  return {
    paths: tags.map(tag => ({ params: {
      tag
    }})),
    fallback: false,
  };
}

export const getStaticProps = async ({ params }: Params) => {
  const {tag} = params;
  const content = await getContent();
  const articles = content.articles
    .filter(article => article.metadata.tags.includes(tag));

  return {
    props: {
      tag, articles
    }
  }
}

const NextTagPage: NextPage<Props> = ({ tag, articles }) => (
  <ArticleListPage title={tag} subtitle="Tag" articles={articles} />
);

export default NextTagPage;