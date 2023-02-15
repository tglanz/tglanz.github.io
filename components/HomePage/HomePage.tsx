import { MetadataAggregation } from "../../lib/article";
import { Content } from "../../lib/content";
import Headline from "../Headline"
import TaxonomyList from "../TaxonomyList/TaxonomyList";

import * as urls from '../../lib/urls';

import useConfig from "../utils/useConfig";
import { useContext, useEffect } from "react";
import { SearchIndexContext } from "../utils/searchIndexContext";
import SearchIndex from "../../lib/search-index";
import SearchBox from "../SearchBox/SearchBox";
import Layout from "../Layout/Layout";

interface Props {
  content: Content
}

const createTaxonomyListItems = (
  metadataAggregation: MetadataAggregation,
  createHref: (key: string) => string,
) => Object.entries(metadataAggregation)
  .map(([key, value]) => ({
    display: key,
    href: createHref(key),
    count: value.count,
  }))
  .sort((a, b) => a.display.localeCompare(b.display));

const TaxonmiesContainer: React.FC<{ title: string }> = ({ title, children }) => (
  <div className="
      p-4 m-4 shadow">
    <span className="text-4xl">{title}</span>
    <div className="my-4 pl-4">
      {children}
    </div>
  </div>
)

const HomePage = ({ content }: Props) => {
  const config = useConfig();

  const searchIndexContext = useContext(SearchIndexContext);
  useEffect(() => searchIndexContext.set(new SearchIndex(content.articles)), [])

  return (
    <Layout.Main>
      <div className="m-4 flex flex-col items-center">
        {/* <img src="/logo.png"></img>

        <Headline
          title={config.headline.title}
          subtitle={config.headline.subtitle} />

        <SearchBox /> */}

        <TaxonmiesContainer title="Categories">
          <TaxonomyList items={createTaxonomyListItems(
            content.metadataAggregation.categories,
            key => urls.categroyArticles(key)
          )} />
        </TaxonmiesContainer>

        <TaxonmiesContainer title="Tags">
          <TaxonomyList items={createTaxonomyListItems(
            content.metadataAggregation.tags,
            key => urls.tagArticles(key)
          )} />
        </TaxonmiesContainer>

        <p>Todos</p>
        <ul>
          <li>Bread crumbs</li>
          <li>Article Content style</li>
          <li>General style</li>
          <li>Content arrangement</li>
        </ul>
      </div>
    </Layout.Main>
  );
};

export default HomePage;
