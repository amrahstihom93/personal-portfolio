'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Home, User, Code, Briefcase, Mail, Zap } from 'lucide-react';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [dropPosition, setDropPosition] = useState(0);
  const buttonRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});
  const menuRef = useRef<HTMLDivElement>(null);

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
            if (activeSection !== section) {
              setActiveSection(section);
              updateDropPosition(section);
            }
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Call once to set initial state
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection]);

  // Function to update drop position based on button positions
  const updateDropPosition = (sectionId: string) => {
    const targetButton = buttonRefs.current[sectionId];
    const menuContainer = menuRef.current;
    
    if (targetButton && menuContainer) {
      const menuRect = menuContainer.getBoundingClientRect();
      const buttonRect = targetButton.getBoundingClientRect();
      const position = buttonRect.left - menuRect.left;
      setDropPosition(position);
    }
  };

  // Update drop position when activeSection changes
  useEffect(() => {
    // ...existing code...
  }, [activeSection]);
    updateDropPosition(activeSection);
  }, [activeSection]);

  // Update positions on window resize
  useEffect(() => {
    const handleResize = () => {
      updateDropPosition(activeSection);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [activeSection]);

  // Initial position setup
  useEffect(() => {
    // Small delay to ensure buttons are rendered
    const timer = setTimeout(() => {
      updateDropPosition(activeSection);
    }, 100);
    
    return () => clearTimeout(timer);
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
            <div ref={menuRef} className="hidden lg:flex items-center space-x-12 relative">
              {/* Fluid Drop Motion Background */}
              <motion.div
                className="absolute"
                style={{
                  width: '90px',
                  height: '42px',
                  background: navStyle.style === 'gosavi-dark'
                    ? 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.12) 100%)'
                    : 'linear-gradient(135deg, rgba(59,130,246,0.12) 0%, rgba(99,102,241,0.08) 50%, rgba(59,130,246,0.15) 100%)',
                  backdropFilter: 'blur(20px)',
                  borderRadius: '8px',
                  border: navStyle.style === 'gosavi-dark'
                    ? '1px solid rgba(255,255,255,0.25)'
                    : '1px solid rgba(255,255,255,0.35)',
                  boxShadow: navStyle.style === 'gosavi-dark'
                    ? '0 8px 32px rgba(255,255,255,0.08), inset 0 1px 0 rgba(255,255,255,0.2)'
                    : '0 8px 32px rgba(59,130,246,0.08), inset 0 1px 0 rgba(255,255,255,0.3)',
                  zIndex: 1,
                  transformOrigin: 'center',
                  overflow: 'hidden'
                }}
                initial={false}
                animate={{
                  x: dropPosition,
                  opacity: 1,
                  scaleX: [1, 1.15, 0.95, 1.05, 1],
                  scaleY: [1, 0.85, 1.05, 0.98, 1]
                }}
                transition={{
                  x: {
                    type: "spring",
                    stiffness: 220,
                    damping: 20,
                    mass: 0.8
                  },
                  scaleX: {
                    duration: 0.6,
                    ease: [0.25, 0.46, 0.45, 0.94],
                    times: [0, 0.2, 0.5, 0.8, 1]
                  },
                  scaleY: {
                    duration: 0.6,
                    ease: [0.25, 0.46, 0.45, 0.94],
                    times: [0, 0.2, 0.5, 0.8, 1]
                  }
                }}
              >
                {/* Liquid Drop Effect */}
                <motion.div
                  className="absolute inset-0"
                  style={{
                    background: navStyle.style === 'gosavi-dark'
                      ? 'radial-gradient(ellipse 120% 100% at 50% 0%, rgba(255,255,255,0.2) 0%, transparent 70%)'
                      : 'radial-gradient(ellipse 120% 100% at 50% 0%, rgba(59,130,246,0.15) 0%, transparent 70%)',
                    borderRadius: 'inherit'
                  }}
                  animate={{
                    opacity: [0.5, 0.8, 0.6],
                    scale: [1, 1.02, 1],
                    scaleX: [1, 0.9, 1.1, 1],
                    scaleY: [1, 1.1, 0.9, 1]
                  }}
                  transition={{
                    opacity: {
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    },
                    scale: {
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    },
                    scaleX: {
                      duration: 0.8,
                      ease: [0.68, -0.55, 0.265, 1.55],
                      times: [0, 0.3, 0.7, 1]
                    },
                    scaleY: {
                      duration: 0.8,
                      ease: [0.68, -0.55, 0.265, 1.55],
                      times: [0, 0.3, 0.7, 1]
                    }
                  }}
                />
                {/* Surface Tension Effect */}
                <motion.div
                  className="absolute inset-0"
                  style={{
                    background: navStyle.style === 'gosavi-dark'
                      ? 'linear-gradient(180deg, rgba(255,255,255,0.15) 0%, transparent 30%)'
                      : 'linear-gradient(180deg, rgba(255,255,255,0.25) 0%, transparent 30%)',
                    borderRadius: 'inherit'
                  }}
                  animate={{
                    opacity: [0.3, 0.6, 0.4],
                    scaleX: [1, 1.05, 0.98, 1.02, 1],
                    scaleY: [1, 0.95, 1.03, 0.99, 1]
                  }}
                  transition={{
                    opacity: {
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.5
                    },
                    scaleX: {
                      duration: 0.7,
                      ease: [0.175, 0.885, 0.32, 1.275],
                      times: [0, 0.25, 0.5, 0.75, 1]
                    },
                    scaleY: {
                      duration: 0.7,
                      ease: [0.175, 0.885, 0.32, 1.275],
                      times: [0, 0.25, 0.5, 0.75, 1]
                    }
                  }}
                />
                {/* Bouncy Ripple Effect */}
                <motion.div
                  className="absolute inset-0"
                  style={{
                    background: navStyle.style === 'gosavi-dark'
                      ? 'radial-gradient(circle at center, rgba(255,255,255,0.1) 0%, transparent 60%)'
                      : 'radial-gradient(circle at center, rgba(59,130,246,0.08) 0%, transparent 60%)',
                    borderRadius: 'inherit'
                  }}
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0, 0.6, 0],
                    rotate: [0, 180, 360]
                  }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    ease: [0.68, -0.55, 0.265, 1.55],
                    delay: 0.2
                  }}
                />
              </motion.div>

              {navItems.map((item) => (
                <motion.button
                  key={item.name}
                  ref={(el) => {
                    buttonRefs.current[item.id] = el;
                  }}
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
                    background: 'transparent', // Remove individual backgrounds to let fluid drop show
                    backdropFilter: 'blur(15px)',
                    border: 'transparent', // Remove individual borders
                    boxShadow: 'none', // Remove individual shadows
                    zIndex: 2 // Keep buttons above the fluid drop
                  }}
                >
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
