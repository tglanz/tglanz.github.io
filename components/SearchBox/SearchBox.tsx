import { useContext, useEffect, useState } from "react";
import { debounceTime, filter, map, Subject } from "rxjs";
import { Article } from "../../lib/article";
import { SearchIndexContext } from "../utils/searchIndexContext";
import { FaSearch } from 'react-icons/fa';
import classNames from "classnames";
import Link from "next/link";
import * as urls from '../../lib/urls';
import { Router } from "next/router";

interface Props {
}

interface CandidateListProps {
  candidates: Article[]
}

const CandidateList = ({ candidates }: CandidateListProps) => {
  return (
    <div className={classNames("bg-teal-400", {
      "p-2": candidates.length > 0
    })}>
      <ul>
        {candidates.map(article => (
          <li key={article.id}>
            <Link href={urls.article(article.id)}>
              {article.metadata.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

const SearchBox = ({ }: Props) => {
  const searchIndex = useContext(SearchIndexContext).get()

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [candidates, setCandidates] = useState<Article[]>([]);

  const termChangeSubject = new Subject<string>();
  const handleTermChange = (newTerm: string) => {
    setSearchTerm(newTerm);
    termChangeSubject.next(newTerm);
  }

  useEffect(() => {
    Router.events.on('routeChangeComplete', () => {
      handleTermChange("");
    })
  }, [handleTermChange])

  termChangeSubject
    .pipe(
      debounceTime(50),
      map(term => searchIndex.searchArticles(term, 10))
    )
    .subscribe(articles => {
      setCandidates(articles);
    });

  if (searchIndex.indexedArticlesCount === 0) {
    return <></>;
  }

  return (
    <div>
      <div className="flex flex-row items-center gap-2 justify-center">
        <input type="search"
          value={searchTerm}
          className="border border-black pl-2 text-center"
          placeholder="Search (WIP)"
          onChange={e => handleTermChange(e.target.value)} />
      </div>
      <CandidateList candidates={candidates} />
    </div>
  );
};

export default SearchBox;
