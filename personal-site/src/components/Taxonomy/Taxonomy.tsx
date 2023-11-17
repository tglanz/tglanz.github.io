import { ArticleInfo } from "@/lib/article";
import * as urls from '@/lib/urls';
import Link from "next/link";

import styles from './Taxonomy.module.css';
import Chip from "../Chip/Chip";

export type Taxonomy = "tags" | "categories";

export interface Props {
    article: ArticleInfo;
    taxonomy: "tags" | "categories";
}

function getTaxonomyValues(article: ArticleInfo, taxonomy: Taxonomy) {
    switch (taxonomy) {
        case "tags": return article.metadata.tags;
        case "categories": return article.metadata.categories;
    }
}

function getUrl(taxonomy: Taxonomy): ((value: string) => string) {
    switch (taxonomy) {
        case "tags": return urls.tag;
        case "categories": return urls.article;
    }
}

export default function Taxonomy(props: Props) {
    const { article, taxonomy } = props;

    const url = getUrl(taxonomy);
    const values = getTaxonomyValues(article, taxonomy);

    if (values.length === 0) {
        return <></>;
    }

    return (
        <div className={styles.container}>
            <div className={styles.values}>
                {values.map((value, idx) => (
                    <Link key={idx} href={url(value)}>
                        <Chip value={value} />
                    </Link>
                ))}
            </div>
        </div>
    );
}