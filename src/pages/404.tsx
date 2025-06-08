import React from 'react'
import styles from "@/styles/pages/404.module.scss";
import Image from 'next/image';

const Custom404 = () => {
  return (
    <>
    <div className={styles.container}>
      <div className={styles.mainVisual}>
        <div className={styles.description}>
          <h2>404 Not Found</h2>
          <p>
            お探しのページは見つかりませんでした。<br />
            URLが正しいか、ページが削除されていないかご確認ください。
          </p>
        </div>
        <Image
          src="/images/404.png"
          alt="404 Not Found"
          fill
        />
      </div>
    </div>
    </>
  )
}

export default Custom404