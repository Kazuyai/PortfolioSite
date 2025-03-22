import Head from "next/head";
import dynamic from "next/dynamic";
import { useProgress } from "@react-three/drei";
import styles from "@/styles/Home.module.scss";
import Loading from "@/components/common/Loading";
import Top, { collisionData as topCollision, eventData as topEvents } from "@/components/sections/Top";
import About from "@/components/sections/About";
import Skills, { collisionData as skillsCollision, eventData as skillsEvents } from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Gallery from "@/components/sections/Gallery";
import React, { use, useEffect, useRef, useState } from "react";
import { useSectionProgress } from "@/hooks/useSectionProgress";
import { time } from "console";

const R3FCanvas = dynamic(() => import("@/components/R3FCanvas"), { ssr: false });

const hitBoxes = {
  top: { collisionData: topCollision, eventData: topEvents },
  skills: { collisionData: skillsCollision, eventData: skillsEvents },
};

const Home = () => {
  const sections = [
    { id: "top", label: "Topセクション", component: Top },
    { id: "about", label: "Aboutセクション", component: About },
    { id: "skills", label: "Skillsセクション", component: Skills },
    { id: "projects", label: "Projectsセクション", component: Projects },
    { id: "gallery", label: "Galleryセクション", component: Gallery },
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
      const fadeTimer = setTimeout(() => setShowLoading(false), 2000);
      return () => clearTimeout(fadeTimer);
    }
  }, [isTimeElapsed, r3fLoaded]);

  useEffect(() => {
    if (startFadeOut) {
      document.body.style.overflow = "auto";
    } else {
      document.body.style.overflow = "hidden";
    }
  }, [startFadeOut]);

  return (
    <>
      <Head>
        <title>My Portfolio</title>
        <meta name="description" content="3D Model Showcase" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      {showLoading && <Loading progress={totalProgress} startFadeOut={startFadeOut} />}
      <R3FCanvas
        spacerRefs={spacerRefs}
        currentSection={sections[currentIndex]?.id || "top"}
        hitBoxes={hitBoxes}
        setActiveEvent={setActiveEvent}
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
