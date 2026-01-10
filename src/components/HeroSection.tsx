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
    <section ref={ref} className="min-h-screen flex flex-col items-center justify-center relative px-6">
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

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12"
        >
          <Link
            to="/tickets"
            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-accent text-accent-foreground font-mono text-sm tracking-widest border-2 border-accent hover:bg-accent/80 transition-all duration-500 overflow-hidden"
          >
            <span className="relative z-10 font-bold">КУПИТЬ БИЛЕТ</span>
            <motion.span
              className="absolute inset-0 bg-gradient-to-r from-accent via-accent/80 to-accent"
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              style={{ opacity: 0.3 }}
            />
          </Link>
        </motion.div>
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
