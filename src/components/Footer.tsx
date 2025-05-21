import Link from "next/link";
import styles from "@/styles/Footer.module.scss";

const Footer = () => {
  return (
    <footer className={`${styles.footer}`}>
      <Link href="/" className={styles.icon}>
        <img src="./icon.png" alt=""/>
      </Link>
      <nav>
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/projects">Projects</Link>
          </li>
          <li>
            <Link href="/gallery">Gallery</Link>
          </li>
        </ul>
      </nav>
      <p className={styles.copyright}>© Kazuya Okamura</p>
    </footer>
  );
};

export default Footer;
