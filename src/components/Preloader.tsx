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
          style={{ 
            // Prevent any layout shift during preloader
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
             width: '100vw',
             height: '100svh',
             overflow: 'hidden'
          }}
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
            style={{ willChange: 'transform, opacity' }}
          >
            <h1 className="font-display text-4xl md:text-6xl font-black tracking-wider text-heading">
              KOLIXX
            </h1>
            
            {/* Glitch effect overlay - use transform only */}
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
              style={{ 
                clipPath: 'inset(40% 0 40% 0)',
                willChange: 'transform, opacity'
              }}
            >
              KOLIXX
            </motion.div>
          </motion.div>
          
          {/* Progress bar - fixed height */}
          <div 
            className="mt-12 w-48 bg-muted overflow-hidden"
            style={{ height: '1px' }}
          >
            <motion.div
              className="h-full bg-foreground/60"
              style={{ width: `${progress}%`, willChange: 'width' }}
              transition={{ duration: 0.1 }}
            />
          </div>
          
          {/* Loading text - fixed height */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ delay: 0.5 }}
            className="mt-4 text-xs tracking-[0.3em] text-foreground/60 font-mono font-medium"
            style={{ minHeight: '1.5em' }}
          >
            ЗАГРУЗКА
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
