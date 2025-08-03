'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Home, User, Code, Briefcase, Mail, Zap } from 'lucide-react';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Update active section based on scroll position
      const sections = ['home', 'about', 'skills', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Call once to set initial state
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getNavStyle = () => {
    const pathname = typeof window !== 'undefined' ? window.location.pathname : '';
    
    switch (pathname) {
      case '/gosavi':
        return {
          bg: scrolled 
            ? 'bg-gradient-to-r from-gray-900/25 via-gray-800/35 to-gray-900/25 backdrop-blur-2xl border border-white/25 shadow-2xl shadow-white/10' 
            : 'bg-gradient-to-r from-gray-900/20 via-gray-800/30 to-gray-900/20 backdrop-blur-xl border border-white/20',
          text: 'text-white',
          style: 'gosavi-dark'
        };
      default:
        return {
          bg: scrolled 
            ? 'bg-gradient-to-r from-white/30 via-white/40 to-white/30 backdrop-blur-2xl border border-white/45 shadow-2xl shadow-blue-500/10' 
            : 'bg-gradient-to-r from-white/25 via-white/35 to-white/25 backdrop-blur-xl border border-white/35',
          text: 'text-gray-900',
          style: 'clean'
        };
    }
  };

  const navStyle = getNavStyle();

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
      {/* Clean Glass Navigation */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`fixed top-0 w-full z-50 transition-all duration-700 ${navStyle.bg}`}
        style={{ 
          backdropFilter: 'blur(20px)',
          transform: 'translateZ(0)'
        }}
      >
        <div className="max-w-8xl mx-auto px-8 lg:px-16">
          <div className={`flex justify-between items-center ${navStyle.style === 'clean' ? 'py-8 lg:py-10' : 'py-7 lg:py-10'}`}>
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
              onClick={scrollToTop}
              className="cursor-pointer z-50 flex items-center space-x-4"
            >
              {navStyle.style === 'gosavi-dark' ? (
                <div className="flex items-center space-x-4 px-6 py-3.5 bg-gradient-to-r from-white/15 via-white/25 to-white/15 backdrop-blur-xl border border-white/25 rounded-3xl shadow-xl">
                  <div className="w-10 h-px bg-gradient-to-r from-transparent via-white to-transparent" />
                  <div className="flex flex-col">
                    <span className="text-lg font-light tracking-[0.2em] uppercase text-white/95">
                      Portfolio
                    </span>
                    <span className="text-sm font-mono text-white/60 tracking-[0.1em]">
                      {activeSection}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="flex items-center space-x-4 px-6 py-3.5 bg-gradient-to-r from-white/35 via-white/55 to-white/35 backdrop-blur-xl border border-white/45 rounded-3xl shadow-xl">
                  <div className="p-3 bg-gradient-to-br from-gray-900/90 via-gray-800/80 to-gray-900/90 backdrop-blur-sm rounded-xl shadow-lg border border-white/20">
                    <Zap className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xl font-medium text-gray-900/90">
                      Portfolio
                    </span>
                  </div>
                </div>
              )}
            </motion.div>

            {/* Clean Glass Menu */}
            <div className="hidden lg:flex items-center space-x-12">
              {navItems.map((item) => (
                <motion.button
                  key={item.name}
                  whileHover={{ 
                    y: -2,
                    scale: 1.02
                  }}
                  whileTap={{ 
                    scale: 0.98,
                    y: -1
                  }}
                  onClick={() => handleNavClick(item.href)}
                  className={`relative overflow-hidden transition-all duration-300 transform-gpu group flex items-center justify-center ${
                    activeSection === item.id ? 'rounded-lg' : 'rounded-md'
                  }`}
                  style={{
                    minWidth: '90px',
                    width: 'auto',
                    height: '42px',
                    padding: '0 20px',
                    background: activeSection === item.id 
                      ? navStyle.style === 'gosavi-dark'
                        ? 'linear-gradient(135deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.20) 100%)'
                        : 'linear-gradient(135deg, rgba(59,130,246,0.20) 0%, rgba(99,102,241,0.15) 50%, rgba(59,130,246,0.25) 100%)'
                      : 'transparent',
                    backdropFilter: 'blur(15px)',
                    border: activeSection === item.id 
                      ? navStyle.style === 'gosavi-dark'
                        ? '1.5px solid rgba(255,255,255,0.4)'
                        : '1.5px solid rgba(255,255,255,0.5)'
                      : navStyle.style === 'gosavi-dark'
                      ? '1px solid rgba(255,255,255,0.15)'
                      : '1px solid rgba(255,255,255,0.25)',
                    boxShadow: activeSection === item.id 
                      ? navStyle.style === 'gosavi-dark'
                        ? '0 8px 32px rgba(255,255,255,0.15), inset 0 1px 0 rgba(255,255,255,0.3)'
                        : '0 8px 32px rgba(59,130,246,0.15), inset 0 1px 0 rgba(255,255,255,0.4)'
                      : '0 4px 16px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.15)'
                  }}
                >
                  {/* Simple Active State Background */}
                  {activeSection === item.id && (
                    <motion.div
                      layoutId="activeBackground"
                      className="absolute inset-0"
                      style={{
                        background: navStyle.style === 'gosavi-dark'
                          ? 'radial-gradient(ellipse 100% 80% at 50% 100%, rgba(255,255,255,0.1) 0%, transparent 70%)'
                          : 'radial-gradient(ellipse 100% 80% at 50% 100%, rgba(59,130,246,0.12) 0%, transparent 70%)',
                        borderRadius: 'inherit'
                      }}
                      animate={{
                        opacity: [0.6, 0.8, 0.7]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                  )}

                  {/* Clean Text */}
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

                  {/* Top Glass Reflection */}
                  <div 
                    className="absolute inset-x-0 top-0"
                    style={{
                      height: '6px',
                      background: 'linear-gradient(180deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.1) 50%, transparent 100%)',
                      borderRadius: activeSection === item.id ? '6px 6px 0 0' : '4px 4px 0 0',
                      opacity: 0.6
                    }}
                  />
                </motion.button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              whileHover={{ scale: 1.05, y: -1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(!isOpen)}
              className={`lg:hidden p-4 rounded-2xl transition-all duration-300 ${
                navStyle.style === 'gosavi-dark'
                  ? 'bg-gradient-to-r from-white/15 via-white/25 to-white/15 backdrop-blur-xl border border-white/25 text-white shadow-xl'
                  : 'bg-gradient-to-r from-white/35 via-white/55 to-white/35 backdrop-blur-xl border border-white/45 text-gray-900 shadow-xl'
              }`}
            >
              <div className="w-6 h-6 flex flex-col justify-center space-y-1">
                <motion.span
                  animate={isOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                  className="w-full h-0.5 bg-current transform origin-center transition-all duration-300"
                />
                <motion.span
                  animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
                  className="w-full h-0.5 bg-current transition-all duration-300"
                />
                <motion.span
                  animate={isOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                  className="w-full h-0.5 bg-current transform origin-center transition-all duration-300"
                />
              </div>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={isOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className={`lg:hidden fixed top-24 left-0 right-0 z-40 mx-4 rounded-3xl overflow-hidden ${
          isOpen ? 'pointer-events-auto' : 'pointer-events-none'
        } ${navStyle.bg}`}
        style={{ backdropFilter: 'blur(20px)' }}
      >
        <div className="py-8 px-6">
          {navItems.map((item, index) => (
            <motion.button
              key={item.name}
              initial={{ opacity: 0, x: -20 }}
              animate={isOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
              onClick={() => handleNavClick(item.href)}
              className={`w-full flex items-center space-x-4 py-4 px-6 rounded-2xl transition-all duration-300 ${
                activeSection === item.id 
                  ? navStyle.style === 'gosavi-dark'
                    ? 'bg-white/10 text-white border border-white/20'
                    : 'bg-blue-500/10 text-gray-900 border border-blue-500/20'
                  : navStyle.style === 'gosavi-dark'
                  ? 'text-white/80 hover:bg-white/5 hover:text-white'
                  : 'text-gray-800/80 hover:bg-blue-500/5 hover:text-gray-900'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.name}</span>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Mobile Menu Backdrop */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className="lg:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-30"
        />
      )}
    </>
  );
}
