"use client";

import React, { useEffect, useRef } from 'react';

interface Boid {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

export const BoidsBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const boids = useRef<Boid[]>([]);
  const animationFrameId = useRef<number>(0);

  const BOID_COUNT = 1000;
  const VISUAL_RANGE = 75;
  const COHESION_FACTOR = 0.005;
  const SEPARATION_FACTOR = 0.05;
  const ALIGNMENT_FACTOR = 0.05;
  const MARGIN = 100;
  const TURN_FACTOR = 0.2;
  const SPEED_LIMIT = 2;

  const initBoids = (width: number, height: number) => {
    boids.current = Array.from({ length: BOID_COUNT }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
    }));
  };

  const distance = (b1: Boid, b2: Boid) => {
    return Math.sqrt((b1.x - b2.x) ** 2 + (b1.y - b2.y) ** 2);
  };

  const updateBoids = (width: number, height: number) => {
    for (const boid of boids.current) {
      let centerX = 0;
      let centerY = 0;
      let moveX = 0;
      let moveY = 0;
      let avgVX = 0;
      let avgVY = 0;
      let neighbors = 0;

      for (const other of boids.current) {
        if (other !== boid) {
          const d = distance(boid, other);
          if (d < VISUAL_RANGE) {
            centerX += other.x;
            centerY += other.y;
            avgVX += other.vx;
            avgVY += other.vy;
            neighbors++;

            if (d < 20) {
              moveX += boid.x - other.x;
              moveY += boid.y - other.y;
            }
          }
        }
      }

      if (neighbors > 0) {
        centerX /= neighbors;
        centerY /= neighbors;
        avgVX /= neighbors;
        avgVY /= neighbors;

        boid.vx += (centerX - boid.x) * COHESION_FACTOR;
        boid.vy += (centerY - boid.y) * COHESION_FACTOR;

        boid.vx += (avgVX - boid.vx) * ALIGNMENT_FACTOR;
        boid.vy += (avgVY - boid.vy) * ALIGNMENT_FACTOR;
      }

      boid.vx += moveX * SEPARATION_FACTOR;
      boid.vy += moveY * SEPARATION_FACTOR;

      // Boundary avoidance
      if (boid.x < MARGIN) boid.vx += TURN_FACTOR;
      if (boid.x > width - MARGIN) boid.vx -= TURN_FACTOR;
      if (boid.y < MARGIN) boid.vy += TURN_FACTOR;
      if (boid.y > height - MARGIN) boid.vy -= TURN_FACTOR;

      // Speed limit
      const speed = Math.sqrt(boid.vx ** 2 + boid.vy ** 2);
      if (speed > SPEED_LIMIT) {
        boid.vx = (boid.vx / speed) * SPEED_LIMIT;
        boid.vy = (boid.vy / speed) * SPEED_LIMIT;
      }

      boid.x += boid.vx;
      boid.y += boid.vy;
    }
  };

  const getRandomVibrantColor = () => {

    const r = Math.floor(Math.random() * 106) + 150;
    const g = Math.floor(Math.random() * 106) + 150;
    const b = Math.floor(Math.random() * 106) + 150;
    return `rgba(${r}, ${g}, ${b}, 0.15)`;
  }


  const drawBoids = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = getRandomVibrantColor()     //'rgba(255, 255, 255, 0.15)';

    for (const boid of boids.current) {
      const angle = Math.atan2(boid.vy, boid.vx);
      ctx.save();
      ctx.translate(boid.x, boid.y);
      ctx.rotate(angle);

      ctx.beginPath();
      ctx.moveTo(6, 0);
      ctx.lineTo(-3, 3);
      ctx.lineTo(-3, -3);
      ctx.closePath();
      ctx.fill();

      // Muted glow
      ctx.shadowBlur = 10;
      ctx.shadowColor = 'rgba(255, 255, 255, 0.1)';

      ctx.restore();
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initBoids(canvas.width, canvas.height);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const animate = () => {
      updateBoids(canvas.width, canvas.height);
      drawBoids(ctx, canvas.width, canvas.height);
      animationFrameId.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 bg-transparent pointer-events-none"
    />
  );
};
