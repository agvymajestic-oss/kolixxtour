import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';

interface City {
  name: string;
  x: number;
  y: number;
  date: string;
}

// Approximate positions on a stylized Russia map (percentage-based)
const cities: City[] = [
  { name: "Санкт-Петербург", x: 18, y: 25, date: "24.01" },
  { name: "Петрозаводск", x: 22, y: 18, date: "26.01" },
  { name: "Москва", x: 24, y: 35, date: "31.01" },
  { name: "Казань", x: 35, y: 38, date: "03.02" },
  { name: "Нижний Новгород", x: 29, y: 36, date: "06.02" },
  { name: "Екатеринбург", x: 45, y: 38, date: "09.02" },
  { name: "Новосибирск", x: 58, y: 42, date: "12.02" },
  { name: "Краснодар", x: 25, y: 55, date: "15.02" },
  { name: "Самара", x: 35, y: 45, date: "18.02" },
];

// Route order for connecting lines
const routeOrder = [0, 1, 2, 4, 3, 5, 6, 8, 7]; // SPB -> Petrozavodsk -> Moscow -> NN -> Kazan -> Ekb -> Novosib -> Samara -> Krasnodar

const TourMapSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredCity, setHoveredCity] = useState<number | null>(null);

  // Generate path for connecting lines
  const generatePath = () => {
    let path = '';
    for (let i = 0; i < routeOrder.length; i++) {
      const city = cities[routeOrder[i]];
      if (i === 0) {
        path += `M ${city.x} ${city.y}`;
      } else {
        path += ` L ${city.x} ${city.y}`;
      }
    }
    return path;
  };

  return (
    <section ref={ref} className="py-16 px-6">
      <p className="section-label">ГЕОГРАФИЯ</p>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 1 }}
        className="relative w-full aspect-[16/10] bg-card/20 border border-border/30 overflow-hidden"
      >
        {/* Background grid */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(to right, hsl(var(--border)) 1px, transparent 1px),
              linear-gradient(to bottom, hsl(var(--border)) 1px, transparent 1px)
            `,
            backgroundSize: '10% 10%'
          }}
        />
        
        {/* SVG Map */}
        <svg 
          viewBox="0 0 100 70" 
          className="absolute inset-0 w-full h-full"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Animated route line */}
          <motion.path
            d={generatePath()}
            fill="none"
            stroke="hsl(var(--muted-foreground))"
            strokeWidth="0.15"
            strokeDasharray="1 0.5"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={isInView ? { pathLength: 1, opacity: 0.4 } : {}}
            transition={{ duration: 3, delay: 0.5, ease: "easeInOut" }}
          />
          
          {/* Glowing route line overlay */}
          <motion.path
            d={generatePath()}
            fill="none"
            stroke="hsl(var(--accent))"
            strokeWidth="0.3"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={isInView ? { pathLength: 1, opacity: 0.6 } : {}}
            transition={{ duration: 3, delay: 0.5, ease: "easeInOut" }}
            style={{ filter: 'blur(2px)' }}
          />

          {/* City points */}
          {cities.map((city, index) => (
            <g key={index}>
              {/* Outer glow */}
              <motion.circle
                cx={city.x}
                cy={city.y}
                r={hoveredCity === index ? 2.5 : 1.5}
                fill="hsl(var(--accent))"
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 0.3, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                style={{ filter: 'blur(3px)' }}
              />
              
              {/* Inner point */}
              <motion.circle
                cx={city.x}
                cy={city.y}
                r={hoveredCity === index ? 1.2 : 0.8}
                fill="hsl(var(--primary))"
                stroke="hsl(var(--accent))"
                strokeWidth="0.2"
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                className="cursor-pointer"
                onMouseEnter={() => setHoveredCity(index)}
                onMouseLeave={() => setHoveredCity(null)}
                style={{ transition: 'r 0.3s ease' }}
              />
              
              {/* Pulse animation */}
              <motion.circle
                cx={city.x}
                cy={city.y}
                r="0.8"
                fill="none"
                stroke="hsl(var(--accent))"
                strokeWidth="0.1"
                initial={{ opacity: 0 }}
                animate={isInView ? { 
                  opacity: [0.5, 0],
                  r: [0.8, 3],
                } : {}}
                transition={{ 
                  duration: 2,
                  delay: 1 + index * 0.15,
                  repeat: Infinity,
                  repeatDelay: 3
                }}
              />
            </g>
          ))}
        </svg>

        {/* City labels */}
        {cities.map((city, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: hoveredCity === index ? 1 : 0.7 } : { opacity: 0 }}
            transition={{ duration: 0.3, delay: 1 + index * 0.1 }}
            className="absolute pointer-events-none"
            style={{
              left: `${city.x}%`,
              top: `${city.y}%`,
              transform: 'translate(-50%, -150%)'
            }}
          >
            <div className={`text-center transition-all duration-300 ${hoveredCity === index ? 'scale-110' : ''}`}>
              <p className="text-[8px] md:text-[10px] font-mono text-primary whitespace-nowrap">
                {city.name.toUpperCase()}
              </p>
              <p className="text-[7px] md:text-[9px] font-mono text-accent-foreground">
                {city.date}
              </p>
            </div>
          </motion.div>
        ))}

        {/* Hover tooltip */}
        {hoveredCity !== null && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-48 p-3 bg-card/90 border border-border/50 backdrop-blur-sm"
          >
            <p className="text-xs font-mono text-primary font-semibold">
              {cities[hoveredCity].name}
            </p>
            <p className="text-[10px] font-mono text-muted-foreground mt-1">
              {cities[hoveredCity].date}.2026
            </p>
          </motion.div>
        )}

        {/* Corner decorations */}
        <div className="absolute top-2 left-2 w-4 h-4 border-l border-t border-border/50" />
        <div className="absolute top-2 right-2 w-4 h-4 border-r border-t border-border/50" />
        <div className="absolute bottom-2 left-2 w-4 h-4 border-l border-b border-border/50" />
        <div className="absolute bottom-2 right-2 w-4 h-4 border-r border-b border-border/50" />
      </motion.div>

      {/* Legend */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 2 }}
        className="mt-4 flex items-center gap-6 text-[10px] font-mono text-muted-foreground"
      >
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-primary border border-accent" />
          <span>ГОРОД</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-px bg-muted-foreground opacity-50" style={{ backgroundImage: 'repeating-linear-gradient(90deg, hsl(var(--muted-foreground)) 0, hsl(var(--muted-foreground)) 3px, transparent 3px, transparent 6px)' }} />
          <span>МАРШРУТ</span>
        </div>
      </motion.div>
    </section>
  );
};

export default TourMapSection;
