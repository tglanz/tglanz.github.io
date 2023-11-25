import { ArticleInfo } from "@/lib/article";
import { ContentInfo } from "@/lib/content";
import { getContentInfo } from "@/lib/content-cache"
import ArticleCard from "../ArticleCard/ArticleCard";

import styles from './Highlights.module.css';

export interface Props {
    limit: number;
}

function getRandom(min: number, max: number): number {
    return Math.floor((Math.random() * (max - min)) - min);
}

function getRandoms(count: number, min: number, max: number): Set<number> {
    const randoms = new Set<number>();

    for (let idx = 0; idx < count; ++idx) {
        let random = getRandom(min, max);
        while (randoms.has(random)) {
            random = getRandom(min, max);
        }

        randoms.add(random);
    }

    return randoms;
}

function getHighlights(contentInfo: ContentInfo, limit: number): ArticleInfo[] {
    const highlighed = contentInfo.articles
        .filter(article => article.metadata.highlight);
    const count = Math.min(highlighed.length, limit);
    const randoms = getRandoms(count, 0, highlighed.length);
    return highlighed.filter((_, index) => randoms.has(index));
}

export default async function Highlights(props: Props) {
    const contentInfo = await getContentInfo();
    const highlights = getHighlights(contentInfo, props.limit);
    return (
        <div>
            <p>Spotlight</p>

            <small>Random content</small>

            <div className={styles.cards}>
            {
                highlights.map((article, index) => (
                    <ArticleCard key={index} article={article} />
                ))
            }
            </div>
        </div>
    )
}