import { useCallback, useEffect, useState } from "react";

export const useMouseHooks = () => {
  const [activeSegment, setActiveSegment] = useState<{
    xStart: number;
    xEnd: number;
    yStart: number;
    yEnd: number;
    segment: number;
  } | null>(null);
  const [mousePosition, setMousePosition] = useState<{
    x: number;
    y: number;
  }>({ x: 0, y: 0 });
  const [windowDimensions, setWindowDimensions] = useState<{
    height: number | undefined;
    width: number | undefined;
  }>({ height: undefined, width: undefined });
  const [ranges, setRanges] = useState<any[]>([]);

  const getRanges = useCallback(() => {
    let RANGES = [] as {
      xStart: number;
      xEnd: number;
      yStart: number;
      yEnd: number;
      segment: number;
    }[];

    const horS = windowDimensions.width! / 4;
    const verS = windowDimensions.height! / 3;

    for (let j = 0; j < 3; j++) {
      for (let i = 0; i < 4; i++) {
        RANGES.push({
          xStart: i * horS,
          xEnd: (i + 1) * horS,
          yStart: j * verS,
          yEnd: (j + 1) * verS,
          segment: j * 4 + (i + 1),
        });
      }
    }

    return RANGES;
  }, [windowDimensions]);

  const trackMousePosition = (e: globalThis.MouseEvent) => {
    setMousePosition(() => ({ x: e.clientX, y: e.clientY }));
  };

  useEffect(() => {
    setWindowDimensions(() => ({
      height: window.innerHeight,
      width: window.innerWidth,
    }));
  }, []);

  useEffect(() => {
    setRanges(() => getRanges());
  }, [windowDimensions]);

  useEffect(() => {
    setActiveSegment(() =>
      ranges.find(
        (range) =>
          mousePosition.x >= range.xStart &&
          mousePosition.x < range.xEnd &&
          mousePosition.y >= range.yStart &&
          mousePosition.y < range.yEnd
      )
    );
  }, [mousePosition, ranges]);

  useEffect(() => {
    window.addEventListener("mousemove", trackMousePosition);
    return () => {
      window.removeEventListener("mousemove", trackMousePosition);
    };
  });

  return { activeSegment, mousePosition, ranges, windowDimensions };
};
