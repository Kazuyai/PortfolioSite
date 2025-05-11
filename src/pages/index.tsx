import Head from "next/head";
import dynamic from "next/dynamic";
import { useProgress } from "@react-three/drei";
import styles from "@/styles/Home.module.scss";
import Loading from "@/components/common/Loading";
import ElevatorMenu from "@/components/common/ElevatorMenu";
import Top, { collisionData as topCollision, eventData as topEvents } from "@/components/sections/Top";
import About, { collisionData as aboutCollision, eventData as aboutEvents } from "@/components/sections/About";
import Skills, { collisionData as skillsCollision, eventData as skillsEvents } from "@/components/sections/Skills";
import Projects, { collisionData as projectsCollision, eventData as projectsEvents } from "@/components/sections/Projects";
import Gallery, { collisionData as galleryCollision, eventData as galleryEvents } from "@/components/sections/Gallery";
import React, { useEffect, useState } from "react";
import { useSectionProgress } from "@/hooks/useSectionProgress";

const R3FCanvas = dynamic(() => import("@/components/R3FCanvas"), { ssr: false });

const hitBoxes = {
  top: { collisionData: topCollision, eventData: topEvents },
  about: { collisionData: aboutCollision, eventData: aboutEvents },
  skills: { collisionData: skillsCollision, eventData: skillsEvents },
  projects: { collisionData: projectsCollision, eventData: projectsEvents },
  gallery: { collisionData: galleryCollision, eventData: galleryEvents },
};

const Home = () => {
  const sections = [
    { id: "top", label: "Top", component: Top },
    { id: "about", label: "About", component: About },
    { id: "skills", label: "Skills", component: Skills },
    { id: "projects", label: "Projects", component: Projects },
    { id: "gallery", label: "Gallery", component: Gallery },
  ];

  const [activeEvent, setActiveEvent] = useState<string | null>(null);

  const { active, progress } = useProgress();
  const r3fLoaded = !active;
  const [showLoading, setShowLoading] = useState(true);
  const [startFadeOut, setStartFadeOut] = useState(false);

  const [spacerRefs, setSpacerRefs] = useState<HTMLDivElement[]>([]);
  const { currentIndex } = useSectionProgress(spacerRefs);


  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  // 5秒経過かつ3Dモデルの読み込みが完了することが条件
  const timeProgress = Math.min((elapsedSeconds / 5) * 100, 100);
  const totalProgress = Math.min(progress, timeProgress);

  const isTimeElapsed = timeProgress >= 100;

  useEffect(() => {
    const startTime = performance.now();
    let requestId: number;

    const tick = () => {
      const now = performance.now();
      const diffSec = (now - startTime) / 1000;
      setElapsedSeconds(diffSec);
      requestId = requestAnimationFrame(tick);
    };

    requestId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(requestId);
    };
  }, []);

  useEffect(() => {
    if (isTimeElapsed && r3fLoaded) {
      setStartFadeOut(true);
      const fadeTimer = setTimeout(() => setShowLoading(false), 4000);
      return () => clearTimeout(fadeTimer);
    }
  }, [isTimeElapsed, r3fLoaded]);

  useEffect(() => {
    let timer : ReturnType<typeof setTimeout>;
    if (startFadeOut) {
      timer = setTimeout(() => {
        document.body.style.overflow = "auto";
      }, 3000);
    } else {
      document.body.style.overflow = "hidden";
    }

    return () => clearTimeout(timer);
  }, [startFadeOut]);

  return (
    <>
      <Head>
        <title>My Portfolio</title>
        <meta name="description" content="3D Model Showcase" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      {showLoading && <Loading progress={totalProgress} startFadeOut={startFadeOut} />}
      <div className={styles.vignette}></div>
      <R3FCanvas
        spacerRefs={spacerRefs}
        currentSection={sections[currentIndex]?.id || "top"}
        hitBoxes={hitBoxes}
        activeEvent={activeEvent}
        setActiveEvent={setActiveEvent}
        startFadeOut={startFadeOut}
      />
      <ElevatorMenu
        sections={sections}
      />
      <div className={styles.text__container}>
        {/* すべてのsectionを配置 */}
        {sections.map(({ id, component: SectionComp }, idx) => {
          return (
            <React.Fragment key={id}>
              {/* section */}
              <SectionComp activeEvent={activeEvent} />

              {/* section間にspacerを配置 */}
              {idx < sections.length - 1 && (
                <div
                  ref={(el) => {
                    if (el) {
                      setSpacerRefs((prev) => {
                        if (!prev.includes(el)) {
                          return [...prev, el];
                        }
                        return prev;
                      });
                    }
                  }}
                  className={styles.spacer}
                ></div>
              )}
            </React.Fragment>
          );
        })}
      </div>
      {/* {!isOpeningAnimationFinished && <Loading />} */}
    </>
  );
};

export default Home;
