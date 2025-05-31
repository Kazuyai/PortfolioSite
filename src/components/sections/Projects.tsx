import React from "react";
import styles from "@/styles/sections/Projects.module.scss";
import FadeinTitle from "../common/FadeinTitle";
import useElementVisibility from "@/hooks/useElementVisibility";
import Link from "next/link";

interface ProjectsProps {
  activeEvent: string | null;
}

export const collisionData: {
  position: [number, number, number];
  size: [number, number, number];
}[] = [
  { position: [-3, -38, -3], size: [3, 2, 3] },
  { position: [-5, -38, -0.5], size: [3, 2, 4] },
  { position: [-4, -38, 5], size: [2, 2, 3] },
  { position: [3, -38, -3.5], size: [8, 2, 1] },
  { position: [7, -38, 0], size: [1, 2, 14] },
  { position: [1, -38, 7], size: [12, 2, 1] }, 
  { position: [-7, -38, 2], size: [1, 2, 3] },
  { position: [-6, -38, 0], size: [3, 2, 1] },
  { position: [-6, -38, 4], size: [3, 2, 1] },
];

export const eventData: {
  id: string;
  position: [number, number, number];
  size: [number, number, number];
}[] = [
  { id: "Event_Projects_01", position: [0, -38, -1.5], size: [2, 2, 1] },
  { id: "Event_Projects_02", position: [4, -38, -1.5], size: [2, 2, 1] },
  { id: "Event_Projects_03", position: [-2, -38, 4.3], size: [1, 2, 2] },
  { id: "SECRET", position: [-5.5, -38, 2], size: [1, 2, 1] },
];

const eventContent: { [key: string]: JSX.Element } = {
  Event_Projects_01: (
    <div className={styles.eventContent}>
      <h2>ハノイの塔</h2>
      <img src="/images/projects/hanoi.png" alt="" />
      <p>
        大谷研究室の夏合宿恒例の「ハノイの塔」を遊べる作品です。
      </p>
      <div className={styles.button}>
        <Link href="/projects" scroll={false}>
          <span>詳細</span>
        </Link>
      </div>
    </div>
  ),
  Event_Projects_02: (
    <div className={styles.eventContent}>
      <h2>PicPick</h2>
      <img src="/images/projects/picpick.png" alt="" />
      <p>
        2024年の大谷研究室の夏合宿ハッカソンでチームで作成した作品です。
        <br />
        気に入った写真を選んでいくだけで、旅行の計画を立てられるWebサービスです。
      </p>
      <div className={styles.button}>
        <Link href="/projects" scroll={false}>
          <span>詳細</span>
        </Link>
      </div>
    </div>
  ),
  Event_Projects_03: (
    <div className={styles.eventContent}>
      <h2>ポートフォリオサイト</h2>
      <img src="/images/projects/thumbnail.png" alt="" />
      <p>
        自分のポートフォリオサイトです。
      </p>
      <div className={styles.button}>
        <Link href="/projects" scroll={false}>
          <span>詳細</span>
        </Link>
      </div>
    </div>
  )
};

const projects = [
  { name: "ポートフォリオサイト", img: "/images/projects/thumbnail.png", description: "私のポートフォリオサイトです。" },
  { name: "PicPick", img: "/images/projects/picpick.png", description: "気に入った写真を選んでいくだけで、旅行の計画を立てられるWebサービスです。" },
  { name: "ハノイの塔", img: "/images/projects/hanoi.png", description: "大谷研究室の夏合宿恒例の「ハノイの塔」を遊べる作品です。" },
  { name: "歌詞ワードクラウド", img: "/images/projects/lyrics_wordcloud.png", description: "特定のアーティストの歌詞をもとに、どんな単語がよく使われているかを可視化するプログラムです。" },
];

const Projects = ({ activeEvent }: ProjectsProps) => {
  const { ref, isVisible } = useElementVisibility({ threshold: 0.1 });

  return (
    <section ref={ref} id="projects" className={`${styles.projects} ${isVisible ? styles.visible : ""}`}>
      <FadeinTitle title="Projects" isVisible={isVisible} />
      <div className={styles.projectsBox}>
        {
          projects.map((project, index) => (
            <div key={index} className={styles.projectsBoxItem} style={{ animationDelay: `${1 + index * 0.2}s` }}>
              <div className={styles.projectsBoxItemImage}>
                <img src={project.img} alt={project.name} />
              </div>
              <div className={styles.projectsBoxItemText}>
                <h3>{project.name}</h3>
                <p>{project.description}</p>
              </div>
            </div>
          ))
        }
      </div>
      <div className={styles.pageLink}>
        <Link href="/projects" scroll={false}>
          VIEW MORE
        </Link>
      </div>

      {activeEvent && eventContent[activeEvent]}
    </section>
  );
}

export default Projects;
