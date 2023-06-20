import Link from 'next/link';
import React from 'react';
import { ArticleInfo } from "../../lib/article";

import * as urls from '../../lib/urls';

export interface Props {
  articleInfo: ArticleInfo
}

const Container: React.FC<{ href: string }> = ({ href, children }) => (
  <Link href={href}>
    <div className="
      p-4
      border border-1
      cursor-pointer
      transition-colors duration-500
      shadow-md">
      {children}
    </div>
  </Link>
)

const TaxonomyValues: React.FC<{ taxonomy: string, values: string[] }> = ({ taxonomy, values }) => (
  <div className="text-sm">
    <span>{taxonomy}: </span>
    <span>
      {values.map((value, index) => (
        <span key={index} className="inline-block">
          {index > 0 && ", "}
          <Link href={urls.taxonomyArticles(taxonomy, value)}>
            {value}
          </Link>
        </span>
      ))}
    </span>
  </div>
)

function ArticleCard(props: Props) {
  const { articleInfo } = props;

  const { id, metadata } = articleInfo;

  return (
    <div>
      <Link className="text-2xl font-bold" href={urls.article(id)}>
        {metadata.title}
      </Link>

      {metadata.description
        ? <p className="font-sans">{metadata.description}</p>
        : undefined}

      <div className="mb-2" />

      {metadata.categories.length > 0
        ? <TaxonomyValues taxonomy="Categories" values={metadata.categories} />
        : undefined}

      {metadata.tags.length > 0
        ? <TaxonomyValues taxonomy="Tags" values={metadata.tags} />
        : undefined}
    </div>
  )
}

export default ArticleCard;