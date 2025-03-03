import { useState, useEffect, useMemo } from "react";

/**
 * spacerRefs: 各spacer(div要素)への参照
 * 戻り値: {
 *   currentIndex: number; // 現在いるセクション(またはspacer)のインデックス
 *   progress: number;     // セクション間のスクロール進捗 [0, 1]
 * }
 */
export function useSectionProgress(
  spacerRefs: React.MutableRefObject<HTMLDivElement[]>
) {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const spacerPositions = useMemo(() => {
    return spacerRefs.current.map((spacerEl) => {
      const rect = spacerEl.getBoundingClientRect();
      const startY = rect.top + window.scrollY;
      const endY = startY + rect.height;
      return { startY, endY };
    });
  }, [spacerRefs]);

  let currentIndex = 0;
  let progress = 0;

  for (let i = 0; i < spacerPositions.length; i++) {
    const { startY, endY } = spacerPositions[i];
    const beforeSpacer = i === 0 ? null : spacerPositions[i - 1];
    if(scrollY < spacerPositions[0].startY) {
      currentIndex = 0;
      break;
    } else if(scrollY > spacerPositions[spacerPositions.length - 1].endY) {
      currentIndex = spacerPositions.length;
      break;
    } else if(scrollY < endY && beforeSpacer && scrollY > beforeSpacer.endY) {
      currentIndex = i;
    } 

    if (scrollY >= startY && scrollY <= endY) {
      const total = endY - startY;
      const distance = scrollY - startY;
      progress = distance / total;
      break;
    }
  }

  return { currentIndex, progress };
}
