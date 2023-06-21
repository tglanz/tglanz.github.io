'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";
import classnames from "classnames";

export interface Props {
  href: string,
  text: string,
}

export default function NavLink({ href, text }: Props){
  const pathname = usePathname();
  const active = pathname === href;
  return (
    <Link className={classnames("link", {active})} href={href}>{text}</Link>
  );
};

