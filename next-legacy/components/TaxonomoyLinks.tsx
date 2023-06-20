import React from 'react';
import Link from 'next/link';
import * as urls from '../lib/urls';

export interface Props {
  taxonomy: string
  values: string[]
}

const TaxonomyLinks = ({ taxonomy, values }: Props) => {
  return (
    <div>
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
}

export default TaxonomyLinks;