import Head from "next/head";
import dynamic from "next/dynamic";
import styles from "@/styles/Home.module.scss";
import Top from "@/components/sections/Top";
import Skills from "@/components/sections/Skills";
import React, { useRef } from "react";

const R3FCanvas = dynamic(() => import("@/components/R3FCanvas"), { ssr: false });

const Home = () => {
  const sections = [
    { id: "top", label: "Topセクション", component: Top },
    { id: "skills", label: "Skillsセクション", component: Skills },
  ];

  const spacerRefs = useRef<HTMLDivElement[]>([]);
  spacerRefs.current = [];

  return (
    <>
      <Head>
        <title>My Portfolio</title>
        <meta name="description" content="3D Model Showcase" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <R3FCanvas
        spacerRefs={spacerRefs}
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
                      spacerRefs.current[idx] = el;
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
