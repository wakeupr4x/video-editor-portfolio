import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const CuteCursor: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [hoverType, setHoverType] = useState<'button' | 'video' | 'default'>('default');

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth fluid spring physics for cute trailing effect
  const springConfig = { damping: 25, stiffness: 350, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  // Secondary soft trailer
  const trailConfig = { damping: 20, stiffness: 180, mass: 0.8 };
  const trailX = useSpring(mouseX, trailConfig);
  const trailY = useSpring(mouseY, trailConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      // Check if hovering interactive elements
      const target = e.target as HTMLElement | null;
      if (target) {
        const isClickable = target.closest('button, a, input, select');
        const isVideoCard = target.closest('video, [data-cursor="video"]');

        if (isVideoCard) {
          setIsHovered(true);
          setHoverType('video');
        } else if (isClickable) {
          setIsHovered(true);
          setHoverType('button');
        } else {
          setIsHovered(false);
          setHoverType('default');
        }
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [mouseX, mouseY]);

  return (
    <div className="hidden md:block pointer-events-none fixed inset-0 z-[999] overflow-hidden select-none">
      
      {/* Soft Pastel Trailing Sparkle Bubble */}
      <motion.div
        style={{
          x: trailX,
          y: trailY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isClicking ? 0.8 : isHovered ? 1.4 : 1,
          opacity: isHovered ? 0.35 : 0.2,
        }}
        transition={{ duration: 0.15 }}
        className="absolute w-10 h-10 rounded-full bg-pastel-pink blur-[2px]"
      />

      {/* Main Cute Animated Face Cursor */}
      <motion.div
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isClicking ? 0.75 : isHovered ? 1.35 : 1,
          rotate: isHovered ? 8 : 0,
        }}
        transition={{ type: 'spring', damping: 15, stiffness: 300 }}
        className="absolute flex items-center justify-center"
      >
        <div className={`w-8 h-8 rounded-full border-2 border-white shadow-md flex items-center justify-center transition-colors duration-200 ${
          hoverType === 'video'
            ? 'bg-pastel-purple text-pastel-purple-ink'
            : isHovered
            ? 'bg-pastel-pink text-pastel-pink-ink'
            : 'bg-pastel-mint text-pastel-mint-ink'
        }`}>
          {/* Cute Little Facial Expression */}
          <span className="text-xs leading-none select-none">
            {hoverType === 'video' ? '▶' : isHovered ? '✨' : '☻'}
          </span>
        </div>
      </motion.div>

    </div>
  );
};
