import { useState, useEffect, useMemo, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

// Target date: January 20, 2026 at 12:00:00 Moscow time
const TARGET_DATE = new Date('2026-01-20T12:00:00+03:00').getTime();

interface TimeUnit {
  value: number;
  label: string;
}

// Optimized digit component with sliding animation
const AnimatedDigit = memo(({ digit, prevDigit }: { digit: string; prevDigit: string }) => {
  const hasChanged = digit !== prevDigit;
  
  return (
    <span className="inline-block relative overflow-hidden h-[1.2em]">
      <AnimatePresence mode="popLayout">
        <motion.span
          key={digit}
          initial={hasChanged ? { y: '100%', opacity: 0, filter: 'blur(4px)' } : false}
          animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
          exit={{ y: '-100%', opacity: 0, filter: 'blur(4px)' }}
          transition={{ 
            duration: 0.4, 
            ease: [0.16, 1, 0.3, 1]
          }}
          className="inline-block"
        >
          {digit}
        </motion.span>
      </AnimatePresence>
    </span>
  );
});

AnimatedDigit.displayName = 'AnimatedDigit';

// Animated number with proper digit handling
const AnimatedNumber = memo(({ value, minDigits = 2 }: { value: number; minDigits?: number }) => {
  const [prevValue, setPrevValue] = useState(value);
  const currentStr = String(value).padStart(minDigits, '0');
  const prevStr = String(prevValue).padStart(minDigits, '0');
  
  useEffect(() => {
    const timeout = setTimeout(() => setPrevValue(value), 50);
    return () => clearTimeout(timeout);
  }, [value]);
  
  return (
    <span className="inline-flex font-display font-bold text-primary tabular-nums">
      {currentStr.split('').map((digit, index) => (
        <AnimatedDigit 
          key={index} 
          digit={digit} 
          prevDigit={prevStr[index] || '0'} 
        />
      ))}
    </span>
  );
});

AnimatedNumber.displayName = 'AnimatedNumber';

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState<TimeUnit[]>([]);
  const [isExpired, setIsExpired] = useState(false);
  const [showButton, setShowButton] = useState(false);

  const calculateTimeLeft = useMemo(() => {
    return () => {
      const now = Date.now();
      const difference = TARGET_DATE - now;

      if (difference <= 0) {
        return null;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      // Russian pluralization
      const getDaysLabel = (n: number) => {
        const lastTwo = n % 100;
        const lastOne = n % 10;
        if (lastTwo >= 11 && lastTwo <= 14) return 'дней';
        if (lastOne === 1) return 'день';
        if (lastOne >= 2 && lastOne <= 4) return 'дня';
        return 'дней';
      };

      const getHoursLabel = (n: number) => {
        const lastTwo = n % 100;
        const lastOne = n % 10;
        if (lastTwo >= 11 && lastTwo <= 14) return 'часов';
        if (lastOne === 1) return 'час';
        if (lastOne >= 2 && lastOne <= 4) return 'часа';
        return 'часов';
      };

      const getMinutesLabel = (n: number) => {
        const lastTwo = n % 100;
        const lastOne = n % 10;
        if (lastTwo >= 11 && lastTwo <= 14) return 'минут';
        if (lastOne === 1) return 'минута';
        if (lastOne >= 2 && lastOne <= 4) return 'минуты';
        return 'минут';
      };

      const getSecondsLabel = (n: number) => {
        const lastTwo = n % 100;
        const lastOne = n % 10;
        if (lastTwo >= 11 && lastTwo <= 14) return 'секунд';
        if (lastOne === 1) return 'секунда';
        if (lastOne >= 2 && lastOne <= 4) return 'секунды';
        return 'секунд';
      };

      return [
        { value: days, label: getDaysLabel(days) },
        { value: hours, label: getHoursLabel(hours) },
        { value: minutes, label: getMinutesLabel(minutes) },
        { value: seconds, label: getSecondsLabel(seconds) },
      ];
    };
  }, []);

  useEffect(() => {
    const updateTimer = () => {
      const result = calculateTimeLeft();
      if (result === null) {
        setIsExpired(true);
        setTimeout(() => setShowButton(true), 600);
      } else {
        setTimeLeft(result);
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [calculateTimeLeft]);

  if (isExpired) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center gap-6 py-8"
      >
        <div className="glass-card rounded-2xl p-6 md:p-8 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-display text-lg md:text-2xl font-bold text-heading tracking-wide mb-4"
          >
            ПРОДАЖА БИЛЕТОВ ОТКРЫТА
          </motion.p>
          
          <AnimatePresence>
            {showButton && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link
                  to="/tickets"
                  className="group relative inline-flex items-center gap-3 px-8 py-4 glass-button rounded-xl font-mono text-sm tracking-wider"
                >
                  <motion.span
                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-accent/20 to-transparent"
                    animate={{ x: ['-200%', '200%'] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
                  />
                  <span className="relative z-10 font-bold text-heading">КУПИТЬ БИЛЕТ</span>
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="py-8"
    >
      <div className="glass-card rounded-2xl p-6 md:p-8 mx-auto max-w-lg">
        <p className="section-label text-center mb-4">ДО НАЧАЛА ПРОДАЖ</p>
        
        <div className="flex flex-wrap justify-center items-baseline gap-x-2 md:gap-x-3 text-base sm:text-lg md:text-2xl lg:text-3xl">
          <span className="font-mono text-muted-foreground text-[0.6em]">Осталось</span>
          
          {timeLeft.map((unit, index) => (
            <span key={index} className="inline-flex items-baseline whitespace-nowrap">
              <AnimatedNumber 
                value={unit.value} 
                minDigits={index === 0 ? 1 : 2} 
              />
              <span className="font-mono text-muted-foreground text-[0.5em] ml-1">
                {unit.label}
              </span>
            </span>
          ))}
        </div>

        <p className="text-center text-xs font-mono text-muted-foreground/70 mt-4">
          Подпишись, чтобы не пропустить
        </p>
      </div>
    </motion.div>
  );
};

export default CountdownTimer;
