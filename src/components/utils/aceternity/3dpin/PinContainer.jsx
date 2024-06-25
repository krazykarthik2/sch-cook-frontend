import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "../cn";
import { Link } from "react-router-dom";

export const PinContainer = ({
  children,
  title,
  className,
  containerClassName,
}) => {
  const [transform, setTransform] = useState(
    "translate(-50%,-50%) rotateX(0deg)"
  );
  const [pinTransform, setPinTransform] = useState("translate(0,0px)");
  const goDownpx = 80;
  const goLeft = 300;
  const onMouseEnter = () => {
    setTransform(
      `translate( calc( -50% - ${goLeft}px) ,calc( -50% + ${goDownpx}px ) ) rotateX(50deg) rotateZ(12deg) scale(1.4)`
    );
    setPinTransform(` translate(-${goLeft}px,${goDownpx}px) `);
  };
  const onMouseLeave = () => {
    setTransform("translate(-50%,-50%) rotateX(0deg) scale(1)");
    setPinTransform(" translate(0,0) ");
  };

  return (
    <div
      className={cn("relative group/pin   cursor-pointer", containerClassName)}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    
    >
      <div className="absolute left-1/2 top-1/2 ml-[0.09375rem] mt-4 -translate-x-1/2 -translate-y-1/2">
        <div
          style={{
            transform: transform,
          }}
          className=" absolute left-1/2 p-4 top-1/2  flex justify-start items-start  rounded-2xl  shadow-[0_8px_16px_rgb(0_0_0/0.4)] bg-black border border-white/[0.1] transition duration-700  group-hover/pin:!delay-0 delay-1000  overflow-hidden"
        >
          <div className={cn(" relative ", className)}>{children}</div>
        </div>
      </div>
      <div
        className="_pin transition duration-700 group-hover/pin:delay-0 delay-1000 "
        style={{ transform: pinTransform }}
      >
        <PinPerspective title={title} />
      </div>
    </div>
  );
};

export const PinPerspective = ({ title }) => {
  return (
    <motion.div className="pointer-events-none w-64 h-64 flex items-center justify-center opacity-0 group-hover/pin:opacity-100 group-hover/pin:delay-700 group-hover/pin:duration-1000  transition delay-0 duration-[1500ms]">
      <div className=" w-full h-full -mt-7 flex-none  inset-0">
        <div className="absolute top-0 inset-x-0  flex justify-center transition duration-500 group-hover/pin:scale-100 scale-50">
          <div
            target={"_blank"}
            className="relative flex space-x-2 items-center  py-0.5 px-4 ring-1 ring-white/10 transition delay-500 duration-500 group-hover/pin:!-translate-y-full -translate-y-half"
          >
            <span className="relative  text-white text-xs font-bold inline-block py-0.5">
              {title}
            </span>

            <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 "></span>
          </div>
        </div>

        <div
          style={{
            perspective: "1000px",
            transform: "rotateX(70deg) translateZ(0)",
          }}
          className="absolute left-1/2 top-1/2 ml-[0.09375rem] mt-4 -translate-x-1/2 -translate-y-1/2"
        >
          <>
            <motion.div
              initial={{
                opacity: 0,
                scale: 0,
                x: "-50%",
                y: "-50%",
              }}
              animate={{
                opacity: [0, 1, 0.5, 0],
                scale: 1,
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                delay: 0,
              }}
              className="absolute left-1/2 top-1/2  h-[11.25rem] w-[11.25rem] rounded-[50%] bg-sky-500/[0.08] shadow-[0_8px_16px_rgb(0_0_0/0.4)]"
            ></motion.div>
            <motion.div
              initial={{
                opacity: 0,
                scale: 0,
                x: "-50%",
                y: "-50%",
              }}
              animate={{
                opacity: [0, 1, 0.5, 0],
                scale: 1,
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                delay: 2,
              }}
              className="absolute left-1/2 top-1/2  h-[11.25rem] w-[11.25rem] rounded-[50%] bg-sky-500/[0.08] shadow-[0_8px_16px_rgb(0_0_0/0.4)]"
            ></motion.div>
            <motion.div
              initial={{
                opacity: 0,
                scale: 0,
                x: "-50%",
                y: "-50%",
              }}
              animate={{
                opacity: [0, 1, 0.5, 0],
                scale: 1,
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                delay: 4,
              }}
              className="absolute left-1/2 top-1/2  h-[11.25rem] w-[11.25rem] rounded-[50%] bg-sky-500/[0.08] shadow-[0_8px_16px_rgb(0_0_0/0.4)]"
            ></motion.div>
          </>
        </div>

        <div className="transition duration-250 !delay-500 group-hover/pin:h-20 overflow-hidden">
          <motion.div className="absolute right-1/2 bottom-1/2 bg-gradient-to-b from-transparent to-cyan-500 translate-y-[14px] w-px h-20 group-hover/pin:h-40 blur-[2px]" />
          <motion.div className="absolute right-1/2 bottom-1/2 bg-gradient-to-b from-transparent to-cyan-500 translate-y-[14px] w-px h-20 group-hover/pin:h-40  " />
          <motion.div className="absolute right-1/2 translate-x-[1.5px] bottom-1/2 bg-cyan-600 translate-y-[14px] w-[4px] h-[4px] rounded-full blur-[3px]" />
          <motion.div className="absolute right-1/2 translate-x-[0.5px] bottom-1/2 bg-cyan-300 translate-y-[14px] w-[2px] h-[2px] rounded-full " />
        </div>
      </div>
    </motion.div>
  );
};
