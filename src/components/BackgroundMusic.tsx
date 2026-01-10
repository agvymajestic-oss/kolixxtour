import { useState, useRef, useEffect, useCallback, memo } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

const BackgroundMusic = memo(() => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const handleFirstInteraction = useCallback(() => {
    if (!hasInteracted && audioRef.current) {
      setHasInteracted(true);
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  }, [hasInteracted]);

  useEffect(() => {
    const timeout = setTimeout(() => setIsVisible(true), 2000);
    
    const events = ['click', 'touchstart', 'keydown'];
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

  const togglePlay = useCallback(() => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  }, [isPlaying]);

  if (!isVisible) return null;

  return (
    <>
      <audio
        ref={audioRef}
        src="/audio/background-music.mp3"
        loop
        preload="auto"
      />
      
      <button
        onClick={togglePlay}
        className="fixed bottom-6 right-6 z-[100] w-10 h-10 flex items-center justify-center bg-card/80 border border-border/50 hover:border-accent/50 backdrop-blur-sm transition-colors duration-300 will-change-transform"
        aria-label={isPlaying ? 'Выключить музыку' : 'Включить музыку'}
        style={{ transform: 'translateZ(0)' }}
      >
        {isPlaying ? (
          <Volume2 className="w-4 h-4 text-accent" />
        ) : (
          <VolumeX className="w-4 h-4 text-muted-foreground" />
        )}
      </button>
    </>
  );
});

BackgroundMusic.displayName = 'BackgroundMusic';

export default BackgroundMusic;
