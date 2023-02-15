import '../styles/globals.css'
import 'katex/dist/katex.min.css';
import 'highlight.js/styles/sunburst.css';

import type { AppProps } from 'next/app'

import { SearchIndexContext } from '../components/utils/searchIndexContext';
import Layout from '../components/Layout/Layout'
import { useState } from 'react';
import SearchIndex from '../lib/search-index';

const EmptySearchIndex = new SearchIndex([]);

function App({ Component, pageProps }: AppProps) {

  const [searchIndex, setSearchIndex] = useState(EmptySearchIndex);

  return (
    <SearchIndexContext.Provider value={{
      set: setSearchIndex,
      get: () => searchIndex,
    }}>
    <Layout>
      <Component {...pageProps} />
    </Layout>
    </SearchIndexContext.Provider>
  );
}

export default App;