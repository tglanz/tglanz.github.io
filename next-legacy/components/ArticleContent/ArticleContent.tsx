import { ArticleContent as Content } from "../../lib/article";

import styles from './ArticleContent.module.css';

export interface Props {
  content: Content
}

function ArticleContent({ content }: Props) {
  return <div className={styles.md} dangerouslySetInnerHTML={{__html: content.html}} />
}

export default ArticleContent;