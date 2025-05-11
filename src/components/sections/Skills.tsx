import React from "react";
import styles from "@/styles/sections/Skills.module.scss";
import FadeinTitle from "../common/FadeinTitle";
import useElementVisibility from "@/hooks/useElementVisibility";
import Link from "next/link";

interface SkillsProps {
  activeEvent: string | null;
}

export const collisionData: {
  position: [number, number, number];
  size: [number, number, number];
}[] = [
  { position: [-3, -26, -3], size: [3, 2, 3] },
  { position: [-4, -26, 3], size: [1, 2, 12] },
  { position: [3, -26, -3.5], size: [12, 2, 1] },
  { position: [7, -26, 0], size: [1, 2, 14] },
  { position: [1, -26, 7], size: [12, 2, 1] }, 
];

export const eventData: {
  id: string;
  position: [number, number, number];
  size: [number, number, number];
}[] = [
  { id: "Event_Skills_01", position: [5, -26, -1.5], size: [2, 2, 1] },
  { id: "Event_Skills_02", position: [-2, -26, 4.8], size: [1, 2, 2] },
  { id: "Event_Skills_03", position: [-2, -26, 2.6], size: [1, 2, 2] },
  { id: "Event_Skills_04", position: [-2, -26, 0.4], size: [1, 2, 2] },
];

const eventContent: { [key: string]: JSX.Element } = {
  Event_Skills_01: (
    <div className={styles.eventContent}>
      <h2>Blenderを使った作品</h2>
      <img src="/images/Gallery_01.png" alt="" />
      <p>
        Blenderを使った作品
      </p>
      <div className={styles.button}>
        <Link href="">
          <span>詳細</span>
        </Link>
      </div>
    </div>
  ),
  Event_Skills_02: (
    <div className={styles.eventContent}>
      <h2>TypeScriptを使った作品</h2>
      <p>
        TypeScriptを使った作品
      </p>
      <div className={styles.button}>
        <Link href="">
          <span>詳細</span>
        </Link>
      </div>
    </div>
  ),
  Event_Skills_03: (
    <div className={styles.eventContent}>
      <h2>Reactを使った作品</h2>
      <p>
        Reactを使った作品
      </p>
      <div className={styles.button}>
        <Link href="">
          <span>詳細</span>
        </Link>
      </div>
    </div>
  ),
  Event_Skills_04: (
    <div className={styles.eventContent}>
      <h2>Pythonを使った作品</h2>
      <p>
        Pythonを使った作品
      </p>
      <div className={styles.button}>
        <Link href="">
          <span>詳細</span>
        </Link>
      </div>
    </div>
  ),
};

const skills = [
  { name: "TypeScript", icon: "typescript/typescript-original.svg" },
  { name: "JavaScript", icon: "javascript/javascript-original.svg" },
  { name: "React", icon: "react/react-original.svg" },
  { name: "Next.js", icon: "nextjs/nextjs-original.svg" },
  { name: "Three.js", icon: "threejs/threejs-original.svg" },
  { name: "HTML", icon: "html5/html5-original.svg" },
  { name: "Sass", icon: "sass/sass-original.svg" },
  { name: "CSS", icon: "css3/css3-original.svg" },
  { name: "PHP", icon: "php/php-original.svg" },
  { name: "Python", icon: "python/python-original.svg" },
  { name: "C", icon: "c/c-original.svg" },
  { name: "C++", icon: "cplusplus/cplusplus-original.svg" },
  { name: "Java", icon: "java/java-original.svg" },
];

const tools = [
  { name: "Git", icon: "git/git-original.svg" },
  { name: "GitHub", icon: "github/github-original.svg" },
  { name: "Blender", icon: "blender/blender-original.svg" },
  { name: "Unity", icon: "unity/unity-original.svg" },
  { name: "WordPress", icon: "wordpress/wordpress-plain.svg" },
  { name: "Vercel", icon: "figma/figma-original.svg" },
  { name: "Firebase", icon: "firebase/firebase-plain.svg" },
];

const Skills = ({ activeEvent }: SkillsProps) => {
  const { ref, isVisible } = useElementVisibility({ threshold: 0.1 });

  return (
    <section ref={ref} id="skills" className={`${styles.skills} ${isVisible ? styles.visible : ""}`}>
      <FadeinTitle title="Skills" isVisible={isVisible} />
      <h3 className={styles.skillsSubTitle}>Programming Languages & Frameworks</h3>
      <div className={styles.skillsBox}>
        {
          skills.map((skill, index) => (
            <div key={index} className={styles.skillsBoxItem} style={{ animationDelay: `${index * 0.1}s` }}>
              <img src={`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${skill.icon}`} />
              <h2>{skill.name}</h2>
            </div>
          ))
        }
      </div>

      <h3 className={styles.skillsSubTitle}>Tools</h3>
      <div className={styles.skillsBox} >
        {
          tools.map((tool, index) => (
            <div key={index} className={styles.skillsBoxItem} style={{ animationDelay: `${skills.length * 0.1 + index * 0.1}s` }}>
              <img src={`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${tool.icon}`} />
              <h2>{tool.name}</h2>
            </div>
          ))
        }
      </div>
      {activeEvent && eventContent[activeEvent]}
    </section>
  );
};

export default Skills;
