'use client'

import NavLink from "./NavLink";
import styles from "./NavBar.module.css"
import * as urls from "@/lib/urls";

const Routes = [
  { href: urls.home(), text: "Home" },
  { href: urls.categories(), text: "Categories" },
  { href: urls.articles(), text: "All" },
  { href: urls.article('about'), text: "About" },
];

export default function Navigation() {
  return (
    <div className={styles.container}>
      { Routes.map((route, idx) => (
        <NavLink key={idx} {...route} />
      ))}
    </div>
  )
}
