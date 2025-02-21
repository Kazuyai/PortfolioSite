import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import { Suspense } from "react";
import Character from "@/components/models/Character";

const R3FCanvas = () => {
  return (
    <Canvas camera={{ position: [0, 0, 3] }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <Suspense fallback={null}>
        <Character />
      </Suspense>
      <OrbitControls />
      <Environment preset="sunset" />
    </Canvas>
  );
};

export default R3FCanvas;
