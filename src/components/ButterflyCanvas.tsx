import React, { useEffect, useRef } from 'react';
import { ButterflyState } from '../types';

interface ButterflyCanvasProps {
  state: ButterflyState;
}

export const ButterflyCanvas: React.FC<ButterflyCanvasProps> = ({ state }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let frame = 0;
    let animationId: number;

    const drawButterfly = (x: number, y: number, scale: number, angle: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);
      ctx.scale(scale, scale);
      ctx.strokeStyle = '#d946ef'; // fuchsia-400
      ctx.lineWidth = 2;
      ctx.beginPath();
      // Left wing
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(-20, -40, -40, -10, -10, 0);
      ctx.bezierCurveTo(-40, 10, -20, 40, 0, 0);
      // Right wing
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(20, -40, 40, -10, 10, 0);
      ctx.bezierCurveTo(40, 10, 20, 40, 0, 0);
      ctx.stroke();
      ctx.restore();
    };

    const animate = () => {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      let x = centerX;
      let y = centerY;
      let angle = 0;
      let scale = 1;

      if (state === 'hover') {
        y += Math.sin(frame * 0.05) * 10;
        angle = Math.sin(frame * 0.05) * 0.1;
      } else if (state === 'rest') {
        scale = 0.8 + Math.sin(frame * 0.02) * 0.1;
        ctx.globalAlpha = 0.7;
      } else if (state === 'active') {
        x += Math.cos(frame * 0.2) * 30;
        y += Math.sin(frame * 0.2) * 30;
        angle = Math.sin(frame * 0.2) * 0.5;
        scale = 1.2;
      }

      drawButterfly(x, y, scale, angle);
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(animationId);
  }, [state]);

  return <canvas ref={canvasRef} width={200} height={200} className="w-full h-full" />;
};
