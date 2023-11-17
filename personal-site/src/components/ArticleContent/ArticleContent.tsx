'use client'

import 'katex/dist/katex.min.css';

import { ArticleContent } from "@/lib/article";
import Client from "./Client";

import styles from './ArticleContent.module.css';

export interface Props {
    content: ArticleContent;
}

export function ArticleContent(props: Props) {
    return (
        <>
            <Client />
            <div className={styles.md} dangerouslySetInnerHTML={{ __html: props.content.html }} />
        </>
    );
}