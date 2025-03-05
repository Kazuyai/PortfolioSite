import React, { useRef } from "react";
import * as THREE from "three";
import { useSectionProgress } from "@/hooks/useSectionProgress";
import { useFrame } from "@react-three/fiber";

interface CharacterControllerProps {
  spacerRefs: React.MutableRefObject<HTMLDivElement[]>;
  characterRef: React.RefObject<THREE.Object3D>;
}

const characterPositions = [
  { position: [0, 0.5, 0] },
  { position: [0, -11.5, 0] },
  { position: [0, -26.5, 0] },
  { position: [0, -41.5, 0] },
];

const CharacterController: React.FC<CharacterControllerProps> = ({
  spacerRefs,
  characterRef,
}) => {
  const { currentIndex, progress } = useSectionProgress(spacerRefs);

  useFrame(() => {
    const charObj = characterRef.current;
    if (!charObj) return;

    const startIndex = currentIndex;
    const endIndex =
      currentIndex + 1 < characterPositions.length
        ? currentIndex + 1
        : currentIndex;
    
    const startPos = characterPositions[startIndex].position;
    const endPos = characterPositions[endIndex].position;

    const finalX = startPos[0] + (endPos[0] - startPos[0]) * progress;
    const finalY = startPos[1] + (endPos[1] - startPos[1]) * progress;
    const finalZ = startPos[2] + (endPos[2] - startPos[2]) * progress;

    charObj.position.lerp(new THREE.Vector3(finalX, finalY, finalZ), 0.1);
  });

  return null;
};

export default CharacterController;
