import { getContentInfo } from "@/lib/content-cache";
import * as urls from "@/lib/urls";
import Link from "next/link";


export default async function Categories() {

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
            <Link className="link" href={urls.category(group)}>
              {group}
            </Link>
          </li>
        ))
      }
      </ul>
    </div>
  );
}
