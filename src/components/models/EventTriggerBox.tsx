import React from "react";
import { Box } from "@react-three/drei";
import { MeshStandardMaterial } from "three";

interface EventTriggerBoxProps {
  id: string;
  position: [number, number, number];
  size: [number, number, number];
  // onEnter: (id: string) => void;
  // onLeave: (id: string) => void;
  debug?: boolean;
}

const EventTriggerBox: React.FC<EventTriggerBoxProps> = ({ id, position, size, debug = false }) => {
  return (
    <Box args={size} position={position}>
      <meshStandardMaterial
        attach="material"
        color="white"
        transparent
        opacity={debug ? 0.3 : 0}
        wireframe={debug}
      />
    </Box>
  );
};

export default EventTriggerBox;
