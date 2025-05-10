import styles from "@/styles/Header.module.scss";
import Link from "next/link";
import { useEffect, useState } from "react";

const Header = () => {
  const [isTop, setIsTop] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 1) {
        setIsTop(false);
      } else {
        setIsTop(true);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`${styles.header} ${isTop ? styles.isTop : ""}`}>
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
