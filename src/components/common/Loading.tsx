import React from 'react'
import styles from '@/styles/common/Loading.module.scss'

const Loading = () => {
  return (
    <div className={styles.loading}>
      <img src="orion.svg" alt="" />
      <p>Loading<span>.</span><span>.</span><span>.</span></p>
    </div>
  )
}

export default Loading