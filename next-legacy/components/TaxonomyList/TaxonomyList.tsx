import Link from "next/link";

export interface Item {
  display: string,
  href: string,
  count: number,
}

export interface Props {
  items: Item[]
}

interface ListItemProps {
  item: Item
}

// <button class="
// h-10 px-5 text-indigo-100
// transition-colors
// duration-150 bg-indigo-700 rounded-lg focus:shadow-outline hover:bg-indigo-800">

const ListItem = ({ item }: ListItemProps) => (
  <Link href={item.href}>
    <div className="
      m-1 p-2 px-4 font-mono
      border border-black rounded-lg
      flex flex-row items-center
      cursor-pointer gap-2
      duration-200 transition-colors hover:bg-teal-200">
      <span className="text-sm">
        {item.display}
      </span>
      <span className="
        inline-flex items-center justify-center
        px-1 text-xs font-bold leading-none
        bg-red-400 text-white rounded-full">
        {item.count}
      </span>
    </div>
  </Link>
);

const TaxonomyList = ({ items }: Props) => (
  <div className="
    flex flex-wrap items-center
    ">{
      items.map((item, index) => <ListItem key={index} item={item} />)
    }</div>
)

export default TaxonomyList;
