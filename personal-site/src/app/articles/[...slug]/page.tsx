import { ArticleContent } from "@/components/ArticleContent/ArticleContent";
import Taxonomy from "@/components/Taxonomy/Taxonomy";
import { Article } from "@/lib/article";
import { getContent, getContentInfo } from "@/lib/content-cache";

import * as urls from '@/lib/urls';
import Link from "next/link";

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

  return (
    <div>
      <h1>{article.metadata.title}</h1>
      <Taxonomy taxonomy="tags" article={article} />
      <ArticleContent content={article.content}/>
    </div>
  );
}
