import React, { use, useEffect, useRef, useState } from "react";
import styles from "@/styles/sections/Top.module.scss";

function Top() {
  const topRef = useRef<HTMLDivElement>(null);
  const [windowHeight, setWindowHeight] = useState(0);
  const [topEndY, setTopEndY] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const rect = topRef.current?.getBoundingClientRect() as DOMRect;
    setWindowHeight(window.innerHeight);
    setTopEndY(rect?.bottom > 0 ? rect.bottom : 0);
  }, [scrollY]);

  return (
    <section ref={topRef} className={styles.top}>
      <h1>Hello!</h1>
      <p>Welcome to my portfolio site</p>
      <div 
        className={styles.scroll}
        style={{ 
          opacity: topEndY / windowHeight,
          display: 0 >= topEndY ? "none" : "flex"
        }}
      >
        <img src="/images/arrow.svg" alt="arrow" />
        <img src="/images/arrow.svg" alt="arrow" />
        <img src="/images/arrow.svg" alt="arrow" />
      </div>
    </section>
  );
}

export default Top;
