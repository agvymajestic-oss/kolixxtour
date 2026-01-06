import { motion } from 'framer-motion';
import { useMemo } from 'react';

const Snowflake = ({ delay, duration, x, size }: { delay: number; duration: number; x: number; size: number }) => {
  const drift = Math.sin(delay * 10) * 20;
  
  return (
    <motion.div
      className="absolute rounded-full bg-white/30"
      style={{
        width: size,
        height: size,
        left: `${x}%`,
        filter: `blur(${size > 4 ? 2 : 1}px)`,
        willChange: 'transform',
      }}
      initial={{ y: '-2%', opacity: 0 }}
      animate={{
        y: '100vh',
        opacity: [0, 0.6, 0.6, 0],
        x: [0, drift, 0, -drift, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'linear',
        x: {
          duration: duration / 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }
      }}
    />
  );
};

const Snowfall = () => {
  const snowflakes = useMemo(() => 
    Array.from({ length: 40 }, (_, i) => ({
      id: i,
      delay: i * 0.2,
      duration: 10 + Math.random() * 10,
      x: Math.random() * 100,
      size: 2 + Math.random() * 4,
    })), []
  );

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-50">
      {snowflakes.map((flake) => (
        <Snowflake key={flake.id} {...flake} />
      ))}
    </div>
  );
};

export default Snowfall;
