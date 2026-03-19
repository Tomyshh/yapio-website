'use client';

import { useEffect, useRef } from 'react';

type Point = { x: number; y: number };

interface WaveConfig {
  offset: number;
  amplitude: number;
  frequency: number;
  color: string;
  opacity: number;
}

/** Palette violette (style Yapio) pour les vagues */
const VIOLET_WAVE_PALETTE: WaveConfig[] = [
  { offset: 0, amplitude: 70, frequency: 0.003, color: 'rgba(119, 55, 233, 0.8)', opacity: 0.45 },
  { offset: Math.PI / 2, amplitude: 90, frequency: 0.0026, color: 'rgba(139, 77, 233, 0.7)', opacity: 0.35 },
  { offset: Math.PI, amplitude: 60, frequency: 0.0034, color: 'rgba(94, 31, 212, 0.65)', opacity: 0.3 },
  { offset: Math.PI * 1.5, amplitude: 80, frequency: 0.0022, color: 'rgba(119, 55, 233, 0.4)', opacity: 0.25 },
  { offset: Math.PI * 2, amplitude: 55, frequency: 0.004, color: 'rgba(139, 77, 233, 0.25)', opacity: 0.2 },
];

const BG_TOP = '#050508';
const BG_BOTTOM = 'rgba(5, 5, 12, 0.98)';

export function GlowyWavesHeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef<Point>({ x: 0, y: 0 });
  const targetMouseRef = useRef<Point>({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const ctx = canvas.getContext('2d');
    if (!ctx) return undefined;

    let animationId: number;
    let time = 0;
    let logicalW = window.innerWidth;
    let logicalH = window.innerHeight;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const mouseInfluence = prefersReducedMotion ? 10 : 70;
    const influenceRadius = prefersReducedMotion ? 160 : 320;
    const smoothing = prefersReducedMotion ? 0.04 : 0.1;

    /** DPR plafonné à 2 : moins de pixels sur écrans 3x, rendu plus net que 1x CSS seul */
    const resizeCanvas = () => {
      logicalW = window.innerWidth;
      logicalH = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(logicalW * dpr);
      canvas.height = Math.floor(logicalH * dpr);
      canvas.style.width = `${logicalW}px`;
      canvas.style.height = `${logicalH}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const recenterMouse = () => {
      const centerPoint = { x: logicalW / 2, y: logicalH / 2 };
      mouseRef.current = centerPoint;
      targetMouseRef.current = centerPoint;
    };

    const handleResize = () => {
      resizeCanvas();
      recenterMouse();
    };

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseLeave = () => recenterMouse();

    const drawWave = (wave: WaveConfig) => {
      ctx.save();
      ctx.beginPath();

      for (let x = 0; x <= logicalW; x += 4) {
        const dx = x - mouseRef.current.x;
        const dy = logicalH / 2 - mouseRef.current.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const influence = Math.max(0, 1 - distance / influenceRadius);
        const mouseEffect =
          influence *
          mouseInfluence *
          Math.sin(time * 0.001 + x * 0.01 + wave.offset);

        const y =
          logicalH / 2 +
          Math.sin(x * wave.frequency + time * 0.002 + wave.offset) * wave.amplitude +
          Math.sin(x * wave.frequency * 0.4 + time * 0.003) * (wave.amplitude * 0.45) +
          mouseEffect;

        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }

      ctx.lineWidth = 2.5;
      ctx.strokeStyle = wave.color;
      ctx.globalAlpha = wave.opacity;
      ctx.shadowBlur = 35;
      ctx.shadowColor = wave.color;
      ctx.stroke();
      ctx.restore();
    };

    let running = true;

    const animate = () => {
      if (!running) return;

      time += 1;
      mouseRef.current.x += (targetMouseRef.current.x - mouseRef.current.x) * smoothing;
      mouseRef.current.y += (targetMouseRef.current.y - mouseRef.current.y) * smoothing;

      const gradient = ctx.createLinearGradient(0, 0, 0, logicalH);
      gradient.addColorStop(0, BG_TOP);
      gradient.addColorStop(1, BG_BOTTOM);
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, logicalW, logicalH);

      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;
      VIOLET_WAVE_PALETTE.forEach(drawWave);

      animationId = window.requestAnimationFrame(animate);
    };

    const startLoop = () => {
      if (running) return;
      running = true;
      animationId = window.requestAnimationFrame(animate);
    };

    const stopLoop = () => {
      running = false;
      cancelAnimationFrame(animationId);
    };

    const onVisibilityChange = () => {
      if (document.hidden) {
        stopLoop();
      } else {
        startLoop();
      }
    };

    resizeCanvas();
    recenterMouse();
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('visibilitychange', onVisibilityChange);
    if (!document.hidden) {
      animationId = window.requestAnimationFrame(animate);
    } else {
      running = false;
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('visibilitychange', onVisibilityChange);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
      />
      {/* Orbes de lumière violet (style Yapio) */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute left-1/2 top-0 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[#7737E9]/[0.06] blur-[140px]" />
        <div className="absolute bottom-0 right-0 h-[360px] w-[360px] rounded-full bg-[#7737E9]/[0.04] blur-[120px]" />
        <div className="absolute top-1/2 left-1/4 h-[400px] w-[400px] rounded-full bg-[#7737E9]/[0.05] blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 h-[300px] w-[300px] rounded-full bg-[#5E1FD4]/[0.04] blur-[100px]" />
      </div>
    </div>
  );
}

export default GlowyWavesHeroBackground;
