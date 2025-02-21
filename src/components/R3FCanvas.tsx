import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import { Suspense } from "react";
import Character from "@/components/models/Character";
import Loader from "@/components/common/Loader";
import styles from "@/styles/R3FCanvas.module.scss";

const R3FCanvas = () => {
  return (
    <Canvas 
      className={styles.canvas}
      camera={{ position: [0, 5, 5] }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <Suspense fallback={<Loader />}>
        <Character />
      </Suspense>
      <OrbitControls />
      <Environment preset="sunset" />
    </Canvas>
  );
};

export default R3FCanvas;
