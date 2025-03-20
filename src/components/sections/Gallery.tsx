import React from "react";
import styles from "@/styles/sections/Gallery.module.scss";
import FadeinTitle from "../common/FadeinTitle";
import useElementVisibility from "@/hooks/useElementVisibility";

interface GalleryProps {
  activeEvent: string | null;
}

const Gallery = ({ activeEvent }: GalleryProps) => {
  const { ref, isVisible } = useElementVisibility({ threshold: 0.1 });
  return (
    <section ref={ref} className={`${styles.gallery} ${isVisible ? styles.visible : ""}`}>
      <FadeinTitle title="Gallery" isVisible={isVisible} />
      <p>These are my gallery</p>
    </section>
  );
};

export default Gallery;
