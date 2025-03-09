import React from "react";
import styles from "@/styles/sections/Skills.module.scss";

export const collisionData: { position: [number, number, number]; size: [number, number, number]; }[] = [
  { position: [-5, -11, 0], size: [1, 2, 8] },
  { position: [5, -11, 0], size: [1, 2, 8] },
];

export const eventData: { id: string; position: [number, number, number]; size: [number, number, number]; }[] = [
  { id: "skills_event_1", position: [-3, -11.5, -3], size: [1, 2, 1] },
];

function Skills() {
  return (
    <section className={styles.skills}>
      <h1>SKills</h1>
      <p>These are my skills</p>
    </section>
  );
}

export default Skills;
