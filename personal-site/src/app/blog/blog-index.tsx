'use client'

import { ChangeEvent, useEffect, useRef, useState } from "react";

import Link from "next/link";
import classNames from "classnames";

import { ArticleInfo } from "@/lib/article";
import { ContentInfo } from "@/lib/content";
import { groupBy, groupByMany } from "@/lib/lists";
import * as urls from "@/lib/urls";

import config from "@/config.json";


export interface GroupProps {
  group: string
  articles: ArticleInfo[]
}

const UNTITLED = "[Untitled]"
const UNCATEGORIZED = "[Uncategorized]"
const UNTAGGED = "[Untagged]"

const INDEX_BY_TITLE = "Title";
const INDEX_BY_CATEGORIES = "Categories";
const INDEX_BY_TAGS = "Tags";

const ALL_INDEX_BY = [INDEX_BY_TITLE, INDEX_BY_CATEGORIES, INDEX_BY_TAGS];

// Extract a value to display from a given article
const selectArticleDisplay = (article: ArticleInfo) => article.metadata.title || article.id;

const sortArticles = (articles: ArticleInfo[]) => articles.sort((a, b) =>
  selectArticleDisplay(a).localeCompare(selectArticleDisplay(b)));

const groupComparer = (a: [string, ArticleInfo[]], b: [string, ArticleInfo[]]) => {
  let comparison = a[0].localeCompare(b[0]);
  if ([a[0][0], b[0][0]].includes("[")) {
    comparison *= -1;
  }

  return comparison;
};

const Group = ({ group, articles }: GroupProps) => {
  return (
    <div>
      <p>{group}</p>
      <ul>
        {articles.map((article, index) => (
          <li>
            <Link key={index} href={urls.article(article.id)}>
              {selectArticleDisplay(article)}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export interface Props {
  contentInfo: ContentInfo
}

interface GroupModel {
  [key: string]: ArticleInfo[];
}

const IndexByButton = ({
  indexBy, targetIndexBy, setIndexBy
}: {
  indexBy: string,
  targetIndexBy: string,
  setIndexBy: (indexBy: string) => void
}) => {
  const selected = indexBy === targetIndexBy;
  return (
    <span
      className={classNames({selected})}
      onClick={() => setIndexBy(targetIndexBy)}>
        {targetIndexBy}
    </span>
  );
}
const IndexPage = ({ contentInfo }: Props) => {

  const [indexBy, setIndexBy] = useState(INDEX_BY_CATEGORIES);
  const [groupedByTitle, setGroupedByTitle] = useState<GroupModel>({});
  const [groupedByCategories, setGroupedByCategories] = useState<GroupModel>({});
  const [groupedByTags, setGroupedByTags] = useState<GroupModel>({});

  const getGroups = () => {
    switch (indexBy) {
      case INDEX_BY_TITLE: return groupedByTitle;
      case INDEX_BY_CATEGORIES: return groupedByCategories;
      case INDEX_BY_TAGS: return groupedByTags;
      default: return {};
    }
  }

  // Below is a bit of duplicated code. don't judge me.
  // TODO: refactor

  // Group by title
  useEffect(() => {
    const newGroups = groupBy(
      article => {
        const title = article.metadata.title
        return title ? title[0].toUpperCase() : UNTITLED;
      },
      contentInfo.articles);

    if (!config.index.showUntitled) {
      delete newGroups[UNTITLED];
    }

    Object.values(newGroups).forEach(sortArticles);
    setGroupedByTitle(newGroups);
  }, [contentInfo]);

  // Group by categories
  useEffect(() => {
    const newGroups = groupByMany(
      article => {
        if (article.metadata.categories?.length > 0) {
          return article.metadata.categories
        }

        return [UNCATEGORIZED];
      },
      contentInfo.articles);

    if (!config.index.showUncategorized) {
      delete newGroups[UNCATEGORIZED];
    }

    Object.values(newGroups).forEach(sortArticles);
    setGroupedByCategories(newGroups);
  }, [contentInfo]);

  // Group by tagged
  useEffect(() => {
    const newGroups = groupByMany(
      article => {
        if (article.metadata.tags?.length > 0) {
          return article.metadata.tags
        }

        return [UNTAGGED];
      },
      contentInfo.articles);

    if (!config.index.showUntagged) {
      delete newGroups[UNTAGGED];
    }

    Object.values(newGroups).forEach(sortArticles);
    setGroupedByTags(newGroups);
  }, [contentInfo]);

  return (
    <div>
      <div className="flex flex-col justify-center items-center">
        <div className="flex flex-row justify-center items-center">
          { ALL_INDEX_BY.map(targetIndexBy => (
            <IndexByButton key={targetIndexBy} setIndexBy={setIndexBy} indexBy={indexBy} targetIndexBy={targetIndexBy} />
          ))}
        </div>
      </div>

      <div>
      {
          Object.entries(getGroups())
            .sort(groupComparer)
            .map(([group, articles], index) => (
              <Group key={index} group={group} articles={articles} />
            ))
      }
      </div>

    </div>
  );
};

export default IndexPage;
