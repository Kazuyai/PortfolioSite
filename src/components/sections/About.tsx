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
      <p>こんにちは！</p>
    </section>
  );
};

export default About;
