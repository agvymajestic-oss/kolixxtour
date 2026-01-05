import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

interface MerchItem {
  title: string;
  subtitle: string;
  url: string;
}

const merchItems: MerchItem[] = [
  { title: "ФУТБОЛКА «ВНЕ СИГНАЛА»", subtitle: "лимитированный дроп", url: "#" },
  { title: "ПОСТЕР ТУРА 2026", subtitle: "оригинальная афиша", url: "#" },
  { title: "ВИНИЛ", subtitle: "ограниченный тираж", url: "#" },
  { title: "АВТОГРАФ", subtitle: "подписанная карточка", url: "#" },
];

const MerchSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section ref={ref} className="py-16 px-6">
      <p className="section-label">МЕРЧ</p>
      
      <motion.p
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 0.5 } : {}}
        transition={{ duration: 0.6 }}
        className="text-xs text-muted-foreground mb-8 font-mono"
      >
        Мерч доступен только на концертах тура.
      </motion.p>
      
      <div className="space-y-4">
        {merchItems.map((item, index) => (
          <motion.a
            key={index}
            href={item.url}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="group block p-6 border border-border/50 bg-card/30 hover:bg-card/60 transition-all duration-500"
          >
            {/* Placeholder image */}
            <div className="w-full aspect-[4/3] bg-muted/30 mb-4 flex items-center justify-center overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-br from-muted/20 to-muted/40" />
              <span className="text-muted-foreground/30 text-xs font-mono tracking-widest">
                СКОРО
              </span>
            </div>
            
            {/* Title */}
            <h4 className="font-mono text-sm text-foreground mb-1 tracking-wide">
              {item.title}
            </h4>
            
            {/* Subtitle */}
            <p className="text-xs text-muted-foreground font-mono mb-4">
              {item.subtitle}
            </p>
            
            {/* Button */}
            <span className="inline-block text-xs tracking-widest text-secondary-foreground border-b border-border group-hover:border-accent-foreground group-hover:text-accent-foreground transition-colors duration-300 pb-1 font-mono">
              СМОТРЕТЬ
            </span>
          </motion.a>
        ))}
      </div>
    </section>
  );
};

export default MerchSection;
