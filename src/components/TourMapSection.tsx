import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

interface City {
  name: string;
  coordinates: [number, number];
  date: string;
}

const cities: City[] = [
  { name: "Санкт-Петербург", coordinates: [30.3351, 59.9343], date: "24.01" },
  { name: "Петрозаводск", coordinates: [34.3477, 61.7849], date: "26.01" },
  { name: "Москва", coordinates: [37.6173, 55.7558], date: "31.01" },
  { name: "Казань", coordinates: [49.1221, 55.7887], date: "03.02" },
  { name: "Нижний Новгород", coordinates: [43.9361, 56.2965], date: "06.02" },
  { name: "Екатеринбург", coordinates: [60.6122, 56.8389], date: "09.02" },
  { name: "Новосибирск", coordinates: [82.9346, 55.0084], date: "12.02" },
  { name: "Краснодар", coordinates: [38.9760, 45.0355], date: "15.02" },
  { name: "Самара", coordinates: [50.1500, 53.2001], date: "18.02" },
];

const TourMapSection = () => {
  const ref = useRef(null);
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [mapboxToken, setMapboxToken] = useState<string>('');
  const [showTokenInput, setShowTokenInput] = useState(true);

  useEffect(() => {
    if (!mapContainer.current || !mapboxToken || !isInView) return;

    mapboxgl.accessToken = mapboxToken;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: [50, 56],
      zoom: 3,
      pitch: 0,
      interactive: true,
    });

    map.current.on('load', () => {
      // Add markers for each city
      cities.forEach((city) => {
        // Create custom marker element
        const markerEl = document.createElement('div');
        markerEl.className = 'custom-marker';
        markerEl.innerHTML = `
          <div style="
            width: 12px;
            height: 12px;
            background: hsl(0 45% 20%);
            border: 2px solid hsl(0 0% 75%);
            border-radius: 50%;
            cursor: pointer;
            transition: transform 0.3s ease;
          "></div>
        `;
        
        markerEl.addEventListener('mouseenter', () => {
          markerEl.querySelector('div')!.style.transform = 'scale(1.5)';
        });
        
        markerEl.addEventListener('mouseleave', () => {
          markerEl.querySelector('div')!.style.transform = 'scale(1)';
        });

        // Create popup
        const popup = new mapboxgl.Popup({
          offset: 15,
          closeButton: false,
          className: 'custom-popup',
        }).setHTML(`
          <div style="
            background: hsl(0 0% 6%);
            padding: 12px 16px;
            font-family: 'JetBrains Mono', monospace;
            border: 1px solid hsl(0 0% 15%);
          ">
            <p style="color: hsl(0 0% 75%); font-size: 12px; margin: 0 0 4px 0; letter-spacing: 0.1em;">
              ${city.date}
            </p>
            <p style="color: hsl(0 0% 85%); font-size: 14px; margin: 0; font-weight: 500;">
              ${city.name}
            </p>
          </div>
        `);

        new mapboxgl.Marker(markerEl)
          .setLngLat(city.coordinates)
          .setPopup(popup)
          .addTo(map.current!);
      });
    });

    return () => {
      map.current?.remove();
    };
  }, [mapboxToken, isInView]);

  return (
    <section ref={ref} className="py-16 px-6">
      <p className="section-label">КАРТА ТУРА</p>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
        className="relative"
      >
        {showTokenInput && !mapboxToken && (
          <div className="mb-6 p-4 border border-border/50 bg-card/30">
            <p className="text-xs text-muted-foreground mb-3 font-mono">
              Введите Mapbox public token для отображения карты:
            </p>
            <input
              type="text"
              placeholder="pk.eyJ..."
              className="w-full bg-muted/30 border border-border px-4 py-2 text-sm font-mono text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  const value = (e.target as HTMLInputElement).value;
                  if (value.startsWith('pk.')) {
                    setMapboxToken(value);
                    setShowTokenInput(false);
                  }
                }
              }}
            />
            <p className="text-xs text-muted-foreground/50 mt-2 font-mono">
              Получите токен на mapbox.com → Tokens
            </p>
          </div>
        )}
        
        <div 
          ref={mapContainer} 
          className="w-full aspect-[16/10] bg-muted/20"
          style={{ display: mapboxToken ? 'block' : 'none' }}
        />
        
        {!mapboxToken && (
          <div className="w-full aspect-[16/10] bg-muted/10 flex items-center justify-center border border-border/30">
            <div className="text-center">
              <p className="text-muted-foreground/50 text-sm font-mono">
                9 городов
              </p>
              <p className="text-muted-foreground/30 text-xs font-mono mt-1">
                Январь — Февраль 2026
              </p>
            </div>
          </div>
        )}
      </motion.div>
    </section>
  );
};

export default TourMapSection;
