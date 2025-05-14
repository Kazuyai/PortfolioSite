import { Canvas, useThree } from "@react-three/fiber";
import { Environment, Stats } from "@react-three/drei";
// import { EffectComposer, Vignette } from "@react-three/postprocessing";
import { Fragment, Suspense, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import CameraController from "@/components/utils/CameraController";
import CharacterController from "@/components/utils/CharacterController";
import CollisionBox from "@/components/models/CollisionBox";
import EventTriggerBox from "@/components/models/EventTriggerBox";
import Character from "@/components/models/Character";
import Building from "@/components/models/Building";
import styles from "@/styles/R3FCanvas.module.scss";

interface Props {
  spacerRefs: HTMLDivElement[];
  currentSection: string;
  hitBoxes: { [key: string]: { collisionData: { position: [number, number, number]; size: [number, number, number]; }[]; eventData: { id: string; position: [number, number, number]; size: [number, number, number]; }[]; } };
  activeEvent: string | null;
  setActiveEvent: (id: string | null) => void;
  startFadeOut: boolean;
}

const Lights = () => {
  const directionalLightRef = useRef<THREE.DirectionalLight>(new THREE.DirectionalLight());
  // const pointLightRef = useRef<THREE.PointLight>(new THREE.PointLight());

  // useHelper(directionalLightRef, THREE.DirectionalLightHelper, 5, "red");
  // useHelper(pointLightRef, THREE.PointLightHelper, 1, "blue");

  const { scene } = useThree();

  // 各スポットライトの位置とターゲットの位置を定義
  const spotLights:{
    position: [number, number, number];
    target: [number, number, number];
  }[] = [
    { position: [0.3, -45.5, -3], target: [0.3, -46.3, -3.7] },
    { position: [4, -45.5, -3], target: [4, -46.3, -3.7] },
    { position: [-2.9, -45.5, 1], target: [-3.6, -46.3, 1.] },
  ];

  // 各スポットライトに関するrefを作成（useRefはトップレベルで作成する必要があるので個別に作成）
  const spotLightRef1 = useRef<THREE.SpotLight>(new THREE.SpotLight());
  const spotLightRef2 = useRef<THREE.SpotLight>(new THREE.SpotLight());
  const spotLightRef3 = useRef<THREE.SpotLight>(new THREE.SpotLight());

  const targetRef1 = useRef<THREE.Object3D>(new THREE.Object3D());
  const targetRef2 = useRef<THREE.Object3D>(new THREE.Object3D());
  const targetRef3 = useRef<THREE.Object3D>(new THREE.Object3D());
  
  const spotLightRefs = [
    { lightRef: spotLightRef1, targetRef: targetRef1 },
    { lightRef: spotLightRef2, targetRef: targetRef2 },
    { lightRef: spotLightRef3, targetRef: targetRef3 },
  ];

  // useHelper(spotLightRefs[0], THREE.SpotLightHelper, "cyan");
  // useHelper(spotLightRefs[1], THREE.SpotLightHelper, "cyan");
  // useHelper(spotLightRefs[2], THREE.SpotLightHelper, "cyan");
  // useHelper(spotLightRefs[3], THREE.SpotLightHelper, "cyan");

  useEffect(() => {
    for (let i = 0; i < spotLightRefs.length; i++) {
      const spot = spotLightRefs[i].lightRef.current;
      const target = spotLightRefs[i].targetRef.current;
      if (spot && target) {
        spot.target = target;
        scene.add(target);
      }
    }
  }, [scene]);

  // useHelper(spotLightRef, THREE.SpotLightHelper, "cyan");


  return (
    <>
      <ambientLight intensity={1} color={"#fff0e0"} />
      <directionalLight
        ref={directionalLightRef}
        position={[7, 7, 7]}
        intensity={1}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={100}
        shadow-camera-left={-50}
        shadow-camera-right={50}
        shadow-camera-top={50}
        shadow-camera-bottom={-50}
        shadow-bias={-0.003}
        color={"#fff0e0"}
      />
      {spotLights.map((config, i) => (
        <Fragment key={i}>
          <spotLight
            ref={spotLightRefs[i].lightRef}
            position={config.position}
            angle={Math.PI / 6}
            penumbra={1}
            intensity={80}
            color={"#fff0e0"}
            castShadow
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
            shadow-camera-far={50}
            shadow-camera-left={-10}
            shadow-camera-right={10}
            shadow-camera-top={10}
            shadow-camera-bottom={-10}
            shadow-bias={-0.003}
          />
          <object3D ref={spotLightRefs[i].targetRef} position={config.target} />
        </Fragment>
      ))}
      {/* <pointLight ref={pointLightRef} position={[0, 5, 0]} intensity={10} /> */}
    </>
  );
};

const R3FCanvas = ({ spacerRefs, currentSection, hitBoxes, activeEvent, setActiveEvent, startFadeOut }: Props) => {

  const characterRef = useRef<THREE.Group>(null);
  const [isMoving, setIsMoving] = useState(false);
  const collisionData = hitBoxes[currentSection]?.collisionData || [];
  const eventData = hitBoxes[currentSection]?.eventData || [];

  return (
    <Canvas 
      className={styles.canvas} 
      camera={{ position: [0, 5, 5], fov: 60 }} 
      flat 
      gl={{
        toneMapping: THREE.ACESFilmicToneMapping,
      }}
      shadows
    >
      <CameraController
        spacerRefs={spacerRefs}
        startFadeOut={startFadeOut}
      />
      <CharacterController 
        spacerRefs={spacerRefs} 
        characterRef={characterRef} 
        setIsMoving={setIsMoving}
        collisionData={collisionData}
        eventData={eventData}
        setActiveEvent={setActiveEvent}
      />
      <Lights />
      <Suspense fallback={ null}>
        <Character characterRef={characterRef} isMoving={isMoving} castShadow receiveShadow />
        <Building activeEvent={activeEvent} scale={[2, 2, 2]} castShadow receiveShadow />
        {collisionData.map((data, index) => (
          <CollisionBox
          key={index}
          position={data.position}
          size={data.size}
          // debug
        />
        ))}
        {eventData.map((data, index) => (
          <EventTriggerBox
          key={index}
          id={data.id}
          position={data.position}
          size={data.size}
          // onEnter={setActiveEvent}
          // onLeave={setActiveEvent}
          debug
        />
        ))}
      </Suspense>

      {/*<EffectComposer enabled={false}>*/}
        {/* <ChromaticAberration offset={new THREE.Vector2(0.0005, 0.001)} /> */}
        {/* <Glitch
          delay={new THREE.Vector2(0.1, 0.3)}
          duration={new THREE.Vector2(0.1, 0.3)}
          strength={new THREE.Vector2(0.1, 0.2)}
        /> */}
        {/* <Noise opacity={0.7} />  */}
        {/* <Vignette
          offset={0.1}
          darkness={0.8}
        /> */}
        {/* <Bloom intensity={0.3} luminanceThreshold={0.2} luminanceSmoothing={0.2} height={200} /> */}
      {/* </EffectComposer> */}
      <Environment files="/images/sky.hdr" background />
      {/* <OrbitControls /> */}
      <Stats />
    </Canvas>
  );
};

export default R3FCanvas;
