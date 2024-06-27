import React, { useEffect, useRef, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { cn } from "./cn";

const BackgroundCellAnimation = () => {
  return (
    <div className="fixed -z-[1] top-0 left-0 w-full h-screen bg-black flex justify-center overflow-hidden">
      <BackgroundCellCore />
    </div>
  );
};

const BackgroundCellCore = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const ref = useRef(null);
  const [clickedCell, setClickedCell] = useState(null);
  const [hoveredCell, setHoveredCell] = useState(null);
  const handleMouseMove = (event) => {
    const rect = ref.current && ref.current.getBoundingClientRect();
    const x_ = event.clientX - rect.left;
    const y_ = event.clientY - rect.top;
    setMousePosition({
      x: x_,
      y: y_,
    });
    const [x, y] = [
      Math.ceil(x_ / (48 + 1.05)) - 1,
      // Math.ceil(mousePosition.x / (firstBlock.clientWidth + 1.05))-1,
      Math.ceil(y_ / (48 + 1.05)) - 1,
      // Math.ceil(mousePosition.y / (firstBlock.clientHeight + 1.05))-1,
    ];
    setHoveredCell([x, y]);
  };
  const handleMouseClick = (event) => {
    // const firstBlock = document.querySelector(".the_block");
    const [x, y] = [
      Math.ceil(mousePosition.x / (48 + 1.05)) - 1,
      // Math.ceil(mousePosition.x / (firstBlock.clientWidth + 1.05))-1,
      Math.ceil(mousePosition.y / (48 + 1.05)) - 1,
      // Math.ceil(mousePosition.y / (firstBlock.clientHeight + 1.05))-1,
    ];
    setClickedCell([x, y]);
  };

  useEffect(() => {
    document.addEventListener("click", handleMouseClick);
    document.addEventListener("mousemove", handleMouseMove);
    return () => {
      document.removeEventListener("click", handleMouseClick);
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mousePosition]);
  const size = 300;
  return (
    <div ref={ref} className="h-full absolute inset-0">
      {mousePosition.y}
      <div className="absolute  inset-y-0  overflow-hidden">
        <div
          className="absolute inset-0 z-20 bg-transparent"
          style={{
            maskImage: `radial-gradient(
            ${size / 4}px circle at center,
           white, transparent
          )`,
            WebkitMaskImage: `radial-gradient(
          ${size / 4}px circle at center,
          white, transparent
        )`,
            WebkitMaskPosition: `${mousePosition.x - size / 2}px ${
              window.isFullscreen
                ? mousePosition.y - size - (size * 6.84) / 16
                : mousePosition.y - size - (size * 4) / 16
            }px`,
            WebkitMaskSize: `${size}px`,
            maskSize: `${size}px`,
            pointerEvents: "none",
            maskRepeat: "no-repeat",
            WebkitMaskRepeat: "no-repeat",
          }}
        >
          <Pattern cellClassName="border-teal-500 relative z-[100]" />
        </div>
        <Pattern
          className="opacity-30 -z-[1]"
          cellClassName="border-neutral-500"
          hoveredCell={hoveredCell}
          clickedCell={clickedCell}
          setClickedCell={setClickedCell}
          setHoveredCell={setHoveredCell}
        />
      </div>
    </div>
  );
};

const Pattern = ({
  className,
  cellClassName,
  clickedCell,
  setClickedCell,
  setHoveredCell,
  hoveredCell,
}) => {
  const x = new Array(
    Math.ceil(document.body.getBoundingClientRect().width / 48)
  ).fill(0);
  const y = new Array(
    Math.ceil(document.body.getBoundingClientRect().height / 48)
  ).fill(0);
  const matrix = x.map((_, i) => y.map((_, j) => [i, j]));

  return (
    <div className={cn("flex flex-row pattern relative z-30", className)}>
      {matrix.map((row, rowIdx) => (
        <div
          key={`matrix-row-${rowIdx}`}
          className="flex flex-col  relative z-20 border-b"
        >
          {row.map((column, colIdx) => (
            <Cell
              key={colIdx}
              {...{
                clickedCell,
                setClickedCell  ,
                hoveredCell,
                setHoveredCell,
                rowIdx,
                colIdx,
                cellClassName,
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
};
export default BackgroundCellAnimation;
window._ = [];
function Cell({
  clickedCell,
  setHoveredCell,
  setClickedCell,
  hoveredCell,
  rowIdx,
  colIdx,
  cellClassName,
}) {
  const controls = useAnimation();
  const [previouslyHovered, setPreviouslyHovered] = useState(false);
  const handleTimeout = () => {
    setClickedCell(null);
  };
  useEffect(() => {
    if (clickedCell) {
      controls.stop();
      const distance = Math.sqrt(
        Math.pow(clickedCell[0] - rowIdx, 2) +
          Math.pow(clickedCell[1] - colIdx, 2)
      );
      controls.start({
        opacity: [0, 1 - distance * 0.1, 0],
        transition: {
          duration: distance * 0.2,
        },
      });
      if (distance == 0) {
        setHoveredCell(null);
        let x = setTimeout(handleTimeout, 300);
        return () => {
          clearTimeout(x);
        };
      }
    }
  }, [clickedCell]);

  return (
    <div
      className={cn(
        hoveredCell &&
          hoveredCell[0] == rowIdx &&
          hoveredCell[1] == colIdx &&
          !(clickedCell && clickedCell[0] == rowIdx && clickedCell[1] == colIdx)
          ? "bg-[rgba(100,211,211,0.86)] !duration-0"
          : "bg-transparent",
        " the_block border-l border-b transition duration-500",
        cellClassName
      )}
    >
      <motion.div
        initial={{
          opacity: 0,
        }}
        transition={{
          duration: 0.5,
          ease: "backOut",
        }}
        animate={controls}
        className="bg-[rgba(100,211,211,0.86)] h-12 w-12" //  rgba(14, 165, 233, 0.15) for a more subtle effect
      ></motion.div>
    </div>
  );
}
