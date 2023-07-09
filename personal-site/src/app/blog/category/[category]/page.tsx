import { ArticleInfo } from "@/lib/article";
import { getContentInfo } from "@/lib/content-cache";

export interface Params {
  category: string,
}

export interface Props {
  params: Params
}

// TODO: 
// export const metadata = {};

export async function generateStaticParams() {
  const contentInfo = await getContentInfo();
  return Object.keys(contentInfo.metadataAggregation.categories)
    .map(category => ({ category }));
}


const selectDisplay = (article: ArticleInfo) => article.metadata.title || article.id;

async function Articles({category}: {category: string}) {
  const contentInfo = await getContentInfo();
  let articles = contentInfo.articles
    .filter(article => article.metadata.categories?.includes(category));

  return (
    <div>
      <ul>
      {
        articles.map(article => (
          <li key={article.id}>{selectDisplay(article)}</li>
        ))
      }
      </ul>
    </div>
  );
}

export default function Category(props: Props) {
  return (
    <div>
      <h1>{props.params.category}</h1>

      <Articles category={props.params.category} />
    </div>
  );
}
