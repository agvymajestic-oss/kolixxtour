import { memo, useMemo } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

type Snowflake = {
  id: number;
  delay: number;
  duration: number;
  x: number;
  size: number;
  drift: number;
  driftDuration: number;
};

const Snowfall = memo(() => {
  const isMobile = useIsMobile();

  // Keep DOM light on mobile + avoid JS-driven animations (no framer-motion here)
  const count = isMobile ? 10 : 24;

  const snowflakes = useMemo<Snowflake[]>(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        delay: i * 0.25,
        duration: 10 + Math.random() * 10,
        x: Math.random() * 100,
        size: 2 + Math.random() * 4,
        drift: (Math.random() * 2 - 1) * 24,
        driftDuration: 3 + Math.random() * 3,
      })),
    [count]
  );

  return (
    <div className="snowfall fixed inset-0 overflow-hidden pointer-events-none z-10" aria-hidden="true">
      {snowflakes.map((flake) => (
        <span
          key={flake.id}
          className="snowflake"
          style={{
            left: `${flake.x}%`,
            animationDelay: `${flake.delay}s`,
            animationDuration: `${flake.duration}s`,
          }}
        >
          <span
            className="snowflake-inner"
            style={{
              width: flake.size,
              height: flake.size,
            ...( { ['--drift' as any]: `${flake.drift}px` } as any ),
              animationDuration: `${flake.driftDuration}s`,
              filter: `blur(${flake.size > 4 ? 2 : 1}px)`,
            }}
          />
        </span>
      ))}
    </div>
  );
});

Snowfall.displayName = 'Snowfall';

export default Snowfall;

