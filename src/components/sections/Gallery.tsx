import React, { useEffect } from "react";
import styles from "@/styles/sections/Gallery.module.scss";
import FadeinTitle from "../common/FadeinTitle";
import useElementVisibility from "@/hooks/useElementVisibility";
import Link from "next/link";
import AutoSizeImage from "../common/AutoSizeImage";
import Image from "next/image";
import { useEvent } from "@/contexts/EventContext";


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


const photos = [
  { name: "クジラ雲", img: "/images/gallery/CloudWhale.webp" },
  { name: "天体観測", img: "/images/gallery/AstronomicalObservation.webp" },
  { name: "街灯", img: "/images/gallery/StreetLamp.webp" },
  { name: "ハロウィン", img: "/images/gallery/Halloween.webp" },
  { name: "温泉", img: "/images/gallery/Onsen.webp" },
  { name: "ヤクモ", img: "/images/gallery/Yakumo.webp" },
];

const Gallery = () => {
  const { ref, isVisible } = useElementVisibility({ threshold: 0.1 });
  const { registerEventContent } = useEvent();

  useEffect(() => {
    registerEventContent("Event_Gallery_01",
      <div>
        <h2>天体観測</h2>
        <Image
          src="/images/gallery/AstronomicalObservation.webp"
          alt="天体観測"
          fill
        />
        <div className="button">
          <Link href="/gallery" scroll={false}>
            <span>詳細</span>
          </Link>
        </div>
      </div>
    );

    registerEventContent("Event_Gallery_02",
      <div>
        <h2>クジラ雲</h2>
        <Image
          src="/images/gallery/CloudWhale.webp"
          alt="クジラ雲"
          fill
        />
        <div className="button">
          <Link href="/gallery" scroll={false}>
            <span>詳細</span>
          </Link>
        </div>
      </div>
    );

    registerEventContent("Event_Gallery_03",
      <div>
        <h2>街灯</h2>
        <Image src="/images/gallery/StreetLamp.webp" alt="街灯" fill />
        <div className="button">
          <Link href="/gallery" scroll={false}>
            <span>詳細</span>
          </Link>
        </div>
      </div>
    );

    registerEventContent("Event_Gallery_04",
      <div>
        <h2>キャラクター</h2>
        <Image
          src="/images/gallery/Character.webp"
          alt="キャラクター"
          fill
        />
        <div className="button">
          <Link href="/gallery" scroll={false}>
            <span>詳細</span>
          </Link>
        </div>
      </div>
    );
  }, [registerEventContent]);

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
    </section>
  );
};

export default Gallery;
