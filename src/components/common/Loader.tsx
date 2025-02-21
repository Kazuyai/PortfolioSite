import { Html, useProgress } from "@react-three/drei";
import styles from "@/styles/common/Loader.module.scss";

const Loader = () => {
  const { progress } = useProgress();

  console.log("Hello");
  return (
    <Html className={styles.loading}>
      <div>
        Loading... {Math.floor(progress)}%
      </div>
    </Html>
  );
}

export default Loader;