import React from "react";
import styles from "@/styles/sections/About.module.scss";
import FadeinTitle from "../common/FadeinTitle";
import useElementVisibility from "@/hooks/useElementVisibility";
import Link from "next/link";
import AutoSizeImage from "../common/AutoSizeImage";

interface AboutProps {
  activeEvent: string | null;
}

export const collisionData: {
  position: [number, number, number];
  size: [number, number, number];
}[] = [
  { position: [-3, -14, -3], size: [3, 2, 3] },
  { position: [-4, -14, 3], size: [1, 2, 8] },
  { position: [3, -14, -3.5], size: [8, 2, 1] },
  { position: [7, -14, 0], size: [1, 2, 14] },
  { position: [1, -14, 7], size: [12, 2, 1] },  
];

export const eventData: {
  id: string;
  position: [number, number, number];
  size: [number, number, number];
}[] = [{ id: "Event_About_01", position: [1, -14, -2], size: [2, 2, 1] }];

const eventContent: { [key: string]: JSX.Element } = {
  Event_About_01: (
    <div className={styles.eventContent}>
      <h2>ひみつのへや</h2>
      <p>この建物のどこかに&quot;ひみつのへや&quot;が...</p>
      <br></br>
      <p>↓ ↓ ↓</p>
      <p className={styles.secretText}>Projects階に…？</p>
      <p>↑ ↑ ↑</p>
    </div>
  ),
};

const About = ({ activeEvent }: AboutProps) => {
  const { ref, isVisible } = useElementVisibility({ threshold: 0.1 });
  return (
    <section ref={ref} id="about" className={`${styles.about} ${isVisible ? styles.visible : ""}`}>
      <FadeinTitle title="About" isVisible={isVisible} />
      {/* <h2>Name</h2> */}
      <p className={styles.name}>岡村 和哉 (Kazuya Okamura)</p>
      <p>東京都市大学大学院 環境情報学研究科 環境情報学専攻 修士1年</p>
      <p className={styles.left}>
        見た人がワクワクするようなコンテンツを作ることを目指して、趣味でWebサイト制作や3Dモデリングをしています。
        <br />
        このサイトでは、私のポートフォリオや、趣味で制作した作品を紹介しています。
      </p>
      <p className={styles.left}>
        このサイトでは、キャラクターを操作して、3D空間を移動することができます。
        <br />
        キャラクターは、WASDまたは矢印キーで操作できます。
        <br />
        地面に「！」が表示されているところに近づくと様々な情報が見られます。
      </p>
      <div className={styles.links}>
        <div className={styles.link}>
          <Link href="https://github.com/Kazuyai" target="_blank" rel="noopener noreferrer">
            <figure>
              {/* <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg" alt="GitHub" /> */}
              <AutoSizeImage src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg" alt="GitHub" />
            </figure>
          </Link>
        </div>
      </div>
      {activeEvent && eventContent[activeEvent]}
    </section>
  );
};

export default About;
