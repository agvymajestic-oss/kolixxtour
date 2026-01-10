import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { useState, memo } from 'react';
import { Link } from 'react-router-dom';
import { Ticket } from 'lucide-react';

const FloatingCTA = memo(() => {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    // Show after scrolling 500px
    setIsVisible(latest > 500);
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ 
        opacity: isVisible ? 1 : 0, 
        y: isVisible ? 0 : 100,
        pointerEvents: isVisible ? 'auto' : 'none'
      }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40"
    >
      <Link
        to="/tickets"
        className="group relative flex items-center gap-3 px-6 py-3 glass-button rounded-full font-mono text-sm tracking-wider shadow-lg"
      >
        {/* Pulse effect */}
        <motion.span
          className="absolute inset-0 rounded-full border border-accent/50"
          animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
        
        {/* Glow sweep */}
        <motion.span
          className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-accent/20 to-transparent"
          animate={{ x: ['-200%', '200%'] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        />
        
        <Ticket className="relative z-10 w-4 h-4 text-accent-foreground" />
        <span className="relative z-10 font-bold text-heading">КУПИТЬ БИЛЕТ</span>
      </Link>
    </motion.div>
  );
});

FloatingCTA.displayName = 'FloatingCTA';

export default FloatingCTA;
