import React from "react";
import styles from "@/styles/sections/About.module.scss";
import FadeinTitle from "../common/FadeinTitle";
import useElementVisibility from "@/hooks/useElementVisibility";

interface AboutProps {
  activeEvent: string | null;
}

const About = ({ activeEvent }: AboutProps) => {
  const { ref, isVisible } = useElementVisibility({ threshold: 0.1 });
  return (
    <section ref={ref} className={`${styles.about} ${isVisible ? styles.visible : ""}`}>
      <FadeinTitle title="About" isVisible={isVisible} />
      {/* <h2>Name</h2> */}
      <p className={styles.name}>岡村 和哉 (Kazuya Okamura)</p>
      <p>東京都市大学大学院 環境情報学研究科 環境情報学専攻 修士1年</p>
      <p>趣味でWeb技術を活かしたコンテンツ制作に励んでいます。</p>
      <div className={styles.links}>
        <div className={styles.link}>
          <a href="https://github.com/Kazuyai" target="_blank" rel="noopener noreferrer">
            <figure>
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg" alt="GitHub" />
            </figure>
          </a>
        </div>
      </div>
    </section>
  );
};

export default About;
