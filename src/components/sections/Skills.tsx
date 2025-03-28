import React from "react";
import styles from "@/styles/sections/Skills.module.scss";
import FadeinTitle from "../common/FadeinTitle";
import useElementVisibility from "@/hooks/useElementVisibility";

interface SkillsProps {
  activeEvent: string | null;
}

export const collisionData: {
  position: [number, number, number];
  size: [number, number, number];
}[] = [
  { position: [-5, -14, 0], size: [1, 2, 8] },
  { position: [5, -14, 0], size: [1, 2, 8] },
];

export const eventData: {
  id: string;
  position: [number, number, number];
  size: [number, number, number];
}[] = [{ id: "skills_event_1", position: [0, -14, 0], size: [1, 2, 1] }];

const eventContent: { [key: string]: JSX.Element } = {
  skills_event_1: (
    <div className={styles.eventContent}>
      <h2>Frontend Development</h2>
      <p>React, TypeScript, JavaScript, HTML, CSS, Sass, Next.js, PHP, WordPress</p>
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
    <section ref={ref} className={`${styles.skills} ${isVisible ? styles.visible : ""}`}>
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
        {/* <div className={styles.skillsBoxItem}>
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
        <div className={styles.skillsBoxItem}>
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg" />
          <h2>Next.js</h2>
        </div>
        <div className={styles.skillsBoxItem}>
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/threejs/threejs-original.svg" />
          <h2>Three.js</h2>
        </div>
        <div className={styles.skillsBoxItem}>
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg" />
          <h2>HTML</h2>
        </div>
        <div className={styles.skillsBoxItem}>
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/sass/sass-original.svg" />
          <h2>Sass</h2>
        </div>
        <div className={styles.skillsBoxItem}>
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg" />
          <h2>CSS</h2>
        </div>
        <div className={styles.skillsBoxItem}>
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg" />
          <h2>PHP</h2>
        </div>
        <div className={styles.skillsBoxItem}>
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" />
          <h2>Python</h2>
        </div>
        <div className={styles.skillsBoxItem}>
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/c/c-original.svg" />
          <h2>C</h2>
        </div>
        <div className={styles.skillsBoxItem}>
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg" />
          <h2>C++</h2>
        </div>
        <div className={styles.skillsBoxItem}>
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg" />
          <h2>Java</h2>
        </div> */}
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
        {/* <div className={styles.skillsBoxItem}>
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg" />
          <h2>Git</h2>
        </div>
        <div className={styles.skillsBoxItem}>
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg" />
          <h2>GitHub</h2>
        </div>
        <div className={styles.skillsBoxItem}>
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/blender/blender-original.svg" />
          <h2>Blender</h2>
        </div>
        <div className={styles.skillsBoxItem}>
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/unity/unity-original.svg" />
          <h2>Unity</h2>
        </div>
        <div className={styles.skillsBoxItem}>
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/wordpress/wordpress-plain.svg" />
          <h2>WordPress</h2>
        </div>
        <div className={styles.skillsBoxItem}>
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg" />
          <h2>Vercel</h2>
        </div>
        <div className={styles.skillsBoxItem}>
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-plain.svg" />
          <h2>Firebase</h2>
        </div> */}
      </div>
      {activeEvent && eventContent[activeEvent]}
    </section>
  );
};

export default Skills;
