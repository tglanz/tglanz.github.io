import styles from './Chip.module.css';

export interface Chip {
    value: string;
}

export default function Chip(props: Props) {
    return (
        <div className={styles.container}>
            {props.value}
        </div>
    );
}