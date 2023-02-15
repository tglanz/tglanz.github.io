import { Article } from "../../lib/article";
import ArticleCard from "../ArticleCard/ArticleCard";
import Headline from "../Headline";
import Layout from "../Layout/Layout";

export interface Props {
  title: string,
  subtitle: string,
  articles: Article[]
}

const ArticleListPage = ({ title, subtitle, articles }: Props) => (
  <>
    <Layout.Header>
      <Headline title={title} subtitle={subtitle} />
    </Layout.Header>
    <Layout.Main>
    {
      articles.map((article, index) => (
        <div key={index} className="my-8">
          <ArticleCard article={article} />
        </div>
      ))
    }
    </Layout.Main>
  </>
);

export default ArticleListPage;
