import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState, memo } from 'react';
import { Link } from 'react-router-dom';
import { Ticket } from 'lucide-react';

const SHOW_AFTER_PX = 500;

const FloatingCTA = memo(() => {
  const [isVisible, setIsVisible] = useState(false);
  const visibleRef = useRef(false);

  useEffect(() => {
    let raf = 0;

    const update = () => {
      const next = window.scrollY > SHOW_AFTER_PX;
      if (next !== visibleRef.current) {
        visibleRef.current = next;
        setIsVisible(next);
      }
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[60]"
        >
          <Link
            to="/tickets"
            className="group relative flex items-center gap-3 px-6 py-3 glass-button rounded-full font-mono text-sm tracking-wider shadow-lg"
          >
            {/* Pulse effect */}
            <motion.span
              className="absolute inset-0 rounded-full border border-accent/50"
              animate={{ scale: [1, 1.08, 1], opacity: [0.45, 0, 0.45] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* Glow sweep */}
            <motion.span
              className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-accent/20 to-transparent"
              animate={{ x: ['-200%', '200%'] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: 'linear' }}
            />

            <Ticket className="relative z-10 w-4 h-4 text-accent-foreground" />
            <span className="relative z-10 font-bold text-heading">КУПИТЬ БИЛЕТ</span>
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
});

FloatingCTA.displayName = 'FloatingCTA';

export default FloatingCTA;

