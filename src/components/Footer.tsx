import Link from "next/link";
import styles from "@/styles/Footer.module.scss";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className={`${styles.footer}`}>
      <Link href="/" className={styles.icon} scroll={false}>
        <div className={styles.img_container}>
          <Image src="/icon.png" alt="" fill/>
        </div>
      </Link>
      <nav>
        <ul>
          <li>
            <Link href="/" scroll={false}>Home</Link>
          </li>
          <li>
            <Link href="/projects" scroll={false}>Projects</Link>
          </li>
          <li>
            <Link href="/gallery" scroll={false}>Gallery</Link>
          </li>
        </ul>
      </nav>
      <p className={styles.copyright}>© Kazuya Okamura</p>
    </footer>
  );
};

export default Footer;
