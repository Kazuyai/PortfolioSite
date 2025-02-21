import { Canvas, useThree } from "@react-three/fiber";
import { Environment, OrbitControls, useHelper } from "@react-three/drei";
import { Suspense, useRef, useEffect } from "react";
import * as THREE from "three";
import Character from "@/components/models/Character";
import Building from "@/components/models/Building";
import Loader from "@/components/common/Loader";
import styles from "@/styles/R3FCanvas.module.scss";

const Lights = () => {
  const directionalLightRef = useRef<THREE.DirectionalLight>(new THREE.DirectionalLight());
  const pointLightRef = useRef<THREE.PointLight>(new THREE.PointLight());

  useHelper(directionalLightRef, THREE.DirectionalLightHelper, 5, "red");
  useHelper(pointLightRef, THREE.PointLightHelper, 1, "blue");

  return (
    <>
      <ambientLight intensity={3} />
      <directionalLight
        ref={directionalLightRef}
        position={[10, 10, 10]}
        intensity={5}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <pointLight
        ref={pointLightRef}
        position={[0, 5, 0]}
        intensity={10} 
      />
    </>
  );
};

const R3FCanvas = () => {
  return (
    <Canvas
      className={styles.canvas}
      camera={{ position: [0, 5, 5] }}
      shadows
    >
      <Lights />
      <Suspense fallback={<Loader />}>
        <Character castShadow receiveShadow />
        <Building position={[0, 10, 0]} scale={[0.5, 0.5, 0.5]} castShadow receiveShadow />
      </Suspense>
      <OrbitControls />
    </Canvas>
  );
};

export default R3FCanvas;
