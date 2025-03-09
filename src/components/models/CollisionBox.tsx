import React from "react";
import { Box } from "@react-three/drei";
import { MeshStandardMaterial } from "three";

interface CollisionBoxProps {
  position: [number, number, number];
  size: [number, number, number];
  debug?: boolean;
}

const CollisionBox: React.FC<CollisionBoxProps> = ({ position, size, debug = false }) => {
  return (
    <Box args={size} position={position}>
      <meshStandardMaterial
        attach="material"
        color="red"
        transparent
        opacity={debug ? 0.3 : 0}
        wireframe={debug}
      />
    </Box>
  );
};

export default CollisionBox;
