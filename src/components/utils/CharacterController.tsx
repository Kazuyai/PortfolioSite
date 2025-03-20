import React, { useEffect, useState, useMemo } from "react";
import * as THREE from "three";
import { useSectionProgress } from "@/hooks/useSectionProgress";
import { useFrame, useThree } from "@react-three/fiber";

interface CharacterControllerProps {
  spacerRefs: HTMLDivElement[];
  characterRef: React.RefObject<THREE.Object3D>;
  collisionData: { position: [number, number, number]; size: [number, number, number] }[];
  eventData: { id: string; position: [number, number, number]; size: [number, number, number] }[];
  setActiveEvent: (id: string | null) => void;
}

const characterPositions = [
  { position: [-3.5, 0.5, -3.5] },
  { position: [-3.5, -15, -3.5] },
  { position: [-3.5, -26.5, -3.5] },
  { position: [-3.5, -41.5, -3.5] },
  { position: [-3.5, -53, -3.5] },
];

const MOVE_SPEED = 0.3;

const CharacterController: React.FC<CharacterControllerProps> = ({
  spacerRefs,
  characterRef,
  collisionData,
  eventData,
  setActiveEvent,
}) => {
  const { currentIndex, progress } = useSectionProgress(spacerRefs);
  const { camera } = useThree();
  const [canMove, setCanMove] = useState(false);
  const [prevIndex, setPrevIndex] = useState(0);
  const [returningToBase, setReturningToBase] = useState(false);

  const [move, setMove] = useState({
    forward: false,
    backward: false,
    left: false,
    right: false,
  });

  const collisionBoxes = useMemo(
    () =>
      collisionData.map(({ position, size }) => ({
        box: new THREE.Box3().setFromCenterAndSize(
          new THREE.Vector3(...position),
          new THREE.Vector3(...size)
        ),
      })),
    [collisionData]
  );

  const eventBoxes = useMemo(
    () =>
      eventData.map(({ id, position, size }) => ({
        id,
        box: new THREE.Box3().setFromCenterAndSize(
          new THREE.Vector3(...position),
          new THREE.Vector3(...size)
        ),
      })),
    [eventData]
  );

  useEffect(() => {
    setCanMove(false);
    if (progress === 0) {
      setPrevIndex(currentIndex);
      setReturningToBase(false);
    }
  }, [progress, currentIndex]);

  useEffect(() => {
    setReturningToBase(true);
  }, [canMove]);

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

  useFrame(() => {
    if (!characterRef.current) return;
    const charObj = characterRef.current;

    if (!canMove) {
      if (returningToBase) {
        const floorPos = new THREE.Vector3(...characterPositions[prevIndex].position);
        charObj.position.lerp(floorPos, 0.1);

        if (charObj.position.distanceTo(floorPos) < 0.2) {
          setReturningToBase(false);
        }
        return;
      } else {
        const startIndex = currentIndex;
        const endIndex =
          currentIndex + 1 < characterPositions.length ? currentIndex + 1 : currentIndex;

        const startPos = characterPositions[startIndex].position;
        const endPos = characterPositions[endIndex].position;

        const finalX = startPos[0] + (endPos[0] - startPos[0]) * progress;
        const finalY = startPos[1] + (endPos[1] - startPos[1]) * progress;
        const finalZ = startPos[2] + (endPos[2] - startPos[2]) * progress;

        charObj.position.lerp(new THREE.Vector3(finalX, finalY, finalZ), 0.1);

        if (progress === 0) {
          const floorPos = new THREE.Vector3(...characterPositions[currentIndex].position);
          if (charObj.position.distanceTo(floorPos) < 0.2) {
            setCanMove(true);
          }
        }
        return;
      }
    }

    // const charBoundingBox = new THREE.Box3().setFromObject(charObj);
    let newPosition = charObj.position.clone();

    const forward = new THREE.Vector3();
    camera.getWorldDirection(forward);
    forward.y = 0;
    forward.normalize();

    const right = forward.clone().cross(new THREE.Vector3(0, 1, 0)).normalize();

    if (move.forward) newPosition.addScaledVector(forward, MOVE_SPEED);
    if (move.backward) newPosition.addScaledVector(forward, -MOVE_SPEED);
    if (move.left) newPosition.addScaledVector(right, -MOVE_SPEED);
    if (move.right) newPosition.addScaledVector(right, MOVE_SPEED);

    const isColliding = collisionBoxes.some(({ box }) =>
      box.intersectsBox(new THREE.Box3().setFromCenterAndSize(newPosition, new THREE.Vector3(1, 2, 1)))
    );

    if (!isColliding) {
      charObj.position.copy(newPosition);
    }

    const activeEvent = eventBoxes.find(({ box }) =>
      box.intersectsBox(new THREE.Box3().setFromCenterAndSize(charObj.position, new THREE.Vector3(1, 2, 1)))
    );

    if (activeEvent) {
      setActiveEvent(activeEvent.id);
    } else {
      setActiveEvent(null);
    }
  });

  return null;
};

export default CharacterController;
