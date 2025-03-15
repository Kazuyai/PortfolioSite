import React from "react";
import styles from "@/styles/sections/Skills.module.scss";

interface SkillsProps {
  activeEvent: string | null;
}

export const collisionData: { position: [number, number, number]; size: [number, number, number]; }[] = [
  { position: [-5, -11, 0], size: [1, 2, 8] },
  { position: [5, -11, 0], size: [1, 2, 8] },
];

export const eventData: { id: string; position: [number, number, number]; size: [number, number, number]; }[] = [
  { id: "skills_event_1", position: [0, -11.5, 0], size: [1, 2, 1] },
];

const eventContent: ({ [key: string]: JSX.Element }) = {
  skills_event_1: (
    <div className={styles.eventContent}>
      <h2>Frontend Development</h2>
      <p>React, TypeScript, JavaScript, HTML, CSS, Sass, Next.js, PHP, WordPress</p>
    </div>
  )
};

function Skills({ activeEvent }: SkillsProps) {
  return (
    <section className={styles.skills}>
      <h1>SKills</h1>
      <div className={styles.skillsBox}>
        <div className={styles.skillsBoxItem}>
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" />
          <h2>TypeScript</h2>
        </div>
        <div className={styles.skillsBoxItem}>
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" />
          <h2>JavaScript</h2>
        </div>
        <div className={styles.skillsBoxItem}>
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" />
          <h2>React</h2>
        </div>
      </div>
      {activeEvent && eventContent[activeEvent]}
    </section>
  );
}

export default Skills;
