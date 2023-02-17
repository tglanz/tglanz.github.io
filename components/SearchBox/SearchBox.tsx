import { ChangeEvent, ChangeEventHandler, FormEvent, useContext, useEffect, useState } from "react";
import { debounceTime, filter, map, Subject } from "rxjs";
import { Article } from "../../lib/article";
import { SearchIndexContext } from "../utils/searchIndexContext";
import { FaSearch } from 'react-icons/fa';
import classNames from "classnames";
import Link from "next/link";
import * as urls from '../../lib/urls';
import { Router, useRouter } from "next/router";

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
  const router = useRouter();
  const [value, setValue] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({ value });
    router.push(urls.search(value));
  }

  return (
    <div>

      <form
          action="/_search" autoComplete="off"
          className="flex flex-col justify-center items-center"
          onSubmit={handleSubmit}
          >
        <input className="text-input" type="text" name="query" placeholder="Search" onChange={handleChange} />
        <input className="button" type="submit" value="Search" hidden />
      </form>
    </div>
  );
};

export default SearchBox;
