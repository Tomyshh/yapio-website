'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef, ReactNode, MouseEvent } from 'react';
import { useCoarsePointer } from '@/hooks/useCoarsePointer';

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  strength?: number;
  radius?: number;
  as?: 'button' | 'a' | 'div';
  href?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

export default function MagneticButton({
  children,
  className = '',
  strength = 0.3,
  radius = 200,
  as = 'button',
  href,
  onClick,
  type = 'button',
}: MagneticButtonProps) {
  const ref = useRef<HTMLElement>(null);
  const coarsePointer = useCoarsePointer();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const springConfig = { damping: 15, stiffness: 150 };
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);

  const handleMouseMove = (e: MouseEvent) => {
    if (!ref.current) return;
    
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
    
    if (distance < radius) {
      x.set(distanceX * strength);
      y.set(distanceY * strength);
    }
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  /* Mobile / tactile : pas de spring Framer + pas d’écoute mouse = scroll et taps plus fluides */
  if (coarsePointer) {
    const staticClass = `magnetic-btn ${className} active:scale-[0.98] transition-transform duration-150`;
    if (as === 'a' && href) {
      return (
        <a href={href} className={staticClass}>
          {children}
        </a>
      );
    }
    if (as === 'button') {
      return (
        <button type={type} onClick={onClick} className={staticClass}>
          {children}
        </button>
      );
    }
    return <div className={staticClass}>{children}</div>;
  }

  const motionProps = {
    style: { x: xSpring, y: ySpring },
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    className: `magnetic-btn ${className}`,
    whileHover: { scale: 1.05 },
    whileTap: { scale: 0.95 },
    transition: { type: 'spring' as const, stiffness: 400, damping: 17 },
  };

  if (as === 'a' && href) {
    return (
      <motion.a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        {...motionProps}
        href={href}
      >
        {children}
      </motion.a>
    );
  }

  if (as === 'button') {
    return (
      <motion.button
        ref={ref as React.RefObject<HTMLButtonElement>}
        {...motionProps}
        onClick={onClick}
        type={type}
      >
        {children}
      </motion.button>
    );
  }

  return (
    <motion.div
      ref={ref as React.RefObject<HTMLDivElement>}
      {...motionProps}
    >
      {children}
    </motion.div>
  );
}

// Effet 3D Tilt pour les cartes
interface TiltCardProps {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
  perspective?: number;
  glareEnable?: boolean;
}

export function TiltCard({
  children,
  className = '',
  maxTilt = 10,
  perspective = 1000,
  glareEnable = true,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const glareX = useMotionValue(50);
  const glareY = useMotionValue(50);
  const glareOpacity = useMotionValue(0);
  
  const springConfig = { damping: 20, stiffness: 300 };
  const rotateXSpring = useSpring(rotateX, springConfig);
  const rotateYSpring = useSpring(rotateY, springConfig);

  const handleMouseMove = (e: MouseEvent) => {
    if (!ref.current) return;
    
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    
    const rotateXValue = (mouseY / (rect.height / 2)) * -maxTilt;
    const rotateYValue = (mouseX / (rect.width / 2)) * maxTilt;
    
    rotateX.set(rotateXValue);
    rotateY.set(rotateYValue);
    
    if (glareEnable) {
      const glareXValue = ((e.clientX - rect.left) / rect.width) * 100;
      const glareYValue = ((e.clientY - rect.top) / rect.height) * 100;
      glareX.set(glareXValue);
      glareY.set(glareYValue);
      glareOpacity.set(0.15);
    }
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    glareOpacity.set(0);
  };

  const glareBackground = useTransform(
    [glareX, glareY],
    ([x, y]) =>
      `radial-gradient(circle at ${x}% ${y}%, rgba(255,255,255,0.3) 0%, transparent 60%)`
  );

  /* overflow-visible : évite de couper le haut des cartes au survol (scale + tilt sortent du cadre aligné aux axes). */
  return (
    <motion.div
      ref={ref}
      className={`relative overflow-visible ${className}`}
      style={{
        perspective,
        rotateX: rotateXSpring,
        rotateY: rotateYSpring,
        transformStyle: 'preserve-3d',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      {children}
      {glareEnable && (
        <motion.div
          className="pointer-events-none absolute inset-0"
          style={{
            background: glareBackground,
            opacity: glareOpacity,
          }}
        />
      )}
    </motion.div>
  );
}
