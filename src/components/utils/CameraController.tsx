import React, { useState, useEffect, useMemo } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import { Vector3 } from "three";

/**
 * 各セクションに対応するカメラの position, lookAt を定義
 */
const cameraPositions = [
  {
    position: [18, 6, 13] as [number, number, number],
    lookAt: [0, 8, 0] as [number, number, number],
  },
  {
    position: [18, -5, 13] as [number, number, number],
    lookAt: [0, -2, 0] as [number, number, number],
  },
];

interface CameraControllerProps {
  spacerRefs: React.MutableRefObject<HTMLDivElement[]>;
}

const CameraController: React.FC<CameraControllerProps> = ({ spacerRefs }) => {
  const { camera } = useThree();

  const [scrollY, setScrollY] = useState(0);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouse({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const spacerPositions = useMemo(() => {
    return spacerRefs.current.map((spacerEl) => {
      const rect = spacerEl.getBoundingClientRect();
      const startY = rect.top + window.scrollY;
      const endY = startY + rect.height;
      return { startY, endY };
    });
  }, [spacerRefs.current]);

  useFrame(() => {
    let finalPosition: [number, number, number] | null = null;
    let finalLookAt: [number, number, number] | null = null;

    let foundSpacerIndex = -1;
    for (let i = 0; i < spacerPositions.length; i++) {
      const { startY, endY } = spacerPositions[i];
      if (scrollY >= startY && scrollY <= endY) {
        foundSpacerIndex = i;
        break;
      }
    }

    if (foundSpacerIndex >= 0) {
      const startPos = cameraPositions[foundSpacerIndex].position;
      const endPos =
        cameraPositions[foundSpacerIndex + 1]?.position || startPos;

      const startLook = cameraPositions[foundSpacerIndex].lookAt;
      const endLook =
        cameraPositions[foundSpacerIndex + 1]?.lookAt || startLook;

      const { startY, endY } = spacerPositions[foundSpacerIndex];
      const progress = (scrollY - startY) / (endY - startY);

      finalPosition = [
        startPos[0] + (endPos[0] - startPos[0]) * progress,
        startPos[1] + (endPos[1] - startPos[1]) * progress,
        startPos[2] + (endPos[2] - startPos[2]) * progress,
      ];

      finalLookAt = [
        startLook[0] + (endLook[0] - startLook[0]) * progress,
        startLook[1] + (endLook[1] - startLook[1]) * progress,
        startLook[2] + (endLook[2] - startLook[2]) * progress,
      ];
    } else {
      if (spacerPositions.length === 0) {
        finalPosition = cameraPositions[0].position;
        finalLookAt = cameraPositions[0].lookAt;
      } else {
        if (scrollY < spacerPositions[0].startY) {
          finalPosition = cameraPositions[0].position;
          finalLookAt = cameraPositions[0].lookAt;
        }
        else if (scrollY > spacerPositions[spacerPositions.length - 1].endY) {
          const lastIndex = cameraPositions.length - 1;
          finalPosition = cameraPositions[lastIndex].position;
          finalLookAt = cameraPositions[lastIndex].lookAt;
        }
      }
    }

    if (finalPosition && finalLookAt) {
      const halfW = window.innerWidth / 2;
      const halfH = window.innerHeight / 2;
      const nx = (mouse.x - halfW) / halfW;
      const ny = (mouse.y - halfH) / halfH;

      const offsetFactor = 0;  

      const offsetPos = new Vector3(
        finalPosition[0] + nx * offsetFactor,
        finalPosition[1] + ny * offsetFactor,
        finalPosition[2]
      );

      camera.position.lerp(offsetPos, 0.5);

      camera.lookAt(...finalLookAt);
    }
  });

  return null;
};

export default CameraController;
