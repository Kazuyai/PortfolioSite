import React from "react";
import styles from "@/styles/common/WIP.module.scss";

const WIP = () => {
  return (
    <div className={styles.container}>
      <h2>WIP</h2>
      <p className={styles.description}>
        現在作成中です。<br />
        公開までしばらくお待ちください。
      </p>
    </div>
  );
};

export default WIP;
