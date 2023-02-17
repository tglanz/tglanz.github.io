import { NextPage } from "next";
import ArticleListPage from "../../components/ArticleListPage/ArticleListPage";
import { ArticleInfo } from "../../lib/article";
import { getContent, getContentInfo } from "../../lib/content-cache";

interface Props {
  tag: string,
  articles: ArticleInfo[]
}

interface Params {
  params: {
    tag: string
  }
}

export async function getStaticPaths() {

  const content = await getContentInfo();

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
  const content = await getContentInfo();
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