import React, { useEffect } from 'react'
import styles from '@/styles/common/Loading.module.scss'

interface LoadingProps {
  progress: number;
  startFadeOut: boolean;
}

const Loading = (
  { progress, startFadeOut }: LoadingProps
) => {

  const totalSteps = 13; // 7つの星 + 6本の線
  const stepSize = 100 / totalSteps;
  let stepsComplete = Math.floor(progress / stepSize);
  if (stepsComplete > totalSteps - 1) stepsComplete = totalSteps - 1;

  // step i は [ i*stepSize% , (i+1)*stepSize% ) の区間
  // この区間内で 0→1 へ補間する fraction を得る
  const getFraction = (i: number) => {
    const startP = i * stepSize;
    const endP = (i + 1) * stepSize; // 次ステップ開始
    // 現在 progress は startP～endP のどこ？
    const raw = (progress - startP) / (endP - startP);
    // 0～1にクランプ
    return Math.max(0, Math.min(raw, 1));
  }

  //
  // 2) 星の表示 (7つ)
  //    星 i はステップ (i-1) で表示開始（0-index考慮）
  //    例: star1 => step0, star2 => step1, ... star7 => step6
  //
  //    stepsComplete >= (i-1) なら その星は完全に見える
  //    stepsComplete < (i-1) なら まだ
  //
  const getStarOpacity = (i: number) => {
    const starStep = i - 1; // star1 => step0, star2 => step1...
    return stepsComplete >= starStep ? 1 : 0;
  }

  //
  // 3) 線の描画 (6本)
  //    線 i はステップ (7 + i -1) でアニメーション開始
  //      例: line1 => step7, line2 => step8, ...
  //    ここでは「線が部分的に伸びる」ように strokeDashoffset を補間
  //
  //    - strokeDasharray は lineごとに異なる (160,100,160,140,160,120)
  //    - stepX = 7 + (i-1)
  //      fraction = getFraction(stepX)  (0→1)
  //      strokeDashoffset = length * (1 - fraction)
  //      ただし stepsComplete < stepX なら まだ描画開始前
  //      stepsComplete > stepX なら 既に完全表示
  //
  const lineLengths = [160, 100, 160, 140, 160, 120]; // 線1～6

  const getLineOffset = (i: number) => {
    const lineStep = 7 + (i - 1); // line1 => step7, line2 => step8...
    const length = lineLengths[i - 1];
    if (stepsComplete < lineStep) {
      // アニメ前 (星がまだ終わっていない)
      return length; // 全未描画
    } else if (stepsComplete > lineStep) {
      // アニメ完了後
      return 0; // 全描画
    } else {
      // ちょうど lineStep の途中 (0~1に補間)
      const fraction = getFraction(lineStep); // 0→1
      return length * (1 - fraction);
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className={`${styles.loading} ${startFadeOut ? styles.fadeOut : ""}`}>
      {/* <img src="orion.svg" alt="" /> */}
      <svg width="300" height="300" viewBox="0 0 300 300">
        {/* ▼ 7つ星 (順番に表示) */}
        {/* star1 => step0 */}
        <circle cx="50" cy="30" fill="white" className={styles.star} opacity={getStarOpacity(1)} />
        {/* star2 => step1 */}
        <circle cx="200" cy="10" fill="white" className={styles.star} opacity={getStarOpacity(2)} />
        {/* star3 => step2 */}
        <circle cx="110" cy="110" fill="white" className={styles.star} opacity={getStarOpacity(3)} />
        {/* star4 => step3 */}
        <circle cx="170" cy="90" fill="white" className={styles.star} opacity={getStarOpacity(4)} />
        {/* star5 => step4 */}
        <circle cx="140" cy="100" fill="white" className={styles.star} opacity={getStarOpacity(5)} />
        {/* star6 => step5 */}
        <circle cx="80" cy="250" fill="white" className={styles.star} opacity={getStarOpacity(6)} />
        {/* star7 => step6 */}
        <circle cx="220" cy="230" fill="white" className={styles.star} opacity={getStarOpacity(7)} />

        {/* ▼ 線 (line) 6本、順番に描画アニメ */}
        {/* line1 => step7 */}
        <line
          x1="50" y1="30" x2="200" y2="10"
          stroke="white" strokeWidth="2"
          strokeDasharray={160}
          strokeDashoffset={getLineOffset(1)}
        />
        {/* line2 => step8 */}
        <line
          x1="200" y1="10" x2="170" y2="90"
          stroke="white" strokeWidth="2"
          strokeDasharray={100}
          strokeDashoffset={getLineOffset(2)}
        />
        {/* line3 => step9 */}
        <line
          x1="170" y1="90" x2="220" y2="230"
          stroke="white" strokeWidth="2"
          strokeDasharray={160}
          strokeDashoffset={getLineOffset(3)}
        />
        {/* line4 => step10 */}
        <line
          x1="220" y1="230" x2="80" y2="250"
          stroke="white" strokeWidth="2"
          strokeDasharray={140}
          strokeDashoffset={getLineOffset(4)}
        />
        {/* line5 => step11 */}
        <line
          x1="80" y1="250" x2="110" y2="110"
          stroke="white" strokeWidth="2"
          strokeDasharray={160}
          strokeDashoffset={getLineOffset(5)}
        />
        {/* line6 => step12 */}
        <line
          x1="110" y1="110" x2="50" y2="30"
          stroke="white" strokeWidth="2"
          strokeDasharray={120}
          strokeDashoffset={getLineOffset(6)}
        />
      </svg>
      <p>Loading<span>.</span><span>.</span><span>.</span></p>
      <p>{Math.floor(progress)}%</p>
    </div>
  )
}

export default Loading