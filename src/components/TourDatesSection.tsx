import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Ticket, ArrowRight } from 'lucide-react';

interface TourDate {
  date: string;
  city: string;
}

const tourDates: TourDate[] = [
  { date: "24.01", city: "САНКТ-ПЕТЕРБУРГ" },
  { date: "26.01", city: "ПЕТРОЗАВОДСК" },
  { date: "31.01", city: "МОСКВА" },
  { date: "03.02", city: "КАЗАНЬ" },
  { date: "06.02", city: "НИЖНИЙ НОВГОРОД" },
  { date: "09.02", city: "ЕКАТЕРИНБУРГ" },
  { date: "12.02", city: "НОВОСИБИРСК" },
  { date: "15.02", city: "КРАСНОДАР" },
  { date: "18.02", city: "САМАРА" },
];

const TourDatesSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [40, -20]);

  return (
    <section ref={ref} className="py-16 px-6">
      <motion.div style={{ y }} className="will-change-transform">
        <p className="section-label">ДАТЫ ТУРА</p>
        
        <div className="space-y-0">
          {tourDates.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link
                to="/tickets"
                className="group flex items-center justify-between py-4 border-b border-border/30 hover:bg-accent/10 transition-all duration-500 -mx-4 px-4"
              >
                <div className="flex items-center gap-6">
                  <span className="text-heading font-mono text-sm md:text-base font-bold min-w-[60px]">
                    {item.date}
                  </span>
                  <span className="text-foreground font-mono text-sm md:text-base tracking-wide font-medium">
                    {item.city}
                  </span>
                </div>
                
                <motion.div
                  className="flex items-center gap-2 text-muted-foreground group-hover:text-accent transition-colors duration-300"
                >
                  <span className="text-xs font-mono opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden sm:block">
                    БИЛЕТЫ
                  </span>
                  <Ticket className="w-5 h-5" />
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* CTA after tour dates */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex justify-center"
        >
          <Link
            to="/tickets"
            className="group flex items-center gap-3 px-6 py-3 border-2 border-accent bg-accent/10 text-accent-foreground font-mono text-sm tracking-wider hover:bg-accent hover:text-accent-foreground transition-all duration-500"
          >
            <span className="font-bold">ВЫБРАТЬ ГОРОД</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default TourDatesSection;
