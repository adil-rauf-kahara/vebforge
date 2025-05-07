import React from "react";

interface FadingBorderProps {
  side: "top" | "bottom" | "left" | "right";
  color?: string;
}

const FadingBorder: React.FC<FadingBorderProps> = ({ side }) => {
  const borderStyles: Record<string, string> = {
    top: `absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-300 to-transparent`,
    bottom: `absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-300 to-transparent`,
    left: `absolute left-0 top-0 h-full w-[1px] bg-gradient-to-b from-transparent via-blue-300 to-transparent`,
    right: `absolute right-0 top-0 h-full w-[1px] bg-gradient-to-b from-transparent via-blue-300 to-transparent`,
  };

  return <div className={borderStyles[side]}></div>;
};

export default FadingBorder;
