import React, { useEffect, useState, useMemo, useRef } from "react";
import * as THREE from "three";
import { useSectionProgress } from "@/hooks/useSectionProgress";
import { useFrame, useThree } from "@react-three/fiber";
import { useRouter } from "next/router";

interface CharacterControllerProps {
  spacerRefs: HTMLDivElement[];
  characterRef: React.RefObject<THREE.Object3D>;
  setIsMoving: (isMoving: boolean) => void;
  isArrived: boolean;
  setIsArrived: (isArrived: boolean) => void;
  returningToBase: boolean;
  setReturningToBase: (returning: boolean) => void;
  prevIndex: number;
  setPrevIndex: (index: number) => void;
  collisionData: { position: [number, number, number]; size: [number, number, number] }[];
  eventData: { id: string; position: [number, number, number]; size: [number, number, number] }[];
  setActiveEvent: (id: string | null) => void;
}

const characterPositions = [
  { position: [-3.5, 0.5, -3.5] },
  { position: [-3.5, -15, -3.5] },
  { position: [-3.5, -27, -3.5] },
  { position: [-3.5, -39, -3.5] },
  { position: [-3.5, -51, -3.5] },
];

const MOVE_SPEED = 0.2;
const DIST_THRESHOLD = 0.01;

const CharacterController: React.FC<CharacterControllerProps> = ({
  spacerRefs,
  characterRef,
  setIsMoving,
  isArrived,
  setIsArrived,
  returningToBase,
  setReturningToBase,
  prevIndex,
  setPrevIndex,
  collisionData,
  eventData,
  setActiveEvent,
}) => {
  const router = useRouter();
  const { currentIndex, progress } = useSectionProgress(spacerRefs);
  const { camera } = useThree();
  const [canMove, setCanMove] = useState(false);

  const [move, setMove] = useState({
    forward: false,
    backward: false,
    left: false,
    right: false,
  });

  const lastPos = useRef(new THREE.Vector3());
  const wasMoving = useRef(false);

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
      
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.code)) {
        e.preventDefault();
      }

      if (e.code === "KeyW" || e.code === "ArrowUp") setMove((m) => ({ ...m, forward: true }));
      if (e.code === "KeyS" || e.code === "ArrowDown") setMove((m) => ({ ...m, backward: true }));
      if (e.code === "KeyA" || e.code === "ArrowLeft") setMove((m) => ({ ...m, left: true }));
      if (e.code === "KeyD" || e.code === "ArrowRight") setMove((m) => ({ ...m, right: true }));
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code === "KeyW" || e.code === "ArrowUp") setMove((m) => ({ ...m, forward: false }));
      if (e.code === "KeyS" || e.code === "ArrowDown") setMove((m) => ({ ...m, backward: false }));
      if (e.code === "KeyA" || e.code === "ArrowLeft") setMove((m) => ({ ...m, left: false }));
      if (e.code === "KeyD" || e.code === "ArrowRight") setMove((m) => ({ ...m, right: false }));
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
        // 進行方向を向かせる
        const moveVector = floorPos.clone().sub(charObj.position).normalize();
        if (moveVector.length() > 0) {
          charObj.rotation.y = Math.atan2(moveVector.x, moveVector.z);
        }

        if (charObj.position.distanceTo(floorPos) < 0.2) {
          setReturningToBase(false);
        }
      } else if(isArrived) {
        const basePos = new THREE.Vector3(
          // ...characterPositions[prevIndex].position
          characterPositions[prevIndex].position[0] + 5,
          characterPositions[prevIndex].position[1],
          characterPositions[prevIndex].position[2] + 5,
        );
        charObj.position.lerp(basePos, 0.1);
        // 進行方向を向かせる
        const moveVector = basePos.clone().sub(charObj.position).normalize();
        if (moveVector.length() > 0) {
          charObj.rotation.y = Math.atan2(moveVector.x, moveVector.z);
        }

        if (charObj.position.distanceTo(basePos) < 0.2) {
          setIsArrived(false);
          setCanMove(true);
        }
      } else {
        const startIndex = currentIndex;
        const endIndex =
          currentIndex + 1 < characterPositions.length ? currentIndex + 1 : currentIndex;

        const startPos = characterPositions[startIndex].position;
        const endPos = characterPositions[endIndex].position;

        const finalX = startPos[0] + (endPos[0] - startPos[0]) * (progress > 0.5 ? 1 : 0);
        const finalY = startPos[1] + (endPos[1] - startPos[1]) * (progress > 0.5 ? 1 : 0);
        const finalZ = startPos[2] + (endPos[2] - startPos[2]) * (progress > 0.5 ? 1 : 0);

        charObj.position.lerp(new THREE.Vector3(finalX, finalY, finalZ), 0.1);

        // 正面を向かせる
        const front = new THREE.Vector3();
        camera.getWorldDirection(front);
        front.y = 0;
        front.normalize().negate();

        if (front.length() > 0) {
          charObj.rotation.y = Math.atan2(front.x, front.z);
        }

        if (progress === 0) {
          const floorPos = new THREE.Vector3(...characterPositions[currentIndex].position);
          if (charObj.position.distanceTo(floorPos) < 0.2) {
            setIsArrived(true);
          }
        }
      }
    } else {
      // const charBoundingBox = new THREE.Box3().setFromObject(charObj);
      const newPosition = charObj.position.clone();

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
        const moveVector = newPosition.clone().sub(charObj.position).normalize();
        if (moveVector.length() > 0) {
          charObj.rotation.y = Math.atan2(moveVector.x, moveVector.z);
        }
        charObj.position.copy(newPosition);
      }
    }

    const activeEvent = eventBoxes.find(({ box }) =>
      box.intersectsBox(new THREE.Box3().setFromCenterAndSize(charObj.position, new THREE.Vector3(1, 2, 1)))
    );

    if (activeEvent) {
      if(activeEvent.id === "SECRET") {
        // スクロールはしない
        router.push("/secret", undefined, { scroll: false });
      } else {
        setActiveEvent(activeEvent.id);
      }
    } else {
      setActiveEvent(null);
    }

    const dist       = charObj.position.distanceTo(lastPos.current);
    const hasInput   = move.forward || move.backward || move.left || move.right;
    const shouldMove =
      dist > DIST_THRESHOLD ||                  // 実際に動いた
      (canMove ? hasInput : returningToBase);   // 入力中 or 帰還中

    if (shouldMove !== wasMoving.current) {
      wasMoving.current = shouldMove;
      setIsMoving(shouldMove);
    }
    lastPos.current.copy(charObj.position);
  });

  return null;
};

export default CharacterController;
