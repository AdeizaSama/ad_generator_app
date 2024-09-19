import Link from 'next/link';
import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <h1 className={styles.headline}>Ad Generator App</h1>
      <div className={styles.ctas}>
        <Link href="/add-template">
          <button className={styles.button}>Register a Template</button>
        </Link>
        <Link href="/generate-ad">
          <button className={styles.button}>Generate an Ad</button>
        </Link>
      </div>
    </div>
  );
}
