import React, { useEffect, useRef, useState } from "react";

interface useElementVisibilityProps {
  threshold?: number;
}

/*
 * 要素が画面に表示されたかを検知するカスタムフック
 * @param threshold どの程度表示されたら可視とするか（デフォルト値：0.1）
 * @returns ref（対象の要素）、isVisible（可視状態）
 */
const useElementVisibility = ( props?: useElementVisibilityProps) => {
  const threshold = props?.threshold || 0.1;
  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: threshold }
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
}

export default useElementVisibility;
