import React, { useState } from 'react'
import styles from "@/styles/common/ElevatorMenu.module.scss"

interface ElevatorMenuProps {
  sections: { id: string; label: string }[];
}

const ElevatorMenu = ({ sections }: ElevatorMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`${styles.elevatorMenu} ${isOpen ? styles.open : ""}`}>
      <div 
        className={styles.elevatorMenu__open_button}
        onClick={() => setIsOpen(!isOpen)}  
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      {sections.map((section, index) => (
        <div key={index} className={styles.elevatorMenu__item}>
          <div className={styles.elevatorMenu__button}>
            <a href={`#${section.id}`}>{sections.length - index}</a>
          </div>
          <div className={styles.elevatorMenu__text}>
            <p>{section.label}</p>
          </div>
        </div>
      ))}
      {/* <div className={styles.elevatorMenu__item}>
        <div className={styles.elevatorMenu__button}>
          <a href="#top">5</a>
        </div>
        <div className={styles.elevatorMenu__text}>
          <p>Top</p>
        </div>
      </div>
      <div className={styles.elevatorMenu__item}>
        <div className={styles.elevatorMenu__button}>
          <a href="#about">4</a>
        </div>
        <div className={styles.elevatorMenu__text}>
          <p>About</p>
        </div>
      </div>
      <div className={styles.elevatorMenu__item}>
        <div className={styles.elevatorMenu__button}>
          <a href="#skills">3</a>
        </div>
        <div className={styles.elevatorMenu__text}>
          <p>Skills</p>
        </div>
      </div> */}
    </div>
  )
}

export default ElevatorMenu