import React from 'react'
import styles from '@/styles/pages/projects.module.scss'

const index = () => {
  return (
    <div className={styles.container}>
      <div className={styles.mainVisual}>
        <img src="./images/Gallery_01.png" alt="" />
        <h2>Projects</h2>
      </div>
      <div className={styles.cards}>
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <img src="./images/Gallery_01.png" alt="" />
          </div>
          <div className={styles.cardContent}>
            <h3>タイトル</h3>
            <p>説明文</p>
            <div className={styles.tech}>
              <span>TypeScript</span>
              <span>React</span>
              <span>Next.js</span>
            </div>
          </div>
          <div className={styles.cardFooter}>
            <div className={styles.category}>Web</div>
            <div className={styles.date}>2025.05.15</div>
          </div>
        </div>
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <img src="./images/Gallery_01.png" alt="" />
          </div>
          <div className={styles.cardContent}>
            <h3>タイトル</h3>
            <p>説明文</p>
            <div className={styles.tech}>
              <span>TypeScript</span>
              <span>React</span>
              <span>Next.js</span>
            </div>
          </div>
          <div className={styles.cardFooter}>
            <div className={styles.category}>Web</div>
            <div className={styles.date}>2025.05.15</div>
          </div>
        </div>
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <img src="./images/Gallery_01.png" alt="" />
          </div>
          <div className={styles.cardContent}>
            <h3>タイトル</h3>
            <p>説明文</p>
            <div className={styles.tech}>
              <span>TypeScript</span>
              <span>React</span>
              <span>Next.js</span>
            </div>
          </div>
          <div className={styles.cardFooter}>
            <div className={styles.category}>Web</div>
            <div className={styles.date}>2025.05.15</div>
          </div>
        </div>
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <img src="./images/Gallery_01.png" alt="" />
          </div>
          <div className={styles.cardContent}>
            <h3>タイトル</h3>
            <p>説明文</p>
            <div className={styles.tech}>
              <span>TypeScript</span>
              <span>React</span>
              <span>Next.js</span>
            </div>
          </div>
          <div className={styles.cardFooter}>
            <div className={styles.category}>Web</div>
            <div className={styles.date}>2025.05.15</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default index