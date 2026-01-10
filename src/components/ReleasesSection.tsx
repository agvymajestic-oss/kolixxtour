import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Play } from 'lucide-react';

interface Release {
  title: string;
  imageUrl: string;
  listenUrl: string;
  description: string;
}

const releases: Release[] = [
  {
    title: "Пустые линии",
    imageUrl: "https://i.ibb.co/rGw6FLdH/1000037107.jpg",
    listenUrl: "https://band.link/kolixx",
    description: "«Пустые линии» — трек о ночной пустоте после расставания. Герой пытается дозвониться, держит в руках фото и розы, но остаются только пустые линии, шипы и эхо прошлой любви. Песня о боли утраты, одиночестве и невозможности отпустить."
  },
  {
    title: "Разбиваюсь",
    imageUrl: "https://i.ibb.co/PZS71nDs/1000037303.jpg",
    listenUrl: "https://band.link/HnyKq",
    description: "«Разбиваюсь» — трек, родившийся из состояния, а не из идеи. Без объяснений и приукрашивания. Честный момент, зафиксированный в музыке. Атмосферное звучание и напряжённая эмоция, которая держит до конца. Музыка для тех, кто проживает чувства внутри."
  }
];

const ReleasesSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [60, -40]);

  return (
    <section ref={ref} className="py-16 px-6">
      <motion.div style={{ y }} className="will-change-transform">
        <p className="section-label">РЕЛИЗЫ</p>
        
        <div className="space-y-12">
          {releases.map((release, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1.2, delay: index * 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="group"
            >
              {/* Image */}
              <div className="relative overflow-hidden mb-6">
                <motion.img
                  src={release.imageUrl}
                  alt={release.title}
                  className="w-full aspect-square object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.8 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent pointer-events-none" />
              </div>
              
              {/* Title */}
              <h3 className="font-display text-xl md:text-2xl font-bold text-heading mb-3">
                {release.title}
              </h3>
              
              {/* Description */}
              <p className="text-foreground/80 text-sm leading-relaxed mb-6 font-mono">
                {release.description}
              </p>
              
              {/* Listen button */}
              <a
                href={release.listenUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group/btn inline-flex items-center gap-3 px-6 py-3 border border-border text-sm tracking-widest text-foreground hover:bg-accent hover:text-accent-foreground hover:border-accent transition-all duration-500 font-mono font-medium"
              >
                <Play className="w-4 h-4" />
                СЛУШАТЬ
              </a>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default ReleasesSection;
