import styles from './academic.module.css';

const items = [
  {
    title: "Deep compression",
    description: "Deep neural network compression techniques",
    links: [{
      name: "Paper",
      url: "https://drive.google.com/file/d/1dN72fRXUDnmT-s0Y8ZNYkJ_L_ZywpF__/view?usp=drive_link",
    }, {
      name: "Slides",
      url: "https://drive.google.com/file/d/1IxUX7kaJxeI-nedcWuEV97yMABppiiHL/view?usp=drive_link",
    }]
  }, {
    title: "Tarski's Planks Problem (Hebrew)",
    description: "An abstract result in convex functional analysis",
    links: [{
      name: "Paper",
      url: "https://drive.google.com/file/d/1SriIIbehb7wVLOzkyqafzB1ExGS3zov0/view?usp=drive_link",
    }, {
      name: "Slides",
      url: "https://drive.google.com/file/d/1aNiphLlYF1MR9RSB7unQmLu9vJSvh8uQ/view?usp=drive_link",
    }]
  },
]

type ItemProps = {
  item: {
    title: string;
    description: string;
    links: {
      name: string;
      url: string;
    }[]
  }
}

function AcademicItem(props: ItemProps) {
  return (
    <div className={styles.item}>
      <span className={styles.title}>{props.item.title}</span>
      <span className={styles.description}>{props.item.description}</span>

      <div className={styles.links}>
        {props.item.links.map((link, idx) => (
          <a key={idx} className={styles.link} href={link.url} target='_blank'>{link.name}</a>
        ))}
      </div> 
    </div>
  )
}

export default async function Academic() {

  return (
    <div className={styles.container}>
      <h2>Academic Work</h2>

      <div className={styles.items}>
        {items.map((item, idx) => (
          <AcademicItem key={idx} item={item} />
        ))}
      </div>
    </div>
  );
}
