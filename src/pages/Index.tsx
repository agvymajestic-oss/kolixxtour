import { useState } from 'react';
import Preloader from '@/components/Preloader';
import Snowfall from '@/components/Snowfall';
import HeroSection from '@/components/HeroSection';
import ManifestSection from '@/components/ManifestSection';
import TourDatesSection from '@/components/TourDatesSection';
import TourMapSection from '@/components/TourMapSection';
import ReleasesSection from '@/components/ReleasesSection';
import MerchSection from '@/components/MerchSection';
import AboutSection from '@/components/AboutSection';
import Footer from '@/components/Footer';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
      
      {/* Global snowfall */}
      <Snowfall />
      
      {/* Noise overlay */}
      <div className="noise-overlay" />
      
      {/* Vignette */}
      <div className="vignette" />
      
      <main className={`min-h-screen bg-background transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        <div className="max-w-3xl mx-auto">
          <HeroSection />
          <ManifestSection />
          <TourDatesSection />
          <TourMapSection />
          <ReleasesSection />
          <MerchSection />
          <AboutSection />
          <Footer />
        </div>
      </main>
    </>
  );
};

export default Index;
