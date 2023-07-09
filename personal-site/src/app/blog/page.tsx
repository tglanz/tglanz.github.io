import { ArticleInfo } from "@/lib/article";
import { getContentInfo } from "@/lib/content-cache";
import { groupBy, groupByMany } from "@/lib/lists";

import * as urls from "@/lib/urls";
import Link from "next/link";

import styles from "./blog.module.css";

const selectDisplay = (article: ArticleInfo) => article.metadata.title || article.id;

const selectCategories = (article: ArticleInfo): string[] => {
  if (article.metadata.categories?.length > 0) {
    return article.metadata.categories;
  }

  return ["UNCATEGORIZED"];
}

const groupComparer = (a: [string, ArticleInfo[]], b: [string, ArticleInfo[]]) => {
  let comparison = a[0].localeCompare(b[0]);
  if ([a[0][0], b[0][0]].includes("[")) {
    comparison *= -1;
  }

  return comparison;
};

async function Categories() {
  let contentInfo = await getContentInfo();

  const groups = Object.keys(contentInfo.metadataAggregation.categories)
    .sort();

  return (
    <div>
      <h2>Categories</h2>
      <ul>
      {
        groups.map(group => (
          <li key={group}>
            <Link className="link" href={`/blog/category/${group}`}>
              {group}
            </Link>
          </li>
        ))
      }
      </ul>
    </div>
  );

}

async function CategoryArticles({category}: {category: string}) {
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

export default async function Blog() {
  return (
    <div className={styles.container}>
      <h1>Blog</h1>

      <Categories />
      <CategoryArticles category="AWS" />
    </div>
  );
}
