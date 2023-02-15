import React from 'react';
import SearchIndex from '../../lib/search-index';

export interface SearchIndexContextInterface {
  set(searchIndex: SearchIndex): void;
  get(): SearchIndex;
}

export const SearchIndexContext = React.createContext<SearchIndexContextInterface>({
  set: (newValue: SearchIndex) => {},
  get: () => new SearchIndex([]),
});

