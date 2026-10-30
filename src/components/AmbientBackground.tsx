import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export const AmbientBackground: React.FC = () => {
  const { scrollY } = useScroll();

  const yOrb1 = useTransform(scrollY, [0, 3000], [0, 450]);
  const yOrb2 = useTransform(scrollY, [0, 3000], [0, -400]);
  const yOrb3 = useTransform(scrollY, [0, 3000], [0, 250]);
  const rotateRing = useTransform(scrollY, [0, 3000], [0, 180]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-20">
      
      {/* Soft translucent frosted glass orbs with gentle parallax */}
      <motion.div
        style={{ y: yOrb1 }}
        className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-neon-pink/8 to-transparent blur-[160px]"
      />

      <motion.div
        style={{ y: yOrb2 }}
        className="absolute top-1/2 -right-48 w-[650px] h-[650px] rounded-full bg-gradient-to-tl from-neon-cyan/8 via-neon-purple/5 to-transparent blur-[180px]"
      />

      <motion.div
        style={{ y: yOrb3 }}
        className="absolute bottom-10 left-1/4 w-[500px] h-[500px] rounded-full bg-neon-gold/5 blur-[150px]"
      />

      {/* Floating Retro Wireframe Polygon Accent */}
      <motion.div
        style={{ rotate: rotateRing }}
        className="absolute top-1/3 right-[10%] w-72 h-72 border border-white/[0.03] rounded-full opacity-40 select-none"
      >
        <div className="w-full h-full border border-dashed border-neon-cyan/[0.06] rounded-full animate-spin" style={{ animationDuration: '60s' }} />
      </motion.div>

      {/* CRT Subtle Vignette */}
      <div className="absolute inset-0 crt-vignette opacity-70" />

    </div>
  );
};
