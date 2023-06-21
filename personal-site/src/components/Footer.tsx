import React from "react";
import config from "@/config.json";
import Link from "next/link";

import {FaGithub, FaLinkedin} from "react-icons/fa";

import styles from "./Footer.module.css";

const IconLink = ({href, children}: {href: string, children: React.ReactNode}) => (
  <Link href={href}>
    {children}
  </Link>
);

export default function Footer(){
  return (
    <div className={styles.container}>
      <IconLink href={config.social.linkedin}>
        <FaLinkedin />
      </IconLink>
      <IconLink href={config.social.github}>
        <FaGithub />
      </IconLink>
    </div>
  );
}
