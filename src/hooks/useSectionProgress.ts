import { useLayoutEffect, useState } from "react";

/**
 * spacerRefs: 各spacer(div要素)への参照
 * 戻り値: {
 *   currentIndex: number; // 現在いるセクション(またはspacer)のインデックス
 *   progress: number;     // セクション間のスクロール進捗 [0, 1]
 * }
 */

export function useSectionProgress(spacerRefs: HTMLDivElement[]) {
  const [{ index, progress }, setState] = useState({ index: 0, progress: 0 });

  useLayoutEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;

      const positions = spacerRefs.map((el) => {
        const { top, height } = el.getBoundingClientRect();
        const start = top + scrollY;
        return { start, end: start + height };
      });

      let curr = 0;
      let prog = 0;
      for (let i = 0; i < positions.length; i++) {
        const { start, end } = positions[i];
        if (scrollY < positions[0].start) break;
        if (scrollY > positions[positions.length - 1].end) {
          curr = positions.length;
          break;
        }
        const prev = positions[i - 1];
        if (scrollY < end && prev && scrollY > prev.end) curr = i;
        if (scrollY >= start && scrollY <= end) {
          prog = (scrollY - start) / (end - start);
          break;
        }
      }

      setState({ index: curr, progress: prog });
    };

    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [spacerRefs]);

  return { currentIndex: index, progress };
}
