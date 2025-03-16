import React from "react";
import styles from "@/styles/sections/Projects.module.scss";

interface ProjectsProps {
  activeEvent: string | null;
}

const Projects = ({ activeEvent }: ProjectsProps) => {
  return (
    <section className={styles.projects}>
      <h1>projects</h1>
      <p>These are my projects</p>
    </section>
  );
}

export default Projects;
