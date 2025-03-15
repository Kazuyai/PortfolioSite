import { Canvas, useThree } from "@react-three/fiber";
import { Environment, OrbitControls, useHelper } from "@react-three/drei";
import { EffectComposer, Bloom, ChromaticAberration, Glitch, Noise, Vignette } from "@react-three/postprocessing";
import { Suspense, useRef, useEffect } from "react";
import * as THREE from "three";
import CameraController from "@/components/utils/CameraController";
import CharacterController from "@/components/utils/CharacterController";
import CollisionBox from "@/components/models/CollisionBox";
import EventTriggerBox from "@/components/models/EventTriggerBox";
import Character from "@/components/models/Character";
import Building from "@/components/models/Building";
import Loader from "@/components/common/Loader";
import styles from "@/styles/R3FCanvas.module.scss";
import { render } from "sass";

interface Props {
  spacerRefs: HTMLDivElement[];
  currentSection: string;
  hitBoxes: { [key: string]: { collisionData: { position: [number, number, number]; size: [number, number, number]; }[]; eventData: { id: string; position: [number, number, number]; size: [number, number, number]; }[]; } };
  setActiveEvent: (id: string | null) => void;
}

const Lights = () => {
  const directionalLightRef = useRef<THREE.DirectionalLight>(new THREE.DirectionalLight());
  const pointLightRef = useRef<THREE.PointLight>(new THREE.PointLight());

  // useHelper(directionalLightRef, THREE.DirectionalLightHelper, 5, "red");
  // useHelper(pointLightRef, THREE.PointLightHelper, 1, "blue");

  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight
        ref={directionalLightRef}
        position={[7, 7, 7]}
        intensity={1}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={30}
        shadow-camera-left={-20}
        shadow-camera-right={20}
        shadow-camera-top={20}
        shadow-camera-bottom={-20}
      />
      {/* <pointLight ref={pointLightRef} position={[0, 5, 0]} intensity={10} /> */}
    </>
  );
};

const R3FCanvas = ({ spacerRefs, currentSection, hitBoxes, setActiveEvent }: Props) => {

  const characterRef = useRef<THREE.Group>(null);
  const collisionData = hitBoxes[currentSection]?.collisionData || [];
  const eventData = hitBoxes[currentSection]?.eventData || [];

  return (
    <Canvas 
      className={styles.canvas} 
      camera={{ position: [0, 5, 5], fov: 60 }} 
      flat 
      gl={{
        toneMapping: THREE.ACESFilmicToneMapping,
        // outputEncoding: THREE.sRGBEncoding,
      }}
      shadows
    >
      <CameraController spacerRefs={spacerRefs} />
      <CharacterController 
        spacerRefs={spacerRefs} 
        characterRef={characterRef} 
        collisionData={collisionData}
        eventData={eventData}
        setActiveEvent={setActiveEvent}
      />
      <Lights />
      <Suspense fallback={<Loader />}>
        <Character ref={characterRef} castShadow receiveShadow />
        <Building scale={[2, 2, 2]} castShadow receiveShadow />
        {collisionData.map((data, index) => (
          <CollisionBox key={index} position={data.position} size={data.size} debug />
        ))}
        {eventData.map((data, index) => (
          <EventTriggerBox key={index} id={data.id} position={data.position} size={data.size} onEnter={setActiveEvent} onLeave={setActiveEvent} debug />
        ))}
      </Suspense>

      <EffectComposer enabled={false}>
        {/* <ChromaticAberration offset={new THREE.Vector2(0.0005, 0.001)} /> */}
        {/* <Glitch
          delay={new THREE.Vector2(0.1, 0.3)}
          duration={new THREE.Vector2(0.1, 0.3)}
          strength={new THREE.Vector2(0.1, 0.2)}
        /> */}
        {/* <Noise opacity={0.7} />  */}
        <Vignette
          offset={0.1}
          darkness={0.8}
        />
        <Bloom intensity={0.3} luminanceThreshold={0.2} luminanceSmoothing={0.2} height={200} />
      </EffectComposer>
      <Environment files="/images/sky.hdr" background />
      {/* <OrbitControls /> */}
    </Canvas>
  );
};

export default R3FCanvas;
