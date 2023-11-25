import { ArticleInfo } from "@/lib/article";
import styles from "./ArticleCard.module.css";
import Link from "next/link";
import * as urls from "@/lib/urls";

export interface Props {
    article: ArticleInfo;
}

export default function ArticleCard(props: Props) {
    const { article } = props;

    return (
        <Link href={urls.article(article.id)}>
            <div className={styles.container}>
                <h3>{article.metadata.title}</h3>
                <p className={styles.description}>{article.metadata.description}</p>
            </div>
        </Link>
    );
}