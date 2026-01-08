import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const ManifestSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const lines = [
    "Вне сигнала — это не образ.",
    "Это состояние.",
    "Когда связь потеряна не с миром, а с собой."
  ];

  return (
    <section ref={ref} className="py-16 px-6">
      <p className="section-label">МАНИФЕСТ</p>
      
      <div className="max-w-2xl">
        {lines.map((line, index) => (
          <motion.p
            key={index}
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: index * 0.2 }}
            className="text-lg md:text-xl text-foreground leading-relaxed mb-3 font-mono font-medium"
          >
            {line}
          </motion.p>
        ))}
      </div>
    </section>
  );
};

export default ManifestSection;
