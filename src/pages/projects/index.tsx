import React, { useState } from 'react'
import styles from '@/styles/pages/projects.module.scss'

const Index = () => {
  const [selectedCardId, setSelectedCardId] = useState<number | null>(null)

  return (
    <div className={styles.container}>
      <div className={styles.mainVisual}>
        <img src="./images/Gallery_01.png" alt="" />
        <h2>Projects</h2>
      </div>
      <div className={styles.cards}>
        <div className={styles.card} onClick={() => setSelectedCardId(1)}>
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
        <div className={styles.card} onClick={() => setSelectedCardId(2)}>
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
        <div className={styles.card} onClick={() => setSelectedCardId(3)}>
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
        <div className={styles.card} onClick={() => setSelectedCardId(4)}>
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
      {selectedCardId !== null && (
        <div className={styles.popup} onClick={() => setSelectedCardId(null)}>
          <div className={styles.popupExplain} onClick={(e) => e.stopPropagation()}>
            <div className={styles.popupExplainInner}>
              <h3>タイトルがここに入る</h3>
              <div className={styles.category}>
                <span>Web</span>
              </div>
              <div className={styles.tech}>
                <span>TypeScript</span>
                <span>React</span>
                <span>Next.js</span>
              </div>
              <div className={styles.date}>2025.05.15</div>
              <div className={styles.img}>
                <img src="./images/Gallery_01.png" alt="" />
              </div>
              <p>説明文がここに入る説明文がここに入る説明文がここに入る説明文がここに入る説明文がここに入る</p>
              <div className={styles.link}>
                <a href="#">GitHub</a>
                <a href="#">URL</a>
              </div>
            </div>
          </div>
          <div className={styles.popupClose} onClick={() => setSelectedCardId(null)}>
            <span></span>
            <span></span>
          </div>
        </div>
      )}
    </div>
  )
}

export default Index