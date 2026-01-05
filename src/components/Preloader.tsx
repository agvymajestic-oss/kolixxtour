import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader = ({ onComplete }: PreloaderProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create ambient sound
    audioRef.current = new Audio();
    audioRef.current.volume = 0.15;
    
    // Generate ambient noise using Web Audio API
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    const filter = audioContext.createBiquadFilter();
    
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(80, audioContext.currentTime);
    
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(200, audioContext.currentTime);
    
    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.05, audioContext.currentTime + 0.5);
    
    oscillator.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.start();

    // Progress animation
    const duration = 2500;
    const startTime = Date.now();
    
    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / duration) * 100, 100);
      setProgress(newProgress);
      
      if (newProgress < 100) {
        requestAnimationFrame(updateProgress);
      } else {
        // Fade out audio
        gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.5);
        
        setTimeout(() => {
          oscillator.stop();
          audioContext.close();
          setIsVisible(false);
          setTimeout(onComplete, 500);
        }, 500);
      }
    };
    
    requestAnimationFrame(updateProgress);

    return () => {
      try {
        oscillator.stop();
        audioContext.close();
      } catch (e) {}
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-background"
        >
          {/* Noise overlay */}
          <div className="noise-overlay" />
          
          {/* Vignette */}
          <div className="vignette" />
          
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative"
          >
            <h1 className="font-display text-4xl md:text-6xl font-bold tracking-wider text-primary">
              KOLIXX
            </h1>
            
            {/* Glitch effect overlay */}
            <motion.div
              animate={{
                x: [0, -2, 2, 0],
                opacity: [0, 0.5, 0.5, 0],
              }}
              transition={{
                duration: 0.15,
                repeat: Infinity,
                repeatDelay: 2,
              }}
              className="absolute inset-0 text-4xl md:text-6xl font-bold tracking-wider font-display text-accent opacity-50"
              style={{ clipPath: 'inset(40% 0 40% 0)' }}
            >
              KOLIXX
            </motion.div>
          </motion.div>
          
          {/* Progress bar */}
          <div className="mt-12 w-48 h-px bg-muted overflow-hidden">
            <motion.div
              className="h-full bg-muted-foreground"
              style={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>
          
          {/* Loading text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ delay: 0.5 }}
            className="mt-4 text-xs tracking-[0.3em] text-muted-foreground font-mono"
          >
            ЗАГРУЗКА
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
