import Head from "next/head";
import dynamic from "next/dynamic";
import styles from "@/styles/Home.module.scss";
import Top, { collisionData as topCollision, eventData as topEvents } from "@/components/sections/Top";
import Skills, { collisionData as skillsCollision, eventData as skillsEvents } from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Gallery from "@/components/sections/Gallery";
import React, { use, useEffect, useRef, useState } from "react";
import { useSectionProgress } from "@/hooks/useSectionProgress";

const R3FCanvas = dynamic(() => import("@/components/R3FCanvas"), { ssr: false });

const hitBoxes = {
  top: { collisionData: topCollision, eventData: topEvents },
  skills: { collisionData: skillsCollision, eventData: skillsEvents },
};

const Home = () => {
  const sections = [
    { id: "top", label: "Topセクション", component: Top },
    { id: "skills", label: "Skillsセクション", component: Skills },
    { id: "projects", label: "Projectsセクション", component: Projects },
    { id: "gallery", label: "Galleryセクション", component: Gallery },
  ];

  const [activeEvent, setActiveEvent] = useState<string | null>(null);

  const [isOpeningAnimationFinished, setIsOpeningAnimationFinished] = React.useState(false);
  const [spacerRefs, setSpacerRefs] = useState<HTMLDivElement[]>([]);
  const { currentIndex } = useSectionProgress(spacerRefs);

  useEffect(() => {
    const openingAnimation = () => {
      setTimeout(() => {
        setIsOpeningAnimationFinished(true);
      }, 3000);
    };
    openingAnimation();
  }, []);


  useEffect(() => {
    if (isOpeningAnimationFinished) {
      document.body.style.overflow = "auto";
    } else {
      document.body.style.overflow = "hidden";
    }
  }, [isOpeningAnimationFinished]);

  return (
    <>
      <Head>
        <title>My Portfolio</title>
        <meta name="description" content="3D Model Showcase" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
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
              <SectionComp />

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
    </>
  );
};

export default Home;
