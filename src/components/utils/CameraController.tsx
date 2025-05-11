import React, { useState, useEffect, useRef } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import { Vector3 } from "three";
import { useSectionProgress } from "@/hooks/useSectionProgress";

interface CameraPosition {
  position: [number, number, number];
  lookAt: [number, number, number];
}

interface CameraControllerProps {
  spacerRefs: HTMLDivElement[];
  startFadeOut: boolean;
}

const baseCameraPositions: CameraPosition[] = [
  {
    position: [11, 6, 18],
    lookAt: [-7, 8, 5],
  },
  {
    position: [11, -11, 16],
    lookAt: [-3, -9, 5],
  },
  {
    position: [11, -23, 16],
    lookAt: [-3, -21, 5],
  },
  {
    position: [11, -35, 16],
    lookAt: [-3, -33, 5],
  },
  {
    position: [11, -47, 16],
    lookAt: [-3, -45, 5],
  }
];

const CameraController: React.FC<CameraControllerProps> = ({ spacerRefs, startFadeOut }) => {
  const { camera, size } = useThree();
  const { currentIndex, progress } = useSectionProgress(spacerRefs);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  const [cameraPositions, setCameraPositions] = useState(baseCameraPositions);

  const TRANSITION_DURATION = 3;
  const transitionStart = useRef<number>(0);

  useEffect(() => {
    if(startFadeOut) {
      transitionStart.current = performance.now();
    }
  }, [startFadeOut]);

  useEffect(() => {
    const updateCameraPosition = () => {
      // const aspectRatio = size.width / size.height;
      // const xOffset = aspectRatio < 1.5 ? -5 : 0;

      // setCameraPositions([
      //   {
      //     position: [18 - xOffset, 6, 13],
      //     lookAt: [0 - xOffset, 8, 0],
      //   },
      //   {
      //     position: [18 - xOffset, -6, 11],
      //     lookAt: [4 - xOffset, -3, 0],
      //   },
      // ]);
      const isMobile = size.width < 768;
      setCameraPositions([
        {
          position: [isMobile ? 24 : baseCameraPositions[0].position[0], isMobile ? 12 : baseCameraPositions[0].position[1], isMobile ? 24 : baseCameraPositions[0].position[2]],
          lookAt: [isMobile ? 0 : baseCameraPositions[0].lookAt[0], isMobile ? 12 : baseCameraPositions[0].lookAt[1], isMobile ? 0 : baseCameraPositions[0].lookAt[2]],
        },
        {
          position: [isMobile ? 18 : baseCameraPositions[1].position[0], baseCameraPositions[1].position[1], isMobile ? 18 : baseCameraPositions[1].position[2]],
          lookAt: [isMobile ? 0 : baseCameraPositions[1].lookAt[0], baseCameraPositions[1].lookAt[1], isMobile ? 0 : baseCameraPositions[1].lookAt[2]],
        },
        {
          position: [isMobile ? 18 : baseCameraPositions[2].position[0], baseCameraPositions[2].position[1], isMobile ? 18 : baseCameraPositions[2].position[2]],
          lookAt: [isMobile ? 0 : baseCameraPositions[2].lookAt[0], baseCameraPositions[2].lookAt[1], isMobile ? 0 : baseCameraPositions[2].lookAt[2]],
        },
        {
          position: [isMobile ? 18 : baseCameraPositions[3].position[0], baseCameraPositions[3].position[1], isMobile ? 18 : baseCameraPositions[3].position[2]],
          lookAt: [isMobile ? 0 : baseCameraPositions[3].lookAt[0], baseCameraPositions[3].lookAt[1], isMobile ? 0 : baseCameraPositions[3].lookAt[2]],
        },
        {
          position: [isMobile ? 18 : baseCameraPositions[4].position[0], baseCameraPositions[4].position[1], isMobile ? 18 : baseCameraPositions[4].position[2]],
          lookAt: [isMobile ? 0 : baseCameraPositions[4].lookAt[0], baseCameraPositions[4].lookAt[1], isMobile ? 0 : baseCameraPositions[4].lookAt[2]],
        }
      ]);
    };

    updateCameraPosition();
    window.addEventListener("resize", updateCameraPosition);
    return () => window.removeEventListener("resize", updateCameraPosition);
  }, [size.width]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouse({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame(() => {
    if (startFadeOut && performance.now() - transitionStart.current < TRANSITION_DURATION * 1000) {
      const now = performance.now();
      const elapsed = (now - transitionStart.current) / 1000;
      const progress = Math.min(elapsed / TRANSITION_DURATION, 1);
      const cam = cameraPositions[0];
      camera.position.set(...cam.position);
      const firstLookAt = new Vector3(...cam.lookAt).add(new Vector3(5, 10, 5));
      const transitionLookAt = new Vector3(...cam.lookAt);
      camera.lookAt(firstLookAt.lerp(transitionLookAt, progress));
      // camera.lookAt(lookAt);
      return;
    }
    const startIndex = currentIndex;
    const endIndex = currentIndex + 1 < cameraPositions.length ? currentIndex + 1 : currentIndex;

    const startCam = cameraPositions[startIndex];
    const endCam = cameraPositions[endIndex];

    const finalPosition = [
      startCam.position[0] + (endCam.position[0] - startCam.position[0]) * progress,
      startCam.position[1] + (endCam.position[1] - startCam.position[1]) * progress,
      startCam.position[2] + (endCam.position[2] - startCam.position[2]) * progress,
    ] as [number, number, number];

    const finalLookAt = [
      startCam.lookAt[0] + (endCam.lookAt[0] - startCam.lookAt[0]) * progress,
      startCam.lookAt[1] + (endCam.lookAt[1] - startCam.lookAt[1]) * progress,
      startCam.lookAt[2] + (endCam.lookAt[2] - startCam.lookAt[2]) * progress,
    ] as [number, number, number];

    if (finalPosition && finalLookAt) {
      const halfW = window.innerWidth / 2;
      const halfH = window.innerHeight / 2;
      const nx = (mouse.x - halfW) / halfW;
      const ny = (mouse.y - halfH) / halfH;

      const offsetFactor = 0.2;

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
