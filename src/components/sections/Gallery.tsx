import React from "react";
import styles from "@/styles/sections/Gallery.module.scss";
import FadeinTitle from "../common/FadeinTitle";
import useElementVisibility from "@/hooks/useElementVisibility";
import { a } from "framer-motion/client";

interface GalleryProps {
  activeEvent: string | null;
}

export const collisionData: {
  position: [number, number, number];
  size: [number, number, number];
}[] = [
  { position: [-3, -50, -3], size: [3, 2, 3] },
  { position: [-4, -50, 3], size: [1, 2, 8] },
  { position: [3, -50, -3.5], size: [8, 2, 1] },
  { position: [7, -50, 0], size: [1, 2, 14] },
  { position: [1, -50, 7], size: [12, 2, 1] },
];

export const eventData: {
  id: string;
  position: [number, number, number];
  size: [number, number, number];
}[] = [
  { id: "Event_Gallery_01", position: [5, -50, -1.5], size: [2, 2, 1] },
  { id: "Event_Gallery_02", position: [-2, -50, 4.8], size: [1, 2, 2] },
  { id: "Event_Gallery_03", position: [-2, -50, 2.6], size: [1, 2, 2] },
  { id: "Event_Gallery_04", position: [-2, -50, 0.4], size: [1, 2, 2] },
];

const eventContent: { [key: string]: JSX.Element } = {
  Event_Gallery_01: (
    <div className={styles.eventContent}>
      <h2>テスト</h2>
      <img src="/images/Gallery_01.png" alt="" />
      <p>
        ----------
      </p>
      <div className={styles.button}>
        <a href="">
          <span>詳細</span>
        </a>
      </div>
    </div>
  ),
  Event_Gallery_02: (
    <div className={styles.eventContent}>
      <h2>テスト</h2>
      <img src="/images/Gallery_01.png" alt="" />
      <p>
        ----------
      </p>
      <div className={styles.button}>
        <a href="">
          <span>詳細</span>
        </a>
      </div>
    </div>
  ),
  Event_Gallery_03: (
    <div className={styles.eventContent}>
      <h2>テスト</h2>
      <img src="/images/Gallery_01.png" alt="" />
      <p>
        ----------
      </p>
      <div className={styles.button}>
        <a href="">
          <span>詳細</span>
        </a>
      </div>
    </div>
  ),
  Event_Gallery_04: (
    <div className={styles.eventContent}>
      <h2>テスト</h2>
      <img src="/images/Gallery_01.png" alt="" />
      <p>
        ----------
      </p>
      <div className={styles.button}>
        <a href="">
          <span>詳細</span>
        </a>
      </div>
    </div>
  ),
};

const Gallery = ({ activeEvent }: GalleryProps) => {
  const { ref, isVisible } = useElementVisibility({ threshold: 0.1 });
  return (
    <section
      ref={ref}
      id="gallery"
      className={`${styles.gallery} ${isVisible ? styles.visible : ""}`}
    >
      <FadeinTitle title="Gallery" isVisible={isVisible} />
      <p>These are my gallery</p>
      
      {activeEvent && eventContent[activeEvent]}
    </section>
  );
};

export default Gallery;
