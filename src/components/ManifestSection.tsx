import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const ManifestSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const lines = [
    "Вне сигнала — это не образ.",
    "Это состояние.",
    "Когда связь потеряна не с миром, а с собой.",
  ];

  return (
    <section ref={ref} className="py-16 px-6">
      <div>
        <p className="section-label">МАНИФЕСТ</p>

        <div className="max-w-2xl">
          {lines.map((line, index) => (
            <motion.p
              key={index}
              initial={{ opacity: 0, y: 25 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1.2, delay: index * 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="text-lg md:text-xl text-foreground leading-relaxed mb-3 font-mono font-medium"
            >
              {line}
            </motion.p>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ManifestSection;

