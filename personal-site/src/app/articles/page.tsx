import { ArticleInfo } from "@/lib/article";
import { getContentInfo } from "@/lib/content-cache";
import * as urls from "@/lib/urls";
import Link from "next/link";

export interface Props {

}

function ArticleListItem({ article }: { article: ArticleInfo }) {
  const { title, description } = article.metadata;
  return (
    <li>
      <Link href={urls.article(article.id)}>
        <div>{title}</div>
      </Link>
      {description && <small>{article.metadata.description}</small>}
    </li>
  )
}

export default async function Articles(_props: Props) {

  let contentInfo = await getContentInfo();
  const articles = contentInfo.articles
    .sort((a, b) => a.metadata.title?.localeCompare(b.metadata.title));

  return (
    <div>
      <h2>Articles</h2>
      <ul>
        {
          articles.map((article, idx) => (
            <ArticleListItem key={idx} article={article} />
          ))
        }
      </ul>
    </div>
  );
}
