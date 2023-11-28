import { ArticleInfo } from "@/lib/article";
import { getContentInfo } from "@/lib/content-cache";
import * as urls from "@/lib/urls";
import Link from "next/link";

export interface Params {
  tag: string;
}

export interface Props {
  params: Params
}

export const metadata = {
  title: "Tag",
}

export async function generateStaticParams() {
  const contentInfo = await getContentInfo();
  const tags = Object.keys(contentInfo.metadataAggregation.tags);
  return tags.map(tag => ({ tag: encodeURIComponent(tag.replaceAll(" ", "_")) }));
}

async function getTagArticleInfos(tag: string) {
  const contentInfo = await getContentInfo();
  const articles = contentInfo.articles
    .filter(article => article.metadata.tags?.includes(tag))
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

export default async function Tag(props: Props) {
  const tag = decodeURIComponent(props.params.tag).replaceAll("_", " ");
  const articles = await getTagArticleInfos(tag);

  return (
    <div>
      <h2>Tag: {tag}</h2>

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