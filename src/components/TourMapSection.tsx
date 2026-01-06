import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

interface City {
  name: string;
  x: number;
  y: number;
  date: string;
  labelOffset: { x: number; y: number }; // Custom offset for each label
}

// Approximate positions on a stylized Russia map with custom label offsets
const cities: City[] = [
  { name: "Санкт-Петербург", x: 15, y: 20, date: "24.01", labelOffset: { x: -8, y: -4 } },
  { name: "Петрозаводск", x: 20, y: 12, date: "26.01", labelOffset: { x: 0, y: -4 } },
  { name: "Москва", x: 22, y: 32, date: "31.01", labelOffset: { x: -10, y: 2 } },
  { name: "Казань", x: 38, y: 30, date: "03.02", labelOffset: { x: 4, y: -3 } },
  { name: "Нижний Новгород", x: 30, y: 28, date: "06.02", labelOffset: { x: 0, y: -4 } },
  { name: "Екатеринбург", x: 50, y: 28, date: "09.02", labelOffset: { x: 4, y: 0 } },
  { name: "Новосибирск", x: 65, y: 38, date: "12.02", labelOffset: { x: 4, y: 0 } },
  { name: "Краснодар", x: 25, y: 52, date: "15.02", labelOffset: { x: 4, y: 2 } },
  { name: "Самара", x: 40, y: 42, date: "18.02", labelOffset: { x: 4, y: 0 } },
];

// Route order for connecting lines
const routeOrder = [0, 1, 2, 4, 3, 5, 6, 8, 7];

const TourMapSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredCity, setHoveredCity] = useState<number | null>(null);
  const [flyingPointProgress, setFlyingPointProgress] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Start flying animation when in view
  useEffect(() => {
    if (isInView && !isAnimating) {
      setIsAnimating(true);
      const duration = 8000; // 8 seconds for full route
      const startTime = Date.now();
      
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        setFlyingPointProgress(progress);
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          // Restart animation after a pause
          setTimeout(() => {
            setFlyingPointProgress(0);
            setIsAnimating(false);
          }, 2000);
        }
      };
      
      setTimeout(() => {
        requestAnimationFrame(animate);
      }, 3500); // Start after route line is drawn
    }
  }, [isInView, isAnimating]);

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

  // Calculate flying point position along the route
  const getFlyingPointPosition = () => {
    if (flyingPointProgress === 0) return null;
    
    const totalSegments = routeOrder.length - 1;
    const currentSegment = Math.min(Math.floor(flyingPointProgress * totalSegments), totalSegments - 1);
    const segmentProgress = (flyingPointProgress * totalSegments) - currentSegment;
    
    const fromCity = cities[routeOrder[currentSegment]];
    const toCity = cities[routeOrder[Math.min(currentSegment + 1, routeOrder.length - 1)]];
    
    return {
      x: fromCity.x + (toCity.x - fromCity.x) * segmentProgress,
      y: fromCity.y + (toCity.y - fromCity.y) * segmentProgress
    };
  };

  const flyingPoint = getFlyingPointPosition();

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

          {/* Flying point along the route */}
          {flyingPoint && (
            <g>
              {/* Glow trail */}
              <circle
                cx={flyingPoint.x}
                cy={flyingPoint.y}
                r="2.5"
                fill="hsl(var(--accent))"
                style={{ filter: 'blur(4px)' }}
                opacity="0.6"
              />
              {/* Main flying point */}
              <circle
                cx={flyingPoint.x}
                cy={flyingPoint.y}
                r="1"
                fill="hsl(var(--primary))"
              />
              {/* Bright center */}
              <circle
                cx={flyingPoint.x}
                cy={flyingPoint.y}
                r="0.4"
                fill="hsl(var(--foreground))"
              />
            </g>
          )}

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

              {/* City label inside SVG */}
              <motion.text
                x={city.x + city.labelOffset.x}
                y={city.y + city.labelOffset.y}
                fill="hsl(var(--primary))"
                fontSize="2.2"
                fontFamily="monospace"
                textAnchor={city.labelOffset.x < 0 ? "end" : city.labelOffset.x > 0 ? "start" : "middle"}
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: hoveredCity === index ? 1 : 0.8 } : { opacity: 0 }}
                transition={{ duration: 0.3, delay: 1 + index * 0.1 }}
                className="pointer-events-none uppercase"
                style={{ fontWeight: hoveredCity === index ? 600 : 400 }}
              >
                {city.name}
              </motion.text>
              <motion.text
                x={city.x + city.labelOffset.x}
                y={city.y + city.labelOffset.y + 2.5}
                fill="hsl(var(--accent))"
                fontSize="1.8"
                fontFamily="monospace"
                textAnchor={city.labelOffset.x < 0 ? "end" : city.labelOffset.x > 0 ? "start" : "middle"}
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: hoveredCity === index ? 1 : 0.6 } : { opacity: 0 }}
                transition={{ duration: 0.3, delay: 1 + index * 0.1 }}
                className="pointer-events-none"
              >
                {city.date}
              </motion.text>
            </g>
          ))}
        </svg>

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
