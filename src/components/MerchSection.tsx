import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { X } from 'lucide-react';

// Import merch images
import merchTshirt from '@/assets/merch-tshirt.jpg';
import merchPoster from '@/assets/merch-poster.jpg';
import merchVinyl from '@/assets/merch-vinyl.jpg';
import merchAutograph from '@/assets/merch-autograph.jpg';

interface MerchItem {
  title: string;
  subtitle: string;
  image: string;
  description: string;
}

const merchItems: MerchItem[] = [
  { 
    title: "ФУТБОЛКА «ВНЕ СИГНАЛА»", 
    subtitle: "лимитированный дроп", 
    image: merchTshirt,
    description: "Эксклюзивная футболка из коллекции тура 2026. Высококачественный хлопок, уникальный дизайн. Доступна в размерах S-XXL."
  },
  { 
    title: "ПОСТЕР ТУРА 2026", 
    subtitle: "оригинальная афиша", 
    image: merchPoster,
    description: "Оригинальный постер тура в высоком разрешении. Размер 50x70 см, плотная матовая бумага."
  },
  { 
    title: "ВИНИЛ", 
    subtitle: "ограниченный тираж", 
    image: merchVinyl,
    description: "Коллекционное виниловое издание альбома. Ограниченный тираж 500 копий. Включает буклет с эксклюзивными фотографиями."
  },
  { 
    title: "АВТОГРАФ", 
    subtitle: "подписанная карточка", 
    image: merchAutograph,
    description: "Карточка с личным автографом артиста. Каждая карточка уникальна и подписана вручную."
  },
];

const MerchSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [selectedItem, setSelectedItem] = useState<MerchItem | null>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [50, -30]);

  return (
    <>
      <section ref={ref} className="py-16 px-6">
        <motion.div style={{ y }} className="will-change-transform">
          <p className="section-label">МЕРЧ</p>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 0.8 } : {}}
            transition={{ duration: 1 }}
            className="text-xs text-foreground/70 mb-8 font-mono font-medium"
          >
            Мерч доступен только на концертах тура.
          </motion.p>
          
          <div className="space-y-4">
            {merchItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 1.2, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="group block p-6 border border-border/50 bg-card/30 hover:bg-card/60 transition-all duration-500"
              >
                {/* Product image */}
                <div className="w-full aspect-[4/3] mb-4 overflow-hidden relative">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                
                {/* Title */}
                <h4 className="font-mono text-sm text-heading mb-1 tracking-wide font-bold">
                  {item.title}
                </h4>
                
                {/* Subtitle */}
                <p className="text-xs text-foreground/60 font-mono mb-4 font-medium">
                  {item.subtitle}
                </p>
                
                {/* Button */}
                <button 
                  onClick={() => setSelectedItem(item)}
                  className="inline-block text-xs tracking-widest text-foreground border-b border-border group-hover:border-accent-foreground group-hover:text-heading transition-colors duration-300 pb-1 font-mono cursor-pointer bg-transparent font-medium"
                >
                  СМОТРЕТЬ
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Product Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/95 backdrop-blur-sm"
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-lg bg-card border border-border p-6 max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors z-10"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Product image */}
              <div className="w-full aspect-[4/3] mb-6 overflow-hidden">
                <img 
                  src={selectedItem.image} 
                  alt={selectedItem.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Product title */}
              <h3 className="font-mono text-lg text-heading mb-2 tracking-wide font-bold">
                {selectedItem.title}
              </h3>

              {/* Product subtitle */}
              <p className="text-xs text-foreground/60 font-mono mb-4 uppercase tracking-wider font-medium">
                {selectedItem.subtitle}
              </p>

              {/* Product description */}
              <p className="text-sm text-foreground leading-relaxed mb-6 font-mono">
                {selectedItem.description}
              </p>

              {/* Important notice */}
              <div className="p-4 bg-muted/20 border border-border/50">
                <p className="text-sm text-foreground font-bold font-mono text-center">
                  МЕРЧ ПРОДАЁТСЯ ТОЛЬКО НА КОНЦЕРТАХ
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MerchSection;
