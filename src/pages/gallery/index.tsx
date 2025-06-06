import { GetStaticProps } from "next";
import React, { useState } from "react";
import styles from "@/styles/pages/gallery.module.scss";
import { getImages, Image } from "@/lib/api/getImages";

type Props = {
  images: Image[];
};

const Index = ({ images }: Props) => {
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);

  return (
    <div className={styles.container}>
      <div className={styles.mainVisual}>
        <img src="./images/gallery/CloudWhale.png" alt="" />
        <h2>Gallery</h2>
      </div>
      <div className={styles.items}>
        {images.map((image) => (
          <div
            key={image.id}
            className={styles.item}
            onClick={() => setSelectedImage(image)}
          >
            <div className={styles.itemImage}>
              <img src={image.image.url} alt="" />
            </div>
          </div>
        ))}
      </div>
      {selectedImage !== null && (
        <div className={styles.popup} onClick={() => setSelectedImage(null)}>
          <div className={styles.popupExplain} onClick={(e) => e.stopPropagation()}>
            <div className={styles.popupExplainInner}>
              <div className={styles.popupExplainHeader}>
                <div className={styles.imgContainer}>
                  <img src={selectedImage.image.url} alt="" />
                </div>
              </div>
              <div className={styles.popupExplainBody}>
                <p>
                  {selectedImage.summary}
                </p>
              </div>
            </div>
          </div>
          <div className={styles.popupClose} onClick={() => setSelectedImage(null)}>
            <span></span>
            <span></span>
          </div>
        </div>
      )}
    </div>
  );
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  try {
    const images = await getImages();
    return {
      props: { images }
    };
  } catch (error) {
    console.error("Failed to fetch images:", error);
    return {
      props: { images: [] }
    };
  }
};

export default Index;
