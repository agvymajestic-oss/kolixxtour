import { useState, useEffect } from 'react';
import Preloader from '@/components/Preloader';
import Snowfall from '@/components/Snowfall';
import CountdownTimer from '@/components/CountdownTimer';
import HeroSection from '@/components/HeroSection';
import ManifestSection from '@/components/ManifestSection';
import TourDatesSection from '@/components/TourDatesSection';
import TourMapSection from '@/components/TourMapSection';
import ReleasesSection from '@/components/ReleasesSection';
import MerchSection from '@/components/MerchSection';
import AboutSection from '@/components/AboutSection';
import Footer from '@/components/Footer';
import FloatingCTA from '@/components/FloatingCTA';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  // Skip preloader if coming from tickets page
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('skip') === '1') {
      setIsLoading(false);
      // Clean up URL
      window.history.replaceState({}, '', '/');
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
      
      {/* Global snowfall - only render after preloader */}
      {!isLoading && <Snowfall />}
      
      {/* Noise overlay (kept below fixed controls to avoid flicker) */}
      <div className="noise-overlay-site" />

      {/* Vignette (kept below fixed controls to avoid flicker) */}
      <div className="vignette-site" />
      
      {/* Floating CTA - only render after preloader */}
      {!isLoading && <FloatingCTA />}
      
      <main 
        className={`transition-opacity duration-500 ${isLoading ? 'opacity-0 invisible' : 'opacity-100 visible'}`}
        style={{ minHeight: '100vh' }}
      >
        <div className="max-w-3xl mx-auto">
          <HeroSection />
          <CountdownTimer />
          <ManifestSection />
          <TourDatesSection />
          <TourMapSection />
          <ReleasesSection />
          <MerchSection />
          <AboutSection />
          <Footer />
        </div>
      </main>
    </div>
  );
};

export default Index;
