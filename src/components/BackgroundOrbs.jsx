import React, { useEffect, useRef } from "react";

export default function BackgroundOrbs() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    // Create 45 ambient golden/peacock floating stardust particles
    const particleCount = 45;
    const particles = [];
    const colors = ["#d4af37", "#f59e0b", "#38bdf8", "#2dd4bf", "#ffffff"];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.8 + 0.5,
        color: colors[Math.floor(Math.random() * colors.length)],
        vx: (Math.random() - 0.5) * 0.25,
        vy: -Math.random() * 0.35 - 0.1, // gently float upward
        alpha: Math.random() * 0.6 + 0.2,
        twinkleSpeed: Math.random() * 0.02 + 0.005,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        // Twinkle
        p.alpha += Math.sin(Date.now() * p.twinkleSpeed) * 0.01;
        const clampedAlpha = Math.max(0.1, Math.min(0.8, p.alpha));

        // Wrap around bounds
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = clampedAlpha;
        ctx.shadowBlur = 8;
        ctx.shadowColor = p.color;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Deep Royal Midnight Base */}
      <div className="absolute inset-0 bg-[#030917]" />

      {/* Subtle Golden Temple Grid Pattern */}
      <div className="absolute inset-0 bg-temple-pattern opacity-35" />

      {/* Interactive Stardust Particle Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-60 pointer-events-none"
      />

      {/* Royal Blue Top Atmosphere Glow */}
      <div className="absolute -top-[15%] left-1/2 -translate-x-1/2 w-[900px] h-[550px] bg-gradient-to-b from-blue-700/20 via-indigo-900/15 to-transparent rounded-full blur-[140px]" />

      {/* Golden Oration Left Glow */}
      <div className="absolute top-[20%] -left-[10%] w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[120px]" />

      {/* Peacock Teal Right Glow */}
      <div className="absolute top-[40%] -right-[10%] w-[550px] h-[550px] bg-teal-500/10 rounded-full blur-[130px]" />

      {/* Subtle Mid-page Golden Ambient Orb */}
      <div className="absolute top-[75%] left-[20%] w-[600px] h-[600px] bg-amber-600/8 rounded-full blur-[150px]" />
    </div>
  );
}

