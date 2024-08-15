"use client";
import { RefObject, useEffect, useState } from "react";

export function useScroll({
  elementRef,
}: {
  elementRef?: React.RefObject<HTMLDivElement>;
}) {
  const [scrollPos, setScrollPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!elementRef?.current) return;

    const handleScroll = () => {
      setScrollPos({
        x: elementRef.current?.scrollLeft ?? 0,
        y: elementRef.current?.scrollTop ?? 0,
      });
    };

    elementRef.current.addEventListener("scroll", handleScroll);

    return () => {
      elementRef.current?.removeEventListener("scroll", handleScroll);
    };
  }, [elementRef]);

  const x = (distance: number) => {
    const currPos = elementRef?.current?.scrollLeft ?? 0;
    elementRef?.current?.scrollTo({
      left: currPos + distance,
      behavior: "smooth",
    });
    setScrollPos((prev) => ({ ...prev, x: currPos + distance }));
  };

  const y = (distance: number) => {
    const currPos = elementRef?.current?.scrollTop ?? 0;
    elementRef?.current?.scrollTo({
      top: currPos + distance,
      behavior: "smooth",
    });
    setScrollPos((prev) => ({ ...prev, y: currPos + distance }));
  };

  const canX = (distance: number) => {
    if (!elementRef?.current) return false;
    if (distance < 0) return elementRef?.current.scrollLeft > 0;
    const originalSize = elementRef?.current.getBoundingClientRect().width;
    const newPosition =
      elementRef?.current.scrollLeft + originalSize + distance;
    const totalWidth = elementRef?.current.scrollWidth;
    return totalWidth >= newPosition;
  };

  const canY = (distance: number) => {
    if (!elementRef?.current) return false;
    if (distance < 0) return elementRef?.current.scrollTop > 0;
    const originalSize = elementRef?.current.getBoundingClientRect().height;
    const pixelsScrolled =
      elementRef?.current.scrollTop + originalSize + distance;
    const totalHeight = elementRef?.current.scrollHeight;
    return totalHeight >= pixelsScrolled;
  };

  return { x, y, canX, canY, scrollPos };
}
