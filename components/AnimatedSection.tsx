'use client';

import { motion, useInView, Variants, useReducedMotion } from 'framer-motion';
import { useRef, ReactNode } from 'react';

type AnimationType = 
  | 'fadeUp' 
  | 'fadeDown' 
  | 'fadeLeft' 
  | 'fadeRight' 
  | 'scale' 
  | 'blur' 
  | 'slideReveal'
  | 'stagger'
  | 'parallax';

interface AnimatedSectionProps {
  children: ReactNode;
  animation?: AnimationType;
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
  threshold?: number;
}

const animationVariants: Record<AnimationType, Variants> = {
  fadeUp: {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0 },
  },
  fadeDown: {
    hidden: { opacity: 0, y: -60 },
    visible: { opacity: 1, y: 0 },
  },
  fadeLeft: {
    hidden: { opacity: 0, x: -60 },
    visible: { opacity: 1, x: 0 },
  },
  fadeRight: {
    hidden: { opacity: 0, x: 60 },
    visible: { opacity: 1, x: 0 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  },
  blur: {
    hidden: { opacity: 0, filter: 'blur(20px)' },
    visible: { opacity: 1, filter: 'blur(0px)' },
  },
  slideReveal: {
    hidden: { opacity: 0, y: 100, rotateX: -15 },
    visible: { opacity: 1, y: 0, rotateX: 0 },
  },
  stagger: {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  },
  parallax: {
    hidden: { opacity: 0, y: 80 },
    visible: { opacity: 1, y: 0 },
  },
};

export default function AnimatedSection({
  children,
  animation = 'fadeUp',
  delay = 0,
  duration = 0.6,
  className = '',
  once = true,
  threshold = 0.1,
}: AnimatedSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, amount: threshold });
  const reduceMotion = useReducedMotion();

  // Le blur via `filter` est cher (surtout sur mobile). En mode réduit, on remplace par une anim simple.
  const resolvedAnimation: AnimationType =
    reduceMotion && animation === 'blur' ? 'fadeUp' : animation;

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={animationVariants[resolvedAnimation]}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Composant pour texte avec animation lettre par lettre
interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
  staggerDelay?: number;
}

export function AnimatedText({ 
  text, 
  className = '', 
  delay = 0,
  staggerDelay = 0.03 
}: AnimatedTextProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delay,
      },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 50, rotateX: -90 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut' as const,
      },
    },
  };

  return (
    <motion.span
      ref={ref}
      className={`inline-block ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      style={{ perspective: 1000 }}
    >
      {text.split('').map((char, index) => (
        <motion.span
          key={index}
          className="inline-block"
          variants={letterVariants}
          style={{ transformOrigin: 'center bottom' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </motion.span>
  );
}

// Composant pour animation de lignes
interface AnimatedLinesProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function AnimatedLines({ children, className = '', delay = 0 }: AnimatedLinesProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      className={`overflow-hidden ${className}`}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      <motion.div
        initial={{ y: '100%' }}
        animate={isInView ? { y: 0 } : { y: '100%' }}
        transition={{
          duration: 0.8,
          delay: delay + 0.1,
          ease: [0.25, 0.1, 0.25, 1],
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

// Composant pour grille d'éléments avec animation stagger
interface StaggerGridProps {
  children: ReactNode[];
  className?: string;
  itemClassName?: string;
  staggerDelay?: number;
  baseDelay?: number;
}

export function StaggerGrid({ 
  children, 
  className = '', 
  itemClassName = '',
  staggerDelay = 0.1,
  baseDelay = 0
}: StaggerGridProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: baseDelay,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: 'easeOut' as const,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      {children.map((child, index) => (
        <motion.div key={index} className={itemClassName} variants={itemVariants}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}

// Effet Parallax pour backgrounds
interface ParallaxProps {
  children: ReactNode;
  speed?: number;
  className?: string;
}

export function Parallax({ children, speed = 0.5, className = '' }: ParallaxProps) {
  const ref = useRef(null);
  
  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        y: 0,
      }}
      whileInView={{
        y: [-50 * speed, 50 * speed],
      }}
      transition={{
        y: {
          duration: 0,
        },
      }}
      viewport={{ once: false, amount: 'all' }}
    >
      {children}
    </motion.div>
  );
}
