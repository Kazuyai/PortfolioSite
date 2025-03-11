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
      <p>React, TypeScript, Next.js</p>
    </div>
  )
};

function Skills({ activeEvent }: SkillsProps) {
  return (
    <section className={styles.skills}>
      <h1>SKills</h1>
      <p>These are my skills</p>
      {activeEvent && eventContent[activeEvent]}
    </section>
  );
}

export default Skills;
