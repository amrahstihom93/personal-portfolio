import { X, Menu, ArrowUp } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';
'use client';

import { useState, useEffect } from 'react';
import { useScroll, useMotionValueEvent } from 'framer-motion';
import { motion } from 'framer-motion';
import { Home, User, Code, Briefcase, Mail, Zap } from 'lucide-react';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home'); // Ensure it starts with 'home'
  const [hidden, setHidden] = useState(false); // Added missing hidden state
  const { scrollY, scrollYProgress } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
    setScrolled(latest > 50);
    
    // Immediate home section detection for better responsiveness
    if (latest < 100 && activeSection !== 'home') {
      setActiveSection('home');
      console.log('Quick home detection at scroll:', latest);
    }
  });

  useEffect(() => {
    // Use Intersection Observer for more accurate section detection
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -20% 0px', // Better margins for detection
      threshold: [0.1, 0.3, 0.5, 0.7]
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      // Get all intersecting entries and find the one with highest intersection ratio
      const intersectingEntries = entries.filter(entry => entry.isIntersecting);
      
      if (intersectingEntries.length > 0) {
        // Sort by intersection ratio and get the most visible
        const mostVisible = intersectingEntries.reduce((prev, current) => 
          current.intersectionRatio > prev.intersectionRatio ? current : prev
        );
        
        const newActiveSection = mostVisible.target.id;
        
        if (newActiveSection !== activeSection) {
          setActiveSection(newActiveSection);
          console.log('Section changed to:', newActiveSection, 'with ratio:', mostVisible.intersectionRatio);
        }
      }
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    // Observe all sections
    const sections = ['home', 'about', 'skills', 'projects', 'contact'];
    sections.forEach((sectionId) => {
      const element = document.getElementById(sectionId);
      if (element) {
        observer.observe(element);
      }
    });

    // Enhanced scroll position handling
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      
      // Force home section when at very top
      if (scrollPosition < 50) {
        if (activeSection !== 'home') {
          setActiveSection('home');
          console.log('Forced home section at top');
        }
        return;
      }
      
      // Check each section's position
      const sections = ['home', 'about', 'skills', 'projects', 'contact'];
      let currentSection = 'home';
      
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          const elementTop = rect.top + scrollPosition;
          const elementHeight = rect.height;
          
          // If we're past the section start and within the section
          if (scrollPosition >= elementTop - 200 && scrollPosition < elementTop + elementHeight - 200) {
            currentSection = sectionId;
          }
        }
      }
      
      if (currentSection !== activeSection) {
        setActiveSection(currentSection);
        console.log('Scroll detected section:', currentSection);
      }
    };

    // Add scroll listener with throttling
    let scrollTimeout: NodeJS.Timeout | null = null;
    const throttledScroll = () => {
      if (scrollTimeout) clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(handleScroll, 10);
    };

    window.addEventListener('scroll', throttledScroll, { passive: true });
    
    // Initial check
    handleScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', throttledScroll);
      if (scrollTimeout) clearTimeout(scrollTimeout);
    };
  }, [activeSection]); // Include activeSection in dependency array

  // Liquid Glass Crystal navigation styles
  const getNavStyle = () => {
    switch (activeSection) {
      case 'about':
        return {
          bg: scrolled 
            ? 'bg-gradient-to-r from-gray-900/20 via-gray-800/30 to-gray-900/20 backdrop-blur-2xl border border-white/20 shadow-2xl shadow-white/10' 
            : 'bg-gradient-to-r from-gray-900/15 via-gray-800/25 to-gray-900/15 backdrop-blur-xl border border-white/15',
          text: 'text-white',
          style: 'gosavi-dark'
        };
      default:
        return {
          bg: scrolled 
            ? 'bg-gradient-to-r from-white/25 via-white/35 to-white/25 backdrop-blur-2xl border border-white/40 shadow-2xl shadow-blue-500/10' 
            : 'bg-gradient-to-r from-white/20 via-white/30 to-white/20 backdrop-blur-xl border border-white/30',
          text: 'text-gray-900',
          style: 'clean'
        };
    }
  };

  const navStyle = getNavStyle();
  
  // Debug log with more details
  console.log('Current active section:', activeSection, 'Nav style:', navStyle.style, 'Scroll Y:', typeof window !== 'undefined' ? window.scrollY : 0);

  const navItems = [
    { name: 'Home', href: '#home', icon: Home, id: 'home' },
    { name: 'About', href: '#about', icon: User, id: 'about' },
    { name: 'Skills', href: '#skills', icon: Code, id: 'skills' },
    { name: 'Projects', href: '#projects', icon: Briefcase, id: 'projects' },
    { name: 'Contact', href: '#contact', icon: Mail, id: 'contact' },
  ];

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Liquid Glass Crystal Navigation Plate */}
      <motion.nav
        key={activeSection}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`fixed top-0 w-full z-50 transition-all duration-700 ${navStyle.bg}`}
        style={{ 
          backdropFilter: 'blur(20px)',
          transform: 'translateZ(0)',
          background: navStyle.style === 'gosavi-dark' 
            ? 'linear-gradient(135deg, rgba(31,41,55,0.1) 0%, rgba(55,65,81,0.2) 50%, rgba(31,41,55,0.1) 100%)'
            : 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.25) 50%, rgba(255,255,255,0.15) 100%)',
          boxShadow: navStyle.style === 'gosavi-dark'
            ? '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1), inset 0 -1px 0 rgba(0,0,0,0.2)'
            : '0 8px 32px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.3), inset 0 -1px 0 rgba(0,0,0,0.1)',
          borderImage: navStyle.style === 'gosavi-dark'
            ? 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent) 1'
            : 'linear-gradient(90deg, transparent, rgba(59,130,246,0.2), transparent) 1'
        }}
      >
        {/* Liquid Glass Reflection Effect */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            background: navStyle.style === 'gosavi-dark'
              ? 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1), transparent 50%), radial-gradient(circle at 80% 50%, rgba(255,255,255,0.05), transparent 50%)'
              : 'radial-gradient(circle at 20% 50%, rgba(59,130,246,0.1), transparent 50%), radial-gradient(circle at 80% 50%, rgba(99,102,241,0.08), transparent 50%)'
          }}
        />
        
        {/* Crystal Texture Overlay */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)',
            mixBlendMode: 'overlay'
          }}
        />
        <div className="max-w-8xl mx-auto px-8 lg:px-16">
          <div className={`flex justify-between items-center ${navStyle.style === 'clean' ? 'py-8 lg:py-10' : 'py-7 lg:py-10'}`}>
            {/* Modern Logo */}
            <motion.div
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
              onClick={scrollToTop}
              className="cursor-pointer z-50 flex items-center space-x-4"
            >
              {navStyle.style === 'gosavi-dark' ? (
                // Liquid Glass Dark Logo
                <div className="flex items-center space-x-4 px-6 py-3.5 bg-gradient-to-r from-white/10 via-white/20 to-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-xl shadow-white/5">
                  <div className="w-10 h-px bg-gradient-to-r from-transparent via-white to-transparent shadow-lg" />
                  <div className="flex flex-col">
                    <span className="text-lg font-light tracking-[0.2em] uppercase text-white/95 drop-shadow-lg">
                      Portfolio
                    </span>
                    <span className="text-sm font-mono text-white/60 tracking-[0.1em]">
                      {activeSection}
                    </span>
                  </div>
                </div>
              ) : (
                // Liquid Glass Clean Logo
                <div className="flex items-center space-x-4 px-6 py-3.5 bg-gradient-to-r from-white/30 via-white/50 to-white/30 backdrop-blur-xl border border-white/40 rounded-3xl shadow-xl shadow-blue-500/10">
                  <div className="p-3 bg-gradient-to-br from-gray-900/90 via-gray-800/80 to-gray-900/90 backdrop-blur-sm rounded-xl shadow-lg border border-white/20">
                    <Zap className="w-5 h-5 text-white drop-shadow-lg" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xl font-medium text-gray-900/90 drop-shadow-sm">
                      Portfolio
                    </span>
                  </div>
                </div>
              )}
            </motion.div>

            {/* Crystal Clear Glass Slab Menu */}
            <div className="hidden lg:flex items-center space-x-16">
              {navItems.map((item) => (
                <motion.button
                  key={item.name}
                  whileHover={{ 
                    y: -2,
                    scale: 1.02,
                    rotateX: 2,
                    rotateY: 1,
                    z: 10,
                    boxShadow: navStyle.style === 'gosavi-dark' 
                      ? "0 15px 50px rgba(255, 255, 255, 0.2), 0 5px 20px rgba(255, 255, 255, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.3)" 
                      : "0 15px 50px rgba(59, 130, 246, 0.25), 0 5px 20px rgba(59, 130, 246, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.4)"
                  }}
                  whileTap={{ 
                    scale: 0.98,
                    y: -1,
                    rotateX: 1,
                    z: 5,
                    transition: { type: "spring", stiffness: 600, damping: 15 }
                  }}
                  onClick={() => handleNavClick(item.href)}
                  className={`relative overflow-hidden transition-all duration-700 transform-gpu group flex items-center justify-center ${
                    activeSection === item.id ? 'rounded-md' : 'rounded-sm'
                  }`}
                  style={{
                    minWidth: '98px',
                    width: 'auto',
                    height: '44px',
                    padding: '0 24px',
                    background: 'transparent',
                    backdropFilter: 'blur(25px) saturate(200%) brightness(1.1) contrast(1.05)',
                    transformStyle: 'preserve-3d',
                    perspective: '1000px',
                    border: activeSection === item.id 
                      ? navStyle.style === 'gosavi-dark'
                        ? '2px solid rgba(255,255,255,0.5)'
                        : '2px solid rgba(255,255,255,0.6)'
                      : navStyle.style === 'gosavi-dark'
                      ? '1.5px solid rgba(255,255,255,0.2)'
                      : '1.5px solid rgba(255,255,255,0.3)',
                    borderTop: activeSection === item.id 
                      ? navStyle.style === 'gosavi-dark'
                        ? '3px solid rgba(255,255,255,0.7)'
                        : '3px solid rgba(255,255,255,0.8)'
                      : navStyle.style === 'gosavi-dark'
                      ? '2px solid rgba(255,255,255,0.3)'
                      : '2px solid rgba(255,255,255,0.4)',
                    borderBottom: activeSection === item.id 
                      ? navStyle.style === 'gosavi-dark'
                        ? '1px solid rgba(255,255,255,0.2)'
                        : '1px solid rgba(255,255,255,0.3)'
                      : navStyle.style === 'gosavi-dark'
                      ? '0.5px solid rgba(255,255,255,0.1)'
                      : '0.5px solid rgba(255,255,255,0.15)',
                    boxShadow: activeSection === item.id 
                      ? navStyle.style === 'gosavi-dark'
                        ? '0 12px 40px rgba(255,255,255,0.18), 0 4px 15px rgba(255,255,255,0.12), inset 0 3px 0 rgba(255,255,255,0.4), inset 0 -2px 0 rgba(255,255,255,0.15), inset 3px 0 0 rgba(255,255,255,0.08), inset -3px 0 0 rgba(255,255,255,0.08), inset 0 0 20px rgba(255,255,255,0.05)'
                        : '0 8px 32px rgba(59,130,246,0.2), inset 0 2px 0 rgba(255,255,255,0.4), inset 0 -1px 0 rgba(255,255,255,0.15), inset 2px 0 0 rgba(255,255,255,0.08), inset -2px 0 0 rgba(255,255,255,0.08)'
                      : navStyle.style === 'gosavi-dark'
                      ? '0 4px 16px rgba(255,255,255,0.06), inset 0 1px 0 rgba(255,255,255,0.15), inset 2px 0 0 rgba(255,255,255,0.03), inset -2px 0 0 rgba(255,255,255,0.03)'
                      : '0 4px 16px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.2), inset 2px 0 0 rgba(255,255,255,0.05), inset -2px 0 0 rgba(255,255,255,0.05)'
                  }}
                >
                  {/* 3D Realistic Liquid Fill */}
                  <motion.div
                    className="absolute bottom-0 left-0 right-0"
                    style={{
                      height: activeSection === item.id ? '28px' : '18px',
                      background: activeSection === item.id 
                        ? navStyle.style === 'gosavi-dark'
                          ? `
                            radial-gradient(ellipse 100% 40% at 50% 100%, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.6) 50%, transparent 100%),
                            linear-gradient(180deg, 
                              rgba(255,255,255,0.15) 0%, 
                              rgba(255,255,255,0.35) 20%, 
                              rgba(255,255,255,0.55) 60%, 
                              rgba(255,255,255,0.75) 85%, 
                              rgba(255,255,255,0.85) 100%
                            )
                          `
                          : `
                            radial-gradient(ellipse 100% 40% at 50% 100%, rgba(59,130,246,0.9) 0%, rgba(99,102,241,0.7) 50%, transparent 100%),
                            linear-gradient(180deg, 
                              rgba(59,130,246,0.2) 0%, 
                              rgba(99,102,241,0.4) 20%, 
                              rgba(59,130,246,0.65) 60%, 
                              rgba(99,102,241,0.8) 85%, 
                              rgba(59,130,246,0.9) 100%
                            )
                          `
                        : navStyle.style === 'gosavi-dark'
                        ? `
                          radial-gradient(ellipse 100% 30% at 50% 100%, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.2) 50%, transparent 100%),
                          linear-gradient(180deg, 
                            rgba(255,255,255,0.08) 0%, 
                            rgba(255,255,255,0.18) 40%, 
                            rgba(255,255,255,0.28) 80%, 
                            rgba(255,255,255,0.38) 100%
                          )
                        `
                        : `
                          radial-gradient(ellipse 100% 30% at 50% 100%, rgba(59,130,246,0.5) 0%, rgba(99,102,241,0.3) 50%, transparent 100%),
                          linear-gradient(180deg, 
                            rgba(59,130,246,0.12) 0%, 
                            rgba(99,102,241,0.25) 40%, 
                            rgba(59,130,246,0.35) 80%, 
                            rgba(99,102,241,0.45) 100%
                          )
                        `,
                      borderRadius: activeSection === item.id ? '0 0 6px 6px' : '0 0 4px 4px',
                      filter: 'blur(0.3px) contrast(1.1) saturate(1.2)',
                      transform: 'translateZ(-2px)',
                      boxShadow: activeSection === item.id 
                        ? 'inset 0 2px 8px rgba(0,0,0,0.1), inset 0 -1px 4px rgba(255,255,255,0.2)'
                        : 'inset 0 1px 4px rgba(0,0,0,0.05), inset 0 -1px 2px rgba(255,255,255,0.1)'
                    }}
                    animate={activeSection === item.id ? {
                      height: ['24px', '30px', '26px', '28px'],
                      opacity: [0.8, 0.95, 0.85, 0.9]
                    } : {
                      height: ['14px', '18px', '15px', '16px'],
                      opacity: [0.6, 0.8, 0.7, 0.75]
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: [0.4, 0, 0.2, 1],
                      repeatType: "reverse"
                    }}
                  />

                  {/* 3D Realistic Water Surface */}
                  <motion.div
                    className="absolute left-0 right-0"
                    style={{
                      bottom: activeSection === item.id ? '24px' : '15px',
                      height: '4px',
                      background: activeSection === item.id 
                        ? navStyle.style === 'gosavi-dark'
                          ? `
                            radial-gradient(ellipse 200% 100% at 50% 0%, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 30%, rgba(255,255,255,0.5) 60%, transparent 100%),
                            linear-gradient(90deg, 
                              transparent 0%, 
                              rgba(255,255,255,0.6) 15%, 
                              rgba(255,255,255,1.0) 35%, 
                              rgba(255,255,255,0.8) 50%, 
                              rgba(255,255,255,1.0) 65%, 
                              rgba(255,255,255,0.6) 85%, 
                              transparent 100%
                            )
                          `
                          : `
                            radial-gradient(ellipse 200% 100% at 50% 0%, rgba(59,130,246,1.0) 0%, rgba(99,102,241,0.8) 30%, rgba(59,130,246,0.6) 60%, transparent 100%),
                            linear-gradient(90deg, 
                              transparent 0%, 
                              rgba(59,130,246,0.7) 15%, 
                              rgba(99,102,241,1.0) 35%, 
                              rgba(59,130,246,0.9) 50%, 
                              rgba(99,102,241,1.0) 65%, 
                              rgba(59,130,246,0.7) 85%, 
                              transparent 100%
                            )
                          `
                        : navStyle.style === 'gosavi-dark'
                        ? `
                          radial-gradient(ellipse 150% 100% at 50% 0%, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.3) 40%, transparent 100%),
                          linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 20%, rgba(255,255,255,0.6) 50%, rgba(255,255,255,0.4) 80%, transparent 100%)
                        `
                        : `
                          radial-gradient(ellipse 150% 100% at 50% 0%, rgba(59,130,246,0.6) 0%, rgba(99,102,241,0.4) 40%, transparent 100%),
                          linear-gradient(90deg, transparent 0%, rgba(59,130,246,0.5) 20%, rgba(99,102,241,0.7) 50%, rgba(59,130,246,0.5) 80%, transparent 100%)
                        `,
                      borderRadius: '50px',
                      filter: 'blur(0.2px) brightness(1.2)',
                      transform: 'translateZ(-1px) scaleY(0.8)',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.3)'
                    }}
                    animate={{
                      scaleX: [0.92, 1.08, 0.95, 1.05, 0.98, 1.02],
                      opacity: [0.7, 0.95, 0.8, 0.9, 0.75, 0.85],
                      y: [0, -0.5, 0.3, -0.2, 0.1, 0]
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: [0.25, 0.1, 0.25, 1]
                    }}
                  />

                  {/* Water Surface Reflection */}
                  <motion.div
                    className="absolute left-0 right-0"
                    style={{
                      bottom: activeSection === item.id ? '22px' : '13px',
                      height: '8px',
                      background: activeSection === item.id 
                        ? 'linear-gradient(180deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.1) 50%, transparent 100%)'
                        : 'linear-gradient(180deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 50%, transparent 100%)',
                      borderRadius: '50px',
                      filter: 'blur(1px)',
                      transform: 'translateZ(-0.5px) rotateX(180deg) scaleY(0.3)',
                      opacity: 0.4
                    }}
                    animate={{
                      scaleX: [0.9, 1.1, 0.95, 1.05],
                      opacity: [0.3, 0.5, 0.35, 0.45]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />

                  {/* 3D Glass Container Walls */}
                  <div 
                    className="absolute inset-0"
                    style={{
                      background: `
                        linear-gradient(90deg, 
                          rgba(255,255,255,0.3) 0%, 
                          rgba(255,255,255,0.15) 3%, 
                          transparent 8%, 
                          transparent 92%, 
                          rgba(255,255,255,0.15) 97%, 
                          rgba(255,255,255,0.3) 100%
                        ), 
                        linear-gradient(180deg, 
                          rgba(255,255,255,0.4) 0%, 
                          rgba(255,255,255,0.2) 5%, 
                          transparent 15%, 
                          transparent 85%, 
                          rgba(255,255,255,0.1) 95%, 
                          rgba(255,255,255,0.2) 100%
                        )
                      `,
                      borderRadius: activeSection === item.id ? '6px' : '4px',
                      opacity: 0.7,
                      transform: 'translateZ(1px)',
                      filter: 'blur(0.5px)'
                    }}
                  />

                  {/* Glass Depth and Thickness */}
                  <div 
                    className="absolute inset-0"
                    style={{
                      background: `
                        linear-gradient(45deg, 
                          rgba(255,255,255,0.2) 0%, 
                          transparent 30%, 
                          transparent 70%, 
                          rgba(255,255,255,0.1) 100%
                        ),
                        linear-gradient(-45deg, 
                          transparent 0%, 
                          rgba(255,255,255,0.15) 30%, 
                          transparent 70%, 
                          rgba(255,255,255,0.2) 100%
                        )
                      `,
                      borderRadius: activeSection === item.id ? '6px' : '4px',
                      opacity: 0.5,
                      transform: 'translateZ(0.5px) rotateX(1deg)',
                      mixBlendMode: 'overlay'
                    }}
                  />

                  {/* 3D Realistic Liquid Bubbles */}
                  {activeSection === item.id && (
                    <>
                      <motion.div
                        className="absolute"
                        style={{
                          width: '4px',
                          height: '4px',
                          background: `
                            radial-gradient(circle at 30% 30%, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.6) 40%, rgba(255,255,255,0.3) 70%, transparent 100%),
                            radial-gradient(circle at 70% 70%, rgba(255,255,255,0.4) 0%, transparent 60%)
                          `,
                          borderRadius: '50%',
                          bottom: '10px',
                          left: '25%',
                          filter: 'blur(0.1px) drop-shadow(0 1px 2px rgba(0,0,0,0.1))',
                          transform: 'translateZ(-1px)',
                          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.6), 0 1px 3px rgba(0,0,0,0.1)'
                        }}
                        animate={{
                          y: [-8, -20, -15, -18],
                          x: [0, 3, -2, 1, 0],
                          scale: [0.7, 1.4, 1.0, 1.2, 0.9],
                          opacity: [0.7, 0.95, 0.8, 0.9, 0.75],
                          rotate: [0, 15, -10, 5, 0]
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          ease: [0.25, 0.1, 0.25, 1],
                          delay: 0
                        }}
                      />
                      <motion.div
                        className="absolute"
                        style={{
                          width: '5px',
                          height: '5px',
                          background: `
                            radial-gradient(circle at 25% 25%, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.7) 30%, rgba(255,255,255,0.4) 60%, transparent 100%),
                            radial-gradient(circle at 75% 75%, rgba(255,255,255,0.5) 0%, transparent 50%)
                          `,
                          borderRadius: '50%',
                          bottom: '15px',
                          right: '30%',
                          filter: 'blur(0.1px) drop-shadow(0 2px 4px rgba(0,0,0,0.15))',
                          transform: 'translateZ(-0.5px) rotateX(15deg)',
                          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.7), 0 2px 4px rgba(0,0,0,0.1)'
                        }}
                        animate={{
                          y: [-6, -18, -12, -16],
                          x: [0, -2, 3, -1, 0],
                          scale: [0.6, 1.3, 0.8, 1.1, 0.7],
                          opacity: [0.6, 0.9, 0.7, 0.85, 0.65],
                          rotateZ: [0, -20, 12, -8, 0],
                          rotateX: [15, 25, 10, 20, 15]
                        }}
                        transition={{
                          duration: 3.5,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: 0.8
                        }}
                      />
                      <motion.div
                        className="absolute"
                        style={{
                          width: '3px',
                          height: '3px',
                          background: `
                            radial-gradient(circle at 35% 35%, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.5) 50%, transparent 100%)
                          `,
                          borderRadius: '50%',
                          bottom: '12px',
                          left: '60%',
                          filter: 'blur(0.15px) drop-shadow(0 1px 2px rgba(0,0,0,0.1))',
                          transform: 'translateZ(-1.5px) rotateY(10deg)',
                          boxShadow: 'inset 0 0.5px 0 rgba(255,255,255,0.5)'
                        }}
                        animate={{
                          y: [-4, -14, -8, -12],
                          x: [0, 1, -2, 1, 0],
                          scale: [0.5, 1.0, 0.7, 0.9, 0.6],
                          opacity: [0.5, 0.8, 0.6, 0.75, 0.55],
                          rotateY: [10, 30, -5, 20, 10]
                        }}
                        transition={{
                          duration: 4.2,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: 1.5
                        }}
                      />
                    </>
                  )}

                  {/* Glass container top reflection */}
                  <div 
                    className="absolute inset-x-0 top-0"
                    style={{
                      height: '8px',
                      background: 'linear-gradient(180deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.2) 50%, transparent 100%)',
                      borderRadius: activeSection === item.id ? '6px 6px 0 0' : '4px 4px 0 0',
                      opacity: 0.7
                    }}
                  />

                  {/* Condensation on glass walls */}
                  <motion.div
                    className="absolute"
                    style={{
                      width: '2px',
                      height: '4px',
                      background: 'linear-gradient(180deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.3) 70%, transparent 100%)',
                      borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
                      top: '12px',
                      right: '8px',
                      opacity: activeSection === item.id ? 0.6 : 0.3,
                      filter: 'blur(0.1px)'
                    }}
                    animate={activeSection === item.id ? {
                      scaleY: [1, 1.3, 1.1],
                      opacity: [0.4, 0.7, 0.5, 0.6],
                      y: [0, 1, 0]
                    } : {}}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      ease: [0.4, 0, 0.2, 1],
                      repeatType: "reverse"
                    }}
                  />

                  {/* Small condensation droplet */}
                  <motion.div
                    className="absolute"
                    style={{
                      width: '1px',
                      height: '1px',
                      background: 'radial-gradient(circle, rgba(255,255,255,0.5) 0%, transparent 70%)',
                      borderRadius: '50%',
                      top: '18px',
                      left: '12px',
                      opacity: activeSection === item.id ? 0.4 : 0.2
                    }}
                    animate={activeSection === item.id ? {
                      opacity: [0.2, 0.5, 0.3, 0.4],
                      scale: [0.8, 1.2, 1]
                    } : {}}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 2
                    }}
                  />

                  {/* Simple Clean Text */}
                  <span 
                    className={`relative z-20 font-medium text-center whitespace-nowrap transition-all duration-300 ${
                      activeSection === item.id 
                        ? navStyle.style === 'gosavi-dark'
                          ? 'text-sm text-white font-semibold'
                          : 'text-sm text-gray-900 font-semibold'
                        : navStyle.style === 'gosavi-dark'
                        ? 'text-sm text-white/90 group-hover:text-white'
                        : 'text-sm text-gray-800/90 group-hover:text-gray-900'
                    }`}
                    style={{
                      fontSize: '13px',
                      lineHeight: '1.2'
                    }}
                  >
                    {item.name}
                  </span>
                  
                  {/* Liquid Displacement Effect Around Solid Text */}
                  {activeSection === item.id && (
                    <motion.div
                      className="absolute inset-0"
                      style={{
                        background: `
                          radial-gradient(ellipse 70% 50% at 50% 50%, transparent 30%, rgba(255,255,255,0.08) 35%, transparent 45%)
                        `,
                        borderRadius: '6px',
                        filter: 'blur(1px)',
                        opacity: 0.4
                      }}
                      animate={{
                        opacity: [0.3, 0.5, 0.4],
                        scale: [0.98, 1.02, 1]
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                  )}                  {/* Liquid illumination from within */}
                  {activeSection === item.id && (
                    <motion.div
                      layoutId="liquidIllumination"
                      className="absolute bottom-0 left-0 right-0"
                      style={{
                        height: '28px',
                        background: navStyle.style === 'gosavi-dark'
                          ? 'radial-gradient(ellipse 120% 100% at 50% 100%, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.15) 40%, rgba(255,255,255,0.08) 70%, transparent 100%)'
                          : 'radial-gradient(ellipse 120% 100% at 50% 100%, rgba(59,130,246,0.25) 0%, rgba(99,102,241,0.18) 40%, rgba(59,130,246,0.10) 70%, transparent 100%)',
                        borderRadius: '0 0 6px 6px',
                        filter: 'blur(1px)'
                      }}
                      animate={{
                        opacity: [0.7, 0.9, 0.8, 0.85],
                        scale: [1, 1.02, 0.99, 1]
                      }}
                      transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: [0.25, 0.1, 0.25, 1],
                        repeatType: "reverse"
                      }}
                    />
                  )}

                  {/* Liquid density variation effect */}
                  {activeSection === item.id && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0"
                      style={{
                        height: '20px',
                        background: navStyle.style === 'gosavi-dark'
                          ? 'linear-gradient(45deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.2) 25%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.25) 75%, rgba(255,255,255,0.1) 100%)'
                          : 'linear-gradient(45deg, rgba(59,130,246,0.12) 0%, rgba(99,102,241,0.25) 25%, rgba(59,130,246,0.18) 50%, rgba(99,102,241,0.30) 75%, rgba(59,130,246,0.12) 100%)',
                        borderRadius: '0 0 6px 6px',
                        filter: 'blur(0.5px)'
                      }}
                      animate={{
                        backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
                        opacity: [0.6, 0.8, 0.7, 0.75]
                      }}
                      transition={{
                        backgroundPosition: { duration: 8, repeat: Infinity, ease: "linear" },
                        opacity: { duration: 4, repeat: Infinity, ease: [0.4, 0, 0.2, 1] }
                      }}
                    />
                  )}

                  {/* Glass slab edge highlight */}
                  <div 
                    className="absolute inset-0"
                    style={{
                      borderRadius: activeSection === item.id ? '8px' : '6px',
                      background: 'linear-gradient(180deg, rgba(255,255,255,0.15) 0%, transparent 30%)',
                      opacity: 0.4
                    }}
                  />
                </motion.button>
              ))}
              
              {/* Crystal Clear CTA Bubble */}
              <motion.button
                whileHover={{ 
                  y: -4,
                  scale: 1.05,
                  boxShadow: navStyle.style === 'gosavi-dark'
                    ? "0 25px 80px rgba(255, 255, 255, 0.4), 0 10px 40px rgba(255, 255, 255, 0.3)"
                    : "0 25px 80px rgba(59, 130, 246, 0.5), 0 10px 40px rgba(59, 130, 246, 0.4)"
                }}
                whileTap={{ 
                  scale: 0.95,
                  transition: { type: "spring", stiffness: 400, damping: 10 }
                }}
                onClick={() => handleNavClick('#contact')}
                className="ml-16 font-semibold text-sm rounded-3xl transition-all duration-500 transform-gpu relative overflow-hidden group flex items-center justify-center"
                style={{
                  width: '110px', // Slightly wider for CTA
                  height: '50px', // Slightly taller for CTA
                  background: navStyle.style === 'gosavi-dark'
                    ? 'linear-gradient(135deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.1) 100%)'
                    : 'linear-gradient(135deg, rgba(0,0,0,0.8) 0%, rgba(31,41,55,0.9) 50%, rgba(0,0,0,0.7) 100%)',
                  backdropFilter: 'blur(20px) saturate(180%)',
                  border: navStyle.style === 'gosavi-dark'
                    ? '1px solid rgba(255,255,255,0.4)'
                    : '1px solid rgba(255,255,255,0.2)',
                  boxShadow: navStyle.style === 'gosavi-dark'
                    ? '0 8px 32px rgba(255,255,255,0.2), inset 0 1px 0 rgba(255,255,255,0.3), inset 0 -1px 0 rgba(255,255,255,0.1)'
                    : '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.2), inset 0 -1px 0 rgba(255,255,255,0.1)',
                  color: 'white'
                }}
              >
                {/* Liquid CTA fill effect */}
                <motion.div
                  className="absolute inset-0 rounded-3xl"
                  style={{
                    background: navStyle.style === 'gosavi-dark'
                      ? 'radial-gradient(ellipse at center, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.15) 40%, transparent 70%)'
                      : 'radial-gradient(ellipse at center, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.2) 40%, transparent 70%)'
                  }}
                  animate={{
                    scale: [1, 1.03, 1],
                    opacity: [0.6, 1, 0.6]
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />

                {/* Organic stretch effect for CTA */}
                <motion.div
                  className="absolute inset-0 rounded-3xl"
                  style={{
                    background: 'linear-gradient(45deg, rgba(255,255,255,0.15) 0%, transparent 50%, rgba(255,255,255,0.08) 100%)',
                    opacity: 0
                  }}
                  whileHover={{
                    opacity: 1,
                    scale: [1, 1.08, 1.04],
                    rotate: [0, 2, -2, 0]
                  }}
                  transition={{
                    duration: 0.8,
                    ease: "easeInOut"
                  }}
                />

                {/* Crystal reflection for CTA */}
                <div 
                  className="absolute inset-0 rounded-3xl"
                  style={{
                    background: 'linear-gradient(145deg, rgba(255,255,255,0.5) 0%, transparent 30%, transparent 70%, rgba(255,255,255,0.2) 100%)',
                    opacity: 0.8
                  }}
                />

                <motion.span 
                  className="relative z-10 tracking-wide text-center font-bold"
                  whileHover={{
                    scale: 1.05,
                    textShadow: '0 0 25px rgba(255,255,255,0.8)'
                  }}
                  transition={{ duration: 0.3 }}
                >
                  Contact
                </motion.span>

                {/* CTA liquid glow */}
                <motion.div
                  className="absolute inset-0 rounded-3xl"
                  style={{
                    background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.1) 50%, transparent 100%)'
                  }}
                  animate={{
                    scale: [1, 1.06, 1],
                    opacity: [0.4, 0.8, 0.4]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </motion.button>
            </div>

            {/* Liquid Glass Mobile Menu Button */}
            <motion.button
              whileHover={{ scale: 1.05, y: -1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(!isOpen)}
              className={`lg:hidden p-4 rounded-3xl transition-all duration-300 ${
                navStyle.style === 'gosavi-dark'
                  ? 'bg-gradient-to-r from-white/10 via-white/20 to-white/10 backdrop-blur-xl border border-white/20 text-white shadow-xl shadow-white/5'
                  : 'bg-gradient-to-r from-white/30 via-white/50 to-white/30 backdrop-blur-xl border border-white/40 text-gray-900 shadow-xl shadow-blue-500/10'
              }`}
              style={{
                backdropFilter: 'blur(20px)',
                boxShadow: navStyle.style === 'gosavi-dark'
                  ? 'inset 0 1px 0 rgba(255,255,255,0.2), inset 0 -1px 0 rgba(0,0,0,0.1)'
                  : 'inset 0 1px 0 rgba(255,255,255,0.3), inset 0 -1px 0 rgba(0,0,0,0.1)'
              }}
            >
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {isOpen ? <X className="w-7 h-7 drop-shadow-sm" /> : <Menu className="w-7 h-7 drop-shadow-sm" />}
              </motion.div>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setIsOpen(false)}
            />
            
            {/* Liquid Glass Mobile Menu Panel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.3 }}
              className={`fixed top-20 left-4 right-4 rounded-3xl p-6 z-40 lg:hidden ${
                navStyle.style === 'gosavi-dark'
                  ? 'bg-gradient-to-b from-gray-900/30 via-gray-800/40 to-gray-900/30 backdrop-blur-2xl border border-white/20 shadow-2xl shadow-black/50'
                  : 'bg-gradient-to-b from-white/25 via-white/35 to-white/25 backdrop-blur-2xl border border-white/40 shadow-2xl shadow-blue-500/20'
              }`}
              style={{
                backdropFilter: 'blur(25px)',
                background: navStyle.style === 'gosavi-dark'
                  ? 'linear-gradient(135deg, rgba(17,24,39,0.6) 0%, rgba(31,41,55,0.7) 50%, rgba(17,24,39,0.6) 100%)'
                  : 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0.2) 100%)',
                boxShadow: navStyle.style === 'gosavi-dark'
                  ? '0 20px 60px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1), inset 0 -1px 0 rgba(0,0,0,0.2)'
                  : '0 20px 60px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.4), inset 0 -1px 0 rgba(0,0,0,0.1)'
              }}
            >
              {/* Crystal Texture Overlay */}
              <div 
                className="absolute inset-0 rounded-3xl opacity-20"
                style={{
                  backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 3px, rgba(255,255,255,0.05) 3px, rgba(255,255,255,0.05) 6px)',
                  mixBlendMode: 'overlay'
                }}
              />
              
              <div className="relative space-y-2">
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => handleNavClick(item.href)}
                    className={`flex items-center w-full p-4 rounded-2xl transition-all duration-300 text-left relative group ${
                      navStyle.style === 'gosavi-dark'
                        ? activeSection === item.id
                          ? 'bg-gradient-to-r from-white/15 via-white/25 to-white/15 backdrop-blur-xl border border-white/30 shadow-lg shadow-white/5'
                          : 'hover:bg-gradient-to-r hover:from-white/5 hover:via-white/10 hover:to-white/5 backdrop-blur-lg border border-white/10'
                        : activeSection === item.id
                        ? 'bg-gradient-to-r from-white/30 via-white/50 to-white/30 backdrop-blur-xl border border-white/40 shadow-lg shadow-blue-500/10'
                        : 'hover:bg-gradient-to-r hover:from-white/10 hover:via-white/20 hover:to-white/10 backdrop-blur-lg border border-white/20'
                    }`}
                    whileHover={{ x: 6, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    style={{
                      backdropFilter: 'blur(15px)',
                      boxShadow: activeSection === item.id 
                        ? 'inset 0 1px 0 rgba(255,255,255,0.2), inset 0 -1px 0 rgba(0,0,0,0.1)'
                        : 'none'
                    }}
                  >
                    <span className={`text-lg font-medium transition-colors duration-300 drop-shadow-sm ${
                      navStyle.style === 'gosavi-dark'
                        ? activeSection === item.id ? 'text-white' : 'text-white/80 group-hover:text-white'
                        : activeSection === item.id ? 'text-gray-900' : 'text-gray-700 group-hover:text-gray-900'
                    }`}>
                      {item.name}
                    </span>
                    
                    {/* Liquid Glass Active Indicator */}
                    {activeSection === item.id && (
                      <motion.div
                        className={`ml-auto w-3 h-3 rounded-full ${
                          navStyle.style === 'gosavi-dark'
                            ? 'bg-gradient-to-br from-white via-white/80 to-white/60 shadow-lg shadow-white/20'
                            : 'bg-gradient-to-br from-gray-900 via-gray-700 to-gray-600 shadow-lg shadow-gray-900/30'
                        }`}
                        layoutId="mobileActiveGlass"
                        style={{
                          boxShadow: navStyle.style === 'gosavi-dark'
                            ? '0 0 10px rgba(255,255,255,0.3), inset 0 1px 0 rgba(255,255,255,0.5)'
                            : '0 0 10px rgba(59,130,246,0.3), inset 0 1px 0 rgba(255,255,255,0.3)'
                        }}
                      />
                    )}
                  </motion.button>
                ))}
                
                {/* Liquid Glass Mobile CTA */}
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: navItems.length * 0.1 + 0.1 }}
                  onClick={() => handleNavClick('#contact')}
                  className={`w-full mt-6 p-4 font-medium rounded-2xl transition-all duration-300 relative overflow-hidden ${
                    navStyle.style === 'gosavi-dark'
                      ? 'bg-gradient-to-r from-white/15 via-white/25 to-white/15 backdrop-blur-xl border border-white/30 text-white shadow-xl shadow-white/10'
                      : 'bg-gradient-to-br from-gray-900/90 via-gray-800/80 to-gray-900/90 backdrop-blur-xl border border-white/20 text-white shadow-xl shadow-gray-900/20'
                  }`}
                  whileHover={{ y: -2, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    backdropFilter: 'blur(20px)',
                    backgroundImage: navStyle.style === 'gosavi-dark'
                      ? 'radial-gradient(circle at 30% 20%, rgba(255,255,255,0.15), transparent 50%)'
                      : 'radial-gradient(circle at 30% 20%, rgba(99,102,241,0.3), transparent 50%)',
                    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.3), inset 0 -1px 0 rgba(0,0,0,0.2)'
                  }}
                >
                  <span className="relative z-10 drop-shadow-lg">Get in Touch</span>
                  
                  {/* Liquid Glass Shine Effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
                    style={{ width: '200%' }}
                  />
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {scrolled && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 xl:bottom-12 xl:right-12 2xl:bottom-16 2xl:right-16 p-3 xl:p-4 2xl:p-5 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full shadow-lg shadow-blue-500/25 z-40"
          >
            <ArrowUp className="w-5 h-5 xl:w-6 xl:h-6 2xl:w-8 2xl:h-8" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Navigation Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-600 transform-gpu z-50"
        style={{
          scaleX: scrollYProgress,
          transformOrigin: "0%"
        }}
      />
    </>
  );
};

export default Navigation;

