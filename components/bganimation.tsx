"use client";

// import { useEffect, useRef } from "react";

const BackgroundAnimation = () => {
  // const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // useEffect(() => {
  //   const canvas = canvasRef.current;
  //   if (!canvas) return;
  //   const ctx = canvas.getContext("2d");
  //   if (!ctx) return;

  //   // Responsive canvas
  //   const resizeCanvas = () => {
  //     canvas.width = window.innerWidth - 10;
  //     canvas.height = window.innerHeight - 30;
  //   };
  //   resizeCanvas();
  //   window.addEventListener("resize", resizeCanvas);

  //   const randomOffset = (range: any) => (Math.random() - 0.5) * range; // Random offset within a range

  //   const balls = Array.from({ length: 6 }, () => ({
  //     x: canvas.width / 2 + randomOffset(200), // Spread around the center
  //     y: canvas.height / 2 + randomOffset(200),
  //     radius: 200, // Reduced size
  //     dx: (Math.random() - 0.5) * 4, // Slower velocity
  //     dy: (Math.random() - 0.5) * 4,
  //     color: "rgb(112, 190, 250)",
  //   }));

  //   const updateCanvas = () => {
  //     ctx.clearRect(0, 0, canvas.width, canvas.height);

  //     balls.forEach((ball) => {
  //       // Move ball
  //       ball.x += ball.dx;
  //       ball.y += ball.dy;

  //       // Bounce from edges
  //       if (ball.x - ball.radius < 0 || ball.x + ball.radius > canvas.width) {
  //         ball.dx *= -1;
  //       }
  //       if (ball.y - ball.radius < 0 || ball.y + ball.radius > canvas.height) {
  //         ball.dy *= -1;
  //       }

  //       // Draw ball with blur
  //       ctx.beginPath();
  //       ctx.fillStyle = ball.color;
  //       ctx.filter = "blur(80px)"; // Lower blur
  //       ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  //       ctx.fill();
  //       ctx.closePath();
  //     });

  //     setTimeout(() => requestAnimationFrame(updateCanvas), 33); // 30 FPS
  //   };

  //   updateCanvas();

  //   return () => {
  //     ctx.clearRect(0, 0, canvas.width, canvas.height);
  //     window.removeEventListener("resize", resizeCanvas);
  //   };
  // }, []);

  return (
    <div className="absolute inset-0 w-full h-full z-10">
      <img
        src="/bg-neon.webp"
        alt="bg-neon"
        className="blur-[75px] absolute inset-0 w-full h-full object-cover"
      />
    </div>
  );
};

export default BackgroundAnimation;
