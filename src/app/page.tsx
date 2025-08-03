'use client';

import Navigation from '@/components/ui/navigation';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import SkillsSection from '@/components/sections/SkillsSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import ContactSection from '@/components/sections/ContactSection';
import Footer from '@/components/ui/Footer';
import SmoothScrollProvider from '@/components/ui/SmoothScrollProvider';
import LoadingScreen from '@/components/ui/LoadingScreen';

export default function Home() {
  return (
    <>
      <LoadingScreen />
      <SmoothScrollProvider>
        <div className="min-h-screen bg-black text-white">
          <Navigation />
          <main>
            <HeroSection />
            <AboutSection />
            <SkillsSection />
            <ProjectsSection />
            <ContactSection />
          </main>
          <Footer />
        </div>
      </SmoothScrollProvider>
    </>
  );
}
