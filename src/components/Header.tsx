import styles from "@/styles/Header.module.scss";
import Link from "next/link";

const Header = () => {
  return (
    <header className={styles.header}>
      <Link href="/" className={styles.icon}>
        <img src="./icon.png" alt=""/>
        <h1 className={styles.title}>Kazuya Okamura</h1>
      </Link>
      <nav>
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/projects">Projects</a>
          </li>
          <li>
            <a href="/gallery">Gallery</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
