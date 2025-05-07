import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface BorderButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  size?: "default" | "sm" | "lg" | "icon";
  borderWidth?: number;
  borderSegmentSize?: number;
  borderDuration?: number;
  borderRadius?: number;
  useGradient?: boolean;
}

export default function BorderButton({
  children,
  className,
  variant = "default",
  size = "default",
  borderWidth = 2,
  borderSegmentSize = 20,
  borderDuration = 5,
  borderRadius = 8,
  useGradient = true,
  ...props
}: BorderButtonProps) {
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const [rect, setRect] = React.useState({ width: 0, height: 0 });

  React.useEffect(() => {
    if (buttonRef.current) {
      setRect({
        width: buttonRef.current.offsetWidth,
        height: buttonRef.current.offsetHeight,
      });
    }
  }, []);

  const totalPathLength = 2 * (rect.width + rect.height);

  const path = `
    M ${borderRadius},0
    L ${rect.width - borderRadius},0
    Q ${rect.width},0 ${rect.width},${borderRadius}
    L ${rect.width},${rect.height - borderRadius}
    Q ${rect.width},${rect.height} ${rect.width - borderRadius},${rect.height}
    L ${borderRadius},${rect.height}
    Q 0,${rect.height} 0,${rect.height - borderRadius}
    L 0,${borderRadius}
    Q 0,0 ${borderRadius},0
    Z
  `;

  const gradientId = "borderGradient";

  return (
    <div className="relative">
      <Button
        ref={buttonRef}
        variant={variant}
        size={size}
        className={cn("relative rounded-md", className)}
        style={{ borderRadius: `${borderRadius}px` }}
        {...props}
      >
        {children || "Hello there"}
      </Button>

      {rect.width > 0 && (
        <div
          className="absolute inset-0 pointer-events-none overflow-visible"
          style={{ borderRadius: `${borderRadius}px` }}
        >
          <svg
            width="100%"
            height="100%"
            className="absolute inset-0"
            style={{ overflow: "visible" }}
          >
            <defs>
              <motion.linearGradient
                id={gradientId}
                animate={{
                  gradientTransform: ["rotate(0)", "rotate(360)"],
                }}
                transition={{
                  duration: borderDuration * 2,
                  ease: "linear",
                  repeat: Infinity,
                }}
              >
                <stop offset="0%" stopColor="rgb(112, 190, 250)" />
                <stop offset="100%" stopColor="rgba(171, 171, 171, 0)" />
              </motion.linearGradient>
            </defs>

            <path
              d={path}
              fill="none"
              stroke="transparent"
              strokeWidth={borderWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            <motion.path
              d={path}
              fill="none"
              stroke={useGradient ? `url(#${gradientId})` : "#ffffff"}
              strokeWidth={borderWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray={`${borderSegmentSize} ${
                totalPathLength - borderSegmentSize
              }`}
              style={{
                filter: `drop-shadow(0 0 3px rgb(112, 190, 250))`,
              }}
              animate={{
                strokeDashoffset: [totalPathLength, 0],
              }}
              transition={{
                duration: borderDuration,
                ease: "linear",
                repeat: Infinity,
              }}
            />
          </svg>
        </div>
      )}
    </div>
  );
}
