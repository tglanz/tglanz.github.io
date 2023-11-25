import { ArticleInfo } from "@/lib/article";
import { getContentInfo } from "@/lib/content-cache";
import * as urls from "@/lib/urls";
import Link from "next/link";

export interface Params {
  category: string;
}

export interface Props {
  params: Params
}

export const metadata = {
  title: "Categories",
}

export async function generateStaticParams() {
  const contentInfo = await getContentInfo();
  const categories = Object.keys(contentInfo.metadataAggregation.categories);
  // hack
  return categories.map(category => ({ category: encodeURIComponent(encodeURIComponent(category)) }));
}

async function getCategoryArticleInfos(category: string) {
  const contentInfo = await getContentInfo();
  const articles = contentInfo.articles
    .filter(article => article.metadata.categories?.includes(category))
  return articles;
}

function ArticleListItem({ article }: { article: ArticleInfo }) {
  return (
    <>
      <Link href={urls.article(article.id)}>
        {article.metadata.title}
      </Link>
    </>
  );
}

export default async function Category(props: Props) {
  const category = decodeURIComponent(props.params.category);
  const articles = await getCategoryArticleInfos(category);

  return (
    <div>
      <h2>Category: {category}</h2>

      <ul>
        {
          articles.map((article, idx) => (
            <li key={idx}>
              <ArticleListItem article={article} />
            </li>
          ))
        }
      </ul>
    </div>
  );
}
