import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);

  return (
    <section 
      ref={ref} 
      className="flex flex-col items-center justify-center relative px-6"
      style={{ minHeight: '100svh', height: '100svh' }}
    >
      <motion.div
        style={{ y, opacity, scale }}
        className="text-center will-change-transform"
      >
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-heading mb-4"
        >
          KOLIXX
        </motion.h1>
        
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-2xl md:text-4xl lg:text-5xl font-bold tracking-wide text-heading/90"
        >
          ВНЕ СИГНАЛА
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 text-sm tracking-[0.4em] text-foreground/70 font-mono font-medium"
        >
          ТУР 2026
        </motion.p>

        {/* Primary CTA Button - Glassmorphism */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.4, delay: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12"
        >
          <Link
            to="/tickets"
            className="group relative inline-flex items-center gap-4 px-10 py-5 glass-button rounded-2xl font-mono text-base tracking-wider transition-all duration-500 overflow-hidden"
          >
            {/* Animated glow effect */}
            <motion.span
              className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-accent/30 to-transparent"
              animate={{ x: ['-200%', '200%'] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            />
            
            {/* Pulse ring */}
            <motion.span
              className="absolute inset-0 rounded-2xl border-2 border-accent/40"
              animate={{ scale: [1, 1.05, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
            
            <span className="relative z-10 font-bold text-heading">КУПИТЬ БИЛЕТ</span>
            <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="relative z-10 text-accent-foreground"
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </motion.svg>
          </Link>
        </motion.div>

        {/* Secondary info */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-4 text-xs font-mono text-muted-foreground"
        >
          ОГРАНИЧЕННОЕ КОЛИЧЕСТВО МЕСТ
        </motion.p>
      </motion.div>
      
      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-12"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-12 bg-gradient-to-b from-muted-foreground to-transparent"
        />
      </motion.div>
    </section>
  );
};

export default HeroSection;
