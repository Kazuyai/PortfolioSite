import Image, { ImageProps } from "next/image";
import styles from "@/styles/common/AutoSizeImage.module.scss";

const AutoSizeImage = (props: ImageProps) => {
  const { style, ...rest } = props;
  return (
    <div
      className={styles.img_container}
      style={{
        ...style
      }}
    >
      <Image
        fill
        className={styles.img}
        {...rest}
      />
    </div>
  );
};

export default AutoSizeImage;