import styles from './Chip.module.css';

export interface Props {
    value: string;
}

export default function Chip(props: Props) {
    return (
        <div className={styles.container}>
            {props.value}
        </div>
    );
}