'use client'

import NavLink from "./NavLink";
import styles from "./NavBar.module.css"

const Routes = [
  { href: "/", text: "Home" },
  { href: "/blog", text: "Blog" },
  { href: "/about", text: "About" },
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
