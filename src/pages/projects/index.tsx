import React from 'react'
import styles from '@/styles/pages/projects.module.scss'

const index = () => {
  return (
    <div className={styles.container}>
      <div className={styles.mainVisual}>
        <img src="./images/Gallery_01.png" alt="" />
        <h2>Projects</h2>
      </div>
      <p>ここにこれまでのプロジェクトの一覧を表示する</p>
    </div>
  )
}

export default index