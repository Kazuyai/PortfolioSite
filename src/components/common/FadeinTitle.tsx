import React from "react";
import styles from "@/styles/common/FadeinTitle.module.scss";

interface FadeinTitleProps {
  title: string;
  isVisible?: boolean;
}

const FadeinTitle = ({ title, isVisible }: FadeinTitleProps) => {
  return (
    <h1 className={`${styles.fadeinTitle} ${isVisible ? styles.visible : ""}`}>
      {title.split("").map((char, index) => {
        return (
          <span key={index} style={{ animationDelay: `${index * 0.05 + 0.6}s` }}>
            {char === " " ? "\u00A0" : char}
          </span>
        );
      })}
    </h1>
  );
}

export default FadeinTitle;
