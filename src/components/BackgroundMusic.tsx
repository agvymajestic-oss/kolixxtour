import { useState, useRef, useEffect, useCallback } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { motion } from 'framer-motion';

const BackgroundMusic = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Try to autoplay on first user interaction
  const handleFirstInteraction = useCallback(() => {
    if (!hasInteracted && audioRef.current) {
      setHasInteracted(true);
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  }, [hasInteracted]);

  useEffect(() => {
    // Show button after a delay
    const timeout = setTimeout(() => setIsVisible(true), 2000);
    
    // Listen for any user interaction to try autoplay
    const events = ['click', 'touchstart', 'keydown', 'scroll'];
    events.forEach(event => {
      document.addEventListener(event, handleFirstInteraction, { once: true, passive: true });
    });

    return () => {
      clearTimeout(timeout);
      events.forEach(event => {
        document.removeEventListener(event, handleFirstInteraction);
      });
    };
  }, [handleFirstInteraction]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src="/audio/background-music.mp3"
        loop
        preload="auto"
      />
      
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ 
          opacity: isVisible ? 1 : 0, 
          scale: isVisible ? 1 : 0.8 
        }}
        transition={{ duration: 0.3 }}
        onClick={togglePlay}
        className="fixed bottom-6 right-6 z-[100] w-10 h-10 flex items-center justify-center bg-card/80 border border-border/50 hover:border-accent/50 backdrop-blur-sm transition-colors duration-300"
        aria-label={isPlaying ? 'Выключить музыку' : 'Включить музыку'}
      >
        {isPlaying ? (
          <Volume2 className="w-4 h-4 text-accent" />
        ) : (
          <VolumeX className="w-4 h-4 text-muted-foreground" />
        )}
      </motion.button>
    </>
  );
};

export default BackgroundMusic;
