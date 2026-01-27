
import React, { useEffect, useRef, useState } from "react";

interface VerticalLineProps {
  /** id of the container in which the line should span vertically */
  containerId: string;
  /** id of the starting reference button to offset from its bottom */
  startBtnId: string;
  /** id of the ending reference button to offset just above its top */
  endBtnId: string;
  /** Optional: hide on mobile (default: true) */
  hideOnMobile?: boolean;
  /** Line height -- will be computed unless forced */
  height?: number;
  /** 
   * Color of line
   * default: "#fff"
   */
  color?: string;
  /** 
   * Width of line in px, default: 3px
   */
  width?: number;
}

const VerticalLine: React.FC<VerticalLineProps> = ({
  containerId,
  startBtnId,
  endBtnId,
  color = "#fff",
  width = 3,
  hideOnMobile = true,
}) => {
  const [positions, setPositions] = useState<{top: number; height: number}>({top: 0, height: 0});
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateLine = () => {
      const container = document.getElementById(containerId);
      const startBtn = document.getElementById(startBtnId);
      const endBtn = document.getElementById(endBtnId);

      if (container && startBtn && endBtn) {
        // Container position
        const containerRect = container.getBoundingClientRect();
        // Start from just below the startBtn
        const startRect = startBtn.getBoundingClientRect();
        // End just above the endBtn
        const endRect = endBtn.getBoundingClientRect();

        // Offset from container top:
        const top =
          startRect.bottom - containerRect.top +
          16; // extra gap, can adjust as needed

        const bottom =
          containerRect.bottom - endRect.top +
          16; // extra gap above endBtn

        // Height: container height - top offset - bottom offset
        const height =
          containerRect.height - top - bottom;

        setPositions({ top, height: Math.max(0, height) });
      }
    };

    updateLine();
    window.addEventListener("resize", updateLine);
    window.addEventListener("scroll", updateLine, true);
    return () => {
      window.removeEventListener("resize", updateLine);
      window.removeEventListener("scroll", updateLine, true);
    };
  }, [containerId, startBtnId, endBtnId]);

  return (
    <div
      ref={ref}
      aria-hidden
      className={`pointer-events-none absolute left-1/2 -translate-x-1/2 z-[15] ${hideOnMobile ? "hidden md:block" : ""}`}
      style={{
        top: positions.top,
        height: positions.height,
        width: 0,
        borderLeft: `${width}px solid ${color}`,
        transition: 'top 0.25s, height 0.25s',
        boxShadow: "0 4px 15px rgba(0, 0, 0, 0.6)",
      }}
    />
  );
};

export default VerticalLine;
