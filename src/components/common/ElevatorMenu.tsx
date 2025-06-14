import React, { useState } from 'react'
import styles from "@/styles/common/ElevatorMenu.module.scss"
import Link from 'next/link';

interface ElevatorMenuProps {
  sections: { id: string; label: string, hasDetailPage: boolean }[];
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
            <Link href={`#${section.id}`}>{sections.length - index}</Link>
          </div>
          <div className={styles.elevatorMenu__text}>
            <p>{section.label}</p>
          </div>
        </div>
      ))}
      {/* <div className={styles.elevatorMenu__item}>
        <div className={styles.elevatorMenu__button}>
          <Link href="#top">5</Link>
        </div>
        <div className={styles.elevatorMenu__text}>
          <p>Top</p>
        </div>
      </div>
      <div className={styles.elevatorMenu__item}>
        <div className={styles.elevatorMenu__button}>
          <Link href="#about">4</Link>
        </div>
        <div className={styles.elevatorMenu__text}>
          <p>About</p>
        </div>
      </div>
      <div className={styles.elevatorMenu__item}>
        <div className={styles.elevatorMenu__button}>
          <Link href="#skills">3</Link>
        </div>
        <div className={styles.elevatorMenu__text}>
          <p>Skills</p>
        </div>
      </div> */}
    </div>
  )
}

export default ElevatorMenu