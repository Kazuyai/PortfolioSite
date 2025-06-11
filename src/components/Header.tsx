import styles from "@/styles/Header.module.scss";
import Link from "next/link";
import { useEffect, useState } from "react";
import AutoSizeImage from "./common/AutoSizeImage";

const Header = () => {
  const [isTop, setIsTop] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

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
    <header className={`${styles.header} ${isTop ? styles.isTop : ""} ${isOpen ? styles.open : ""}`}>
      <Link href="/" className={styles.icon} scroll={false}>
        {/* <img src="./icon.webp" alt=""/> */}
        <AutoSizeImage src="/icon.webp" alt="" className={styles.iconImage} />
        <h1 className={styles.title}>Kazuya Okamura</h1>
      </Link>
      <div
        className={styles.openButton + (isOpen ? ` ${styles.open}` : "")}
        onClick={() => setIsOpen(!isOpen)} 
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
      <nav className={`${isOpen ? styles.open : ""}`}>
        <ul>
          <li>
            <Link href="/" scroll={false}>
              Home
            </Link>
          </li>
          <li>
            <Link href="/projects" scroll={false}>
              Projects
            </Link>
          </li>
          <li>
            <Link href="/gallery" scroll={false}>
              Gallery
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
