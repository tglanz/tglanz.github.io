import styles from "./page.module.css"

import config from "@/config.json";

function Headline() {
  return (
    <div className={styles.headline}>
      <span className="title">
        {config.headline.title}
      </span>
      <span className="subtitle">
        {config.headline.subtitle}
      </span> 
      <span className="description">
        {(config.headline as any).description}
      </span>
    </div>
  );
}

export default function Home() {
  return (
    <div className={styles.container}>
      <Headline />
    </div>
  )
}
