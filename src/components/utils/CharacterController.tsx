import React, { useEffect, useRef, useState } from "react";
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

const CharacterController: React.FC<CharacterControllerProps> = ({ spacerRefs, characterRef }) => {
  const { currentIndex, progress } = useSectionProgress(spacerRefs);
  const [canMove, setCanMove] = useState(true);
  const [move, setMove] = useState({
    forward: false,
    backward: false,
    left: false,
    right: false,
  });

  useEffect(() => {
    setCanMove(false);
    if (progress === 0) {
      if (!characterRef.current) return;
      if(characterPositions[currentIndex].position[1] - characterRef.current.position.y < 0.1) {
        setCanMove(true);
      }
    }
  }, [progress]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!canMove) return;
      if (e.code === "KeyW") setMove((m) => ({ ...m, forward: true }));
      if (e.code === "KeyS") setMove((m) => ({ ...m, backward: true }));
      if (e.code === "KeyA") setMove((m) => ({ ...m, left: true }));
      if (e.code === "KeyD") setMove((m) => ({ ...m, right: true }));
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code === "KeyW") setMove((m) => ({ ...m, forward: false }));
      if (e.code === "KeyS") setMove((m) => ({ ...m, backward: false }));
      if (e.code === "KeyA") setMove((m) => ({ ...m, left: false }));
      if (e.code === "KeyD") setMove((m) => ({ ...m, right: false }));
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [canMove]);

  useEffect(() => {
    if (!characterRef.current) return;
    const charObj = characterRef.current;

    if (move.forward) {
      charObj.position.z -= 0.1;
    }
    if (move.backward) {
      charObj.position.z += 0.1;
    }
    if (move.left) {
      charObj.position.x -= 0.1;
    }
    if (move.right) {
      charObj.position.x += 0.1;
    }
  }, [move]);

  useFrame(() => {
    if (canMove) return;

    const charObj = characterRef.current;
    if (!charObj) return;

    const startIndex = currentIndex;
    const endIndex = currentIndex + 1 < characterPositions.length ? currentIndex + 1 : currentIndex;

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
