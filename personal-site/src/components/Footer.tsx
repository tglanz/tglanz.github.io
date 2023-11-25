import React from "react";
import config from "@/config.json";
import Link from "next/link";

import {FaGithub, FaLinkedin} from "react-icons/fa";

const ICON_SIZE = 25;

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
        <FaLinkedin size={25} />
      </IconLink>
      <IconLink href={config.social.github}>
        <FaGithub size={25} />
      </IconLink>
    </div>
  );
}
