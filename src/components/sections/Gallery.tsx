import React from "react";
import styles from "@/styles/sections/Gallery.module.scss";
import FadeinTitle from "../common/FadeinTitle";
import useElementVisibility from "@/hooks/useElementVisibility";
import Link from "next/link";
import AutoSizeImage from "../common/AutoSizeImage";
import Image from "next/image";

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
      <Image
        src="/images/gallery/AstronomicalObservation.webp"
        alt="天体観測"
        className={styles.eventImage}
        fill
      />
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
      <Image
        src="/images/gallery/CloudWhale.webp"
        alt="クジラ雲"
        className={styles.eventImage}
        fill
      />
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
      <Image src="/images/gallery/StreetLamp.webp" alt="街灯" className={styles.eventImage} fill />
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
      <Image
        src="/images/gallery/Character.webp"
        alt="キャラクター"
        className={styles.eventImage}
        fill
      />
      <div className={styles.button}>
        <Link href="/gallery" scroll={false}>
          <span>詳細</span>
        </Link>
      </div>
    </div>
  ),
};

const photos = [
  { name: "クジラ雲", img: "/images/gallery/CloudWhale.webp" },
  { name: "天体観測", img: "/images/gallery/AstronomicalObservation.webp" },
  { name: "街灯", img: "/images/gallery/StreetLamp.webp" },
  { name: "ハロウィン", img: "/images/gallery/Halloween.webp" },
  { name: "温泉", img: "/images/gallery/Onsen.webp" },
  { name: "ヤクモ", img: "/images/gallery/Yakumo.webp" },
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
              <AutoSizeImage
                src={photo.img}
                alt={photo.name}
                className={styles.galleryBoxItemImageInner}
              />
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
