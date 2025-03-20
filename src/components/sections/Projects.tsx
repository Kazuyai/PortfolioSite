import React from "react";
import styles from "@/styles/sections/Projects.module.scss";
import FadeinTitle from "../common/FadeinTitle";
import useElementVisibility from "@/hooks/useElementVisibility";

interface ProjectsProps {
  activeEvent: string | null;
}

const Projects = ({ activeEvent }: ProjectsProps) => {
  const { ref, isVisible } = useElementVisibility({ threshold: 0.1 });

  return (
    <section ref={ref} className={`${styles.projects} ${isVisible ? styles.visible : ""}`}>
      <FadeinTitle title="Projects" isVisible={isVisible} />
      <p>These are my projects</p>
    </section>
  );
}

export default Projects;
