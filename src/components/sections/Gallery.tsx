import React from "react";
import styles from "@/styles/sections/Gallery.module.scss";
import FadeinTitle from "../common/FadeinTitle";
import useElementVisibility from "@/hooks/useElementVisibility";
import Link from "next/link";

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
  { id: "Event_Gallery_01", position: [0, -50, -1.5], size: [2, 2, 1] },
  { id: "Event_Gallery_02", position: [4, -50, -1.5], size: [2, 2, 1] },
  { id: "Event_Gallery_03", position: [-2, -50, 1], size: [1, 2, 2] },
  { id: "Event_Gallery_04", position: [-2, -50, 4.5], size: [1, 2, 2] },
];

const eventContent: { [key: string]: JSX.Element } = {
  Event_Gallery_01: (
    <div className={styles.eventContent}>
      <h2>天体観測</h2>
      <img src="/images/gallery/AstronomicalObservation.png" alt="" />
      <div className={styles.button}>
        <Link href="/gallery" scroll={false}>
          <span>詳細</span>
        </Link>
      </div>
    </div>
  ),
  Event_Gallery_02: (
    <div className={styles.eventContent}>
      <h2>クジラ雲</h2>
      <img src="/images/gallery/CloudWhale.png" alt="" />
      <div className={styles.button}>
        <Link href="/gallery" scroll={false}>
          <span>詳細</span>
        </Link>
      </div>
    </div>
  ),
  Event_Gallery_03: (
    <div className={styles.eventContent}>
      <h2>街灯</h2>
      <img src="/images/gallery/StreetLamp.png" alt="" />
      <div className={styles.button}>
        <Link href="/gallery" scroll={false}>
          <span>詳細</span>
        </Link>
      </div>
    </div>
  ),
  Event_Gallery_04: (
    <div className={styles.eventContent}>
      <h2>キャラクター</h2>
      <img src="/images/gallery/Character.png" alt="" />
      <div className={styles.button}>
        <Link href="/gallery" scroll={false}>
          <span>詳細</span>
        </Link>
      </div>
    </div>
  ),
};

const photos = [
  { name: "クジラ雲", img: "/images/gallery/CloudWhale.png" },
  { name: "天体観測", img: "/images/gallery/AstronomicalObservation.png" },
  { name: "街灯", img: "/images/gallery/StreetLamp.png" },
  { name: "ハロウィン", img: "/images/gallery/Halloween.png" },
  { name: "温泉", img: "/images/gallery/Onsen.png" },
  { name: "ヤクモ", img: "/images/gallery/Yakumo.png" },
];

const Gallery = ({ activeEvent }: GalleryProps) => {
  const { ref, isVisible } = useElementVisibility({ threshold: 0.1 });
  return (
    <section
      ref={ref}
      id="gallery"
      className={`${styles.gallery} ${isVisible ? styles.visible : ""}`}
    >
      <FadeinTitle title="Gallery" isVisible={isVisible} />
      <div className={styles.galleryBox}>
        {photos.map((photo, index) => (
          <div key={index} className={styles.galleryBoxItem}>
            <div className={styles.galleryBoxItemImage}>
              <img src={photo.img} alt={photo.name} />
            </div>
          </div>
        ))}
      </div>
      <div className={styles.pageLink}>
        <Link href="/gallery" scroll={false}>
          VIEW MORE
        </Link>
      </div>
      
      {activeEvent && eventContent[activeEvent]}
    </section>
  );
};

export default Gallery;
