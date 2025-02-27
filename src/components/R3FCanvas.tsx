import { Canvas, useThree } from "@react-three/fiber";
import { Environment, OrbitControls, useHelper } from "@react-three/drei";
import { Suspense, useRef, useEffect } from "react";
import * as THREE from "three";
import CameraController from "@/components/utils/CameraController";
import Character from "@/components/models/Character";
import Building from "@/components/models/Building";
import Loader from "@/components/common/Loader";
import styles from "@/styles/R3FCanvas.module.scss";
import { render } from "sass";

interface Props {
  spacerRefs: React.MutableRefObject<HTMLDivElement[]>;
}

const Lights = () => {
  const directionalLightRef = useRef<THREE.DirectionalLight>(new THREE.DirectionalLight());
  const pointLightRef = useRef<THREE.PointLight>(new THREE.PointLight());

  useHelper(directionalLightRef, THREE.DirectionalLightHelper, 5, "red");
  useHelper(pointLightRef, THREE.PointLightHelper, 1, "blue");

  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight
        ref={directionalLightRef}
        position={[7, 7, 7]}
        intensity={1}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={50}
        shadow-camera-left={-20}
        shadow-camera-right={20}
        shadow-camera-top={20}
        shadow-camera-bottom={-20}
      />
      {/* <pointLight ref={pointLightRef} position={[0, 5, 0]} intensity={10} /> */}
    </>
  );
};

const R3FCanvas = ({ spacerRefs }: Props) => {
  return (
    <Canvas className={styles.canvas} camera={{ position: [0, 5, 5] }} flat shadows>
      <CameraController spacerRefs={spacerRefs} />
      <Lights />
      <Suspense fallback={<Loader />}>
        <Character position={[10, 0.5, -5]} castShadow receiveShadow />
        <Building position={[10, 0, -5]} scale={[2, 2, 2]} castShadow receiveShadow />
      </Suspense>
      <Environment files="/images/sky.hdr" background />
      <OrbitControls />
    </Canvas>
  );
};

export default R3FCanvas;
