import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section ref={ref} className="py-24 px-6 flex items-center justify-center">
      <motion.a
        href="https://band.link/koliixmusic"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
        className="px-8 py-4 border border-border text-sm tracking-[0.3em] text-secondary-foreground hover:text-accent-foreground hover:border-accent transition-all duration-300 font-mono"
      >
        ОБ АРТИСТЕ
      </motion.a>
    </section>
  );
};

export default AboutSection;
