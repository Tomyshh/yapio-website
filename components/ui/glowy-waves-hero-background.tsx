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

function isLowPerformanceMode(): boolean {
  if (typeof window === 'undefined') return true;
  return (
    window.innerWidth < 768 ||
    window.matchMedia('(pointer: coarse)').matches ||
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

export function GlowyWavesHeroBackground() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef<Point>({ x: 0, y: 0 });
  const targetMouseRef = useRef<Point>({ x: 0, y: 0 });

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return undefined;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return undefined;

    let animationId: number;
    let time = 0;
    let logicalW = 1;
    let logicalH = 1;
    let lowPerf = isLowPerformanceMode();

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let mouseInfluence = prefersReducedMotion || lowPerf ? 0 : 70;
    const influenceRadius = prefersReducedMotion ? 160 : 320;
    let smoothing = prefersReducedMotion || lowPerf ? 0 : 0.1;

    /**
     * Taille du canvas = conteneur réel (pas la fenêtre).
     * Avant : innerWidth/innerHeight forçaient un petit canvas dans un parent élargi (-inset 30%) → fond « coupé », surtout en RTL.
     */
    const resizeCanvas = () => {
      lowPerf = isLowPerformanceMode();
      mouseInfluence = prefersReducedMotion || lowPerf ? 0 : 70;
      smoothing = prefersReducedMotion || lowPerf ? 0 : 0.1;

      const w = Math.max(1, Math.floor(container.clientWidth));
      const h = Math.max(1, Math.floor(container.clientHeight));
      logicalW = w;
      logicalH = h;

      const dprCap = lowPerf ? 1.25 : 2;
      const dpr = Math.min(window.devicePixelRatio || 1, dprCap);
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
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
      if (lowPerf || mouseInfluence === 0) return;
      const rect = canvas.getBoundingClientRect();
      const scaleX = logicalW / rect.width;
      const scaleY = logicalH / rect.height;
      targetMouseRef.current = {
        x: (e.clientX - rect.left) * scaleX,
        y: (e.clientY - rect.top) * scaleY,
      };
    };

    const handleMouseLeave = () => recenterMouse();

    const waves = () => (lowPerf ? VIOLET_WAVE_PALETTE.slice(0, 2) : VIOLET_WAVE_PALETTE);
    const stepX = () => (lowPerf ? 12 : 4);

    const drawWave = (wave: WaveConfig) => {
      ctx.save();
      ctx.beginPath();

      const sx = stepX();
      for (let x = 0; x <= logicalW; x += sx) {
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

      ctx.lineWidth = lowPerf ? 1.5 : 2.5;
      ctx.strokeStyle = wave.color;
      ctx.globalAlpha = wave.opacity;
      if (!lowPerf) {
        ctx.shadowBlur = 35;
        ctx.shadowColor = wave.color;
      } else {
        ctx.shadowBlur = 0;
      }
      ctx.stroke();
      ctx.restore();
    };

    let running = true;

    const animate = () => {
      if (!running) return;

      time += 1;
      mouseRef.current.x += (targetMouseRef.current.x - mouseRef.current.x) * smoothing;
      mouseRef.current.y += (targetMouseRef.current.y - mouseRef.current.y) * smoothing;

      if (lowPerf && time % 2 !== 0) {
        animationId = window.requestAnimationFrame(animate);
        return;
      }

      const gradient = ctx.createLinearGradient(0, 0, 0, logicalH);
      gradient.addColorStop(0, BG_TOP);
      gradient.addColorStop(1, BG_BOTTOM);
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, logicalW, logicalH);

      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;
      waves().forEach(drawWave);

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

    const ro = new ResizeObserver(() => {
      handleResize();
    });
    ro.observe(container);

    handleResize();
    window.addEventListener('resize', handleResize, { passive: true });
    if (!lowPerf && mouseInfluence > 0) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseleave', handleMouseLeave);
    }
    document.addEventListener('visibilitychange', onVisibilityChange);
    if (!document.hidden) {
      animationId = window.requestAnimationFrame(animate);
    } else {
      running = false;
    }

    return () => {
      ro.disconnect();
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('visibilitychange', onVisibilityChange);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 min-h-full min-w-full overflow-hidden pointer-events-none"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 block h-full w-full max-h-none max-w-none"
        aria-hidden="true"
      />
      <div className="absolute inset-0 hidden md:block overflow-hidden" aria-hidden="true">
        <div className="absolute left-1/2 top-0 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[#7737E9]/[0.06] blur-[140px]" />
        <div className="absolute bottom-0 right-0 h-[360px] w-[360px] rounded-full bg-[#7737E9]/[0.04] blur-[120px]" />
        <div className="absolute top-1/2 left-1/4 h-[400px] w-[400px] rounded-full bg-[#7737E9]/[0.05] blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 h-[300px] w-[300px] rounded-full bg-[#5E1FD4]/[0.04] blur-[100px]" />
      </div>
    </div>
  );
}

export default GlowyWavesHeroBackground;
