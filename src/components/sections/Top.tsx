import React, { useEffect, useRef, useState } from "react";
import styles from "@/styles/sections/Top.module.scss";

export const collisionData: { position: [number, number, number]; size: [number, number, number]; }[] = [
  { position: [-3, 1, -3], size: [3, 2, 3] },
  { position: [6, 1, 0], size: [1, 2, 12] },
  { position: [0, 1, 6], size: [12, 2, 1] },
  { position: [-6, 1, 0], size: [1, 2, 12] },
  { position: [0, 1, -6], size: [12, 2, 1] },
  { position: [3, 1, -4.5], size: [14, 2, 5] },
];

export const eventData: { id: string; position: [number, number, number]; size: [number, number, number]; }[] = [
  { id: "top_event_1", position: [0, 1, 0], size: [2, 2, 2] },
];

const Top = () => {
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
    <section ref={topRef} id="top" className={styles.top}>
      <h1>Hello!</h1>
      <p>Welcome to my portfolio site</p>
      <div 
        className={styles.scroll}
        style={{ 
          opacity: topEndY / windowHeight ? topEndY / windowHeight : 1,
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
