import { ArticleContent } from "@/components/ArticleContent/ArticleContent";
import { Article } from "@/lib/article";
import { getContent, getContentInfo } from "@/lib/content-cache";

export interface Params {
  slug: string[];
}

export interface Props {
  params: Params
}

export const metadata = {
  title: "Article",
}

export async function generateStaticParams() {
  const contentInfo = await getContentInfo();
  return contentInfo.articles
    .map(article => ({
      articleId: article.id.split('/'),
    }));
}

async function findArticle(slug: string[]): Promise<Article> {
  const articleId = slug.join('/');
  const content = await getContent();
  return content.articles.find(article => article.id === articleId)!;
}

export default async function Article(props: Props) {
  const slug = props.params.slug.map(decodeURIComponent);
  const article = await findArticle(slug);
  const title = article.metadata.title;

  return (
    <div>
      <h3>{title}</h3>

      <ArticleContent content={article.content}/>
    </div>
  );
}
