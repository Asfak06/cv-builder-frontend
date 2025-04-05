import { useEffect, useRef, useState } from 'react';

export function useHeightChecker(standardHeight: number = 1123) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [pageBreaks, setPageBreaks] = useState<number[]>([]);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const checkHeight = () => {
      if (!containerRef.current) return;

      const containerHeight = containerRef.current.offsetHeight;
      const isExceeding = containerHeight > standardHeight;

      // Calculate how many page breaks we need
      if (isExceeding) {
        const numberOfPages = Math.ceil(containerHeight / standardHeight);
        const breaks = [];

        // Create an array of page break positions
        for (let i = 1; i < numberOfPages; i++) {
          breaks.push(i * standardHeight);
        }

        console.log(
          `CV spans ${numberOfPages} pages (${containerHeight}px / ${standardHeight}px per page)`
        );

        setTotalPages(numberOfPages);
        setPageBreaks(breaks);
        setIsOverflowing(true);
      } else {
        setTotalPages(1);
        setPageBreaks([]);
        setIsOverflowing(false);
      }
    };

    // Check after initial render and whenever window is resized
    checkHeight();
    window.addEventListener('resize', checkHeight);

    // Recheck after images might have loaded
    const timer = setTimeout(checkHeight, 1000);

    return () => {
      window.removeEventListener('resize', checkHeight);
      clearTimeout(timer);
    };
  }, [standardHeight]);

  return {
    containerRef,
    isOverflowing,
    pageBreaks,
    totalPages,
    containerHeight: containerRef.current?.offsetHeight || 0,
  };
}
