import { useState, useEffect } from "react";

const useActiveSection = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [isInSpace, setIsInSpace] = useState(false);
  const [spacers, setSpacers] = useState<HTMLElement[]>([]);

  useEffect(() => {
    const updateSpacers = () => {
      const spacerElements = Array.from(document.querySelectorAll(".spacer")) as HTMLElement[];
      console.log(spacerElements);
      setSpacers(spacerElements);
    };

    updateSpacers();
    const observer = new MutationObserver(updateSpacers);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll("section")) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        let maxIntersectionRatio = 0;
        let mostVisibleIndex = 0;
        let isSpace = false;

        entries.forEach((entry) => {
          const targetElement = entry.target as HTMLElement;
          const index = sections.includes(targetElement)
            ? sections.indexOf(targetElement)
            : spacers.indexOf(targetElement);

          if (entry.isIntersecting && entry.intersectionRatio > maxIntersectionRatio) {
            maxIntersectionRatio = entry.intersectionRatio;
            mostVisibleIndex = index;
            isSpace = spacers.includes(targetElement);
          }
        });

        setActiveSection(mostVisibleIndex);
        setIsInSpace(isSpace);
      },
      { threshold: 0.5 }
    );

    [...sections, ...spacers].forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [spacers]);

  return { activeSection, isInSpace };
};

export default useActiveSection;
