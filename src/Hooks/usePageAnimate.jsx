import { useState, useEffect } from "react";

export function usePageAnimation(targetPage, currentPage, delay = 100) {
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    if (currentPage === targetPage) {
      setShouldAnimate(false);
      const timer = setTimeout(() => {
        setShouldAnimate(true);
      }, delay);
      return () => clearTimeout(timer);
    } else {
      setShouldAnimate(false);
    }
  }, [currentPage, targetPage, delay]);

  return shouldAnimate;
}