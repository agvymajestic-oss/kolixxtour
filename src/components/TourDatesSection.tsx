import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Ticket } from 'lucide-react';

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
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section ref={ref} className="py-16 px-6">
      <p className="section-label">ДАТЫ ТУРА</p>
      
      <div className="space-y-0">
        {tourDates.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.08 }}
          >
            <Link
              to="/tickets"
              className="group flex items-center justify-between py-4 border-b border-border/30 hover:bg-muted/20 transition-colors duration-300 -mx-4 px-4"
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
                whileHover={{ scale: 1.1 }}
                className="text-muted-foreground group-hover:text-accent-foreground transition-colors duration-300"
              >
                <Ticket className="w-5 h-5" />
              </motion.div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default TourDatesSection;
