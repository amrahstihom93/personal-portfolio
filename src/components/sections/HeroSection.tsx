'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Github, Linkedin, Mail, ArrowDown } from 'lucide-react';

const HeroSection = () => {
  const containerRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (typeof window !== 'undefined') {
        const x = (event.clientX / window.innerWidth) * 2 - 1;
        const y = -(event.clientY / window.innerHeight) * 2 + 1;
        setMousePosition({ x: x * 0.1, y: y * 0.1 });
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const socialLinks = [
    { icon: Github, href: 'https://github.com', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:your@email.com', label: 'Email' },
  ];

  return (
    <motion.section
      id="home"
      ref={containerRef}
      className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-white"
      style={{ y, opacity }}
    >
      {/* Artistic Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Large floating shapes - more subtle */}
        <motion.div
          className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-blue-400/5 to-purple-500/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-br from-emerald-400/5 to-orange-500/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, -25, 0],
            y: [0, 25, 0],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Grid Pattern - very subtle */}
        <div className="absolute inset-0 opacity-[0.01]">
          <div className="absolute inset-0" 
               style={{
                 backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0,0,0,0.1) 1px, transparent 0)`,
                 backgroundSize: '60px 60px'
               }}
          />
        </div>
        
        {/* Floating particles - fewer and more subtle */}
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-gradient-to-r from-blue-400/30 to-purple-500/30 rounded-full"
            style={{
              left: `${15 + (i * 20)}%`,
              top: `${30 + (i * 10)}%`,
            }}
            animate={{
              y: [0, -80, 0],
              opacity: [0.1, 0.3, 0.1],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 6 + i * 2,
              repeat: Infinity,
              delay: i * 1.5,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Navigation Status */}
      <div className="absolute top-8 right-8 z-20">
        <motion.div
          className="text-sm font-light text-black/60 text-right"
          style={{ letterSpacing: '0.2em' }}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
        >
          Portfolio 2024
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-7xl flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 mx-auto">
        
        {/* Main Title */}
        <motion.div
          className="mb-8 sm:mb-12 lg:mb-16 w-full text-center relative"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{
            transform: `translate(${mousePosition.x * 2}px, ${mousePosition.y * 2}px)`
          }}
        >
          {/* Artistic accent behind title */}
          <motion.div
            className="absolute -inset-8 bg-gradient-to-r from-blue-500/5 via-purple-500/10 to-emerald-500/5 rounded-3xl blur-2xl"
            animate={{
              scale: [1, 1.05, 1],
              rotate: [0, 2, -2, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          <motion.h1 
            className="relative text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-extralight leading-[0.9] sm:leading-[0.95] text-black w-full cursor-default mb-6 sm:mb-8" 
            style={{ letterSpacing: '0.1em' }}
            whileHover={{ scale: 1.005 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <motion.span
              className="inline-block relative"
              whileHover={{ 
                textShadow: "0 0 30px rgba(99, 102, 241, 0.4)",
                color: "#6366f1",
                scale: 1.1
              }}
              transition={{ duration: 0.3 }}
            >
              #
              {/* Glow effect behind hash */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 opacity-0 blur-xl -z-10"
                whileHover={{ opacity: 0.3 }}
                transition={{ duration: 0.3 }}
              />
            </motion.span>
            <div className="block relative">
              {"f u l l s t a c k".split("").map((char, index) => (
                <motion.span
                  key={index}
                  className="inline-block relative"
                  whileHover={{ 
                    y: -8,
                    color: "#6366f1",
                    textShadow: "0 8px 25px rgba(99, 102, 241, 0.3)",
                    scale: 1.05
                  }}
                  animate={{
                    y: [0, -2, 0],
                  }}
                  transition={{ 
                    duration: 0.3, 
                    delay: index * 0.03,
                    ease: "easeOut",
                    repeat: Infinity,
                    repeatDelay: 3 + index * 0.1,
                  }}
                >
                  {char === " " ? "\u00A0" : char}
                  {/* Individual character glow */}
                  <motion.div
                    className="absolute inset-0 bg-blue-400 opacity-0 blur-sm -z-10"
                    whileHover={{ opacity: 0.2 }}
                    transition={{ duration: 0.2 }}
                  />
                </motion.span>
              ))}
            </div>
            <div className="block relative">
              {"d e v e l o p e r".split("").map((char, index) => (
                <motion.span
                  key={index + 100}
                  className="inline-block relative"
                  whileHover={{ 
                    y: -8,
                    color: "#10b981",
                    textShadow: "0 8px 25px rgba(16, 185, 129, 0.3)",
                    scale: 1.05
                  }}
                  animate={{
                    y: [0, -1, 0],
                  }}
                  transition={{ 
                    duration: 0.3, 
                    delay: index * 0.03,
                    ease: "easeOut",
                    repeat: Infinity,
                    repeatDelay: 4 + index * 0.08,
                  }}
                >
                  {char === " " ? "\u00A0" : char}
                  {/* Individual character glow */}
                  <motion.div
                    className="absolute inset-0 bg-emerald-400 opacity-0 blur-sm -z-10"
                    whileHover={{ opacity: 0.2 }}
                    transition={{ duration: 0.2 }}
                  />
                </motion.span>
              ))}
            </div>
          </motion.h1>
        </motion.div>

        {/* Subtitle - Artistic 1x2 Column Layout */}
        <motion.div
          className="w-full max-w-6xl mx-auto mb-12 sm:mb-16 lg:mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Left Column - Main Description */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="relative bg-gradient-to-br from-white/90 via-blue-50/50 to-purple-50/40 rounded-3xl p-8 lg:p-10 border border-white/20 backdrop-blur-lg shadow-2xl shadow-blue-500/10 overflow-hidden group">
                {/* Animated background gradient */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-blue-500/10 opacity-50"
                  animate={{
                    background: [
                      "linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(147, 51, 234, 0.1) 50%, rgba(59, 130, 246, 0.1) 100%)",
                      "linear-gradient(135deg, rgba(147, 51, 234, 0.1) 0%, rgba(59, 130, 246, 0.1) 50%, rgba(147, 51, 234, 0.1) 100%)",
                      "linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(147, 51, 234, 0.1) 50%, rgba(59, 130, 246, 0.1) 100%)"
                    ]
                  }}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                />
                
                {/* Floating orbs */}
                <motion.div 
                  className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-blue-400/20 to-purple-500/20 rounded-full blur-xl"
                  animate={{ 
                    scale: [1, 1.3, 1],
                    rotate: [0, 180, 360],
                    x: [0, 10, 0],
                    y: [0, -10, 0]
                  }}
                  transition={{ 
                    duration: 6, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <motion.div 
                  className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-purple-400/20 to-blue-500/20 rounded-full blur-lg"
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [360, 180, 0],
                    x: [0, -8, 0],
                    y: [0, 8, 0]
                  }}
                  transition={{ 
                    duration: 5, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                
                <motion.p 
                  className="text-lg lg:text-xl xl:text-2xl text-black/80 leading-relaxed relative z-10 font-light" 
                  style={{ letterSpacing: '0.02em', lineHeight: '1.6' }}
                  whileHover="hover"
                  initial="initial"
                >
                  {"I design and build digital experiences that connect people with technology through innovative solutions".split(" ").map((word, wordIndex) => (
                    <React.Fragment key={wordIndex}>
                      <motion.span
                        className="inline-block"
                        variants={{
                          initial: { 
                            y: 0, 
                            opacity: 0.8,
                            color: "rgba(0, 0, 0, 0.8)"
                          },
                          hover: { 
                            y: -3,
                            opacity: 1,
                            color: "#000",
                            textShadow: "0 4px 15px rgba(0, 0, 0, 0.1)"
                          }
                        }}
                        transition={{ 
                          duration: 0.3, 
                          delay: wordIndex * 0.03,
                          ease: "easeOut"
                        }}
                        whileHover={{
                          y: -6,
                          color: "#6366f1",
                          textShadow: "0 8px 25px rgba(99, 102, 241, 0.4)",
                          scale: 1.02
                        }}
                      >
                        {word}
                      </motion.span>
                      {wordIndex < "I design and build digital experiences that connect people with technology through innovative solutions".split(" ").length - 1 && <span> </span>}
                    </React.Fragment>
                  ))}
                </motion.p>
                
                {/* Artistic corner accent */}
                <motion.div
                  className="absolute top-4 right-4 w-12 h-12 border-2 border-blue-400/30 rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <motion.div
                    className="absolute inset-2 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full opacity-20"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  />
                </motion.div>
              </div>
            </motion.div>

            {/* Right Column - Secondary Description */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <div className="relative bg-gradient-to-br from-white/90 via-green-50/50 to-orange-50/40 rounded-3xl p-8 lg:p-10 border border-white/20 backdrop-blur-lg shadow-2xl shadow-emerald-500/10 overflow-hidden group">
                {/* Animated background gradient */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-orange-500/10 to-emerald-500/10 opacity-50"
                  animate={{
                    background: [
                      "linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(249, 115, 22, 0.1) 50%, rgba(16, 185, 129, 0.1) 100%)",
                      "linear-gradient(135deg, rgba(249, 115, 22, 0.1) 0%, rgba(16, 185, 129, 0.1) 50%, rgba(249, 115, 22, 0.1) 100%)",
                      "linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(249, 115, 22, 0.1) 50%, rgba(16, 185, 129, 0.1) 100%)"
                    ]
                  }}
                  transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                />
                
                {/* Floating orbs */}
                <motion.div 
                  className="absolute -top-3 -left-3 w-16 h-16 bg-gradient-to-br from-emerald-400/20 to-orange-500/20 rounded-full blur-lg"
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [360, 180, 0],
                    x: [0, -8, 0],
                    y: [0, 8, 0]
                  }}
                  transition={{ 
                    duration: 4, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <motion.div 
                  className="absolute -bottom-3 -right-3 w-14 h-14 bg-gradient-to-br from-orange-400/20 to-emerald-500/20 rounded-full blur-xl"
                  animate={{ 
                    scale: [1, 1.4, 1],
                    rotate: [0, 180, 360],
                    x: [0, 6, 0],
                    y: [0, -6, 0]
                  }}
                  transition={{ 
                    duration: 7, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                
                <motion.p 
                  className="text-base lg:text-lg xl:text-xl text-black/70 leading-relaxed relative z-10 font-light" 
                  style={{ letterSpacing: '0.02em', lineHeight: '1.6' }}
                  whileHover="hover"
                  initial="initial"
                >
                  {"From concept to deployment, I craft scalable applications with clean code and modern architecture".split(" ").map((word, wordIndex) => (
                    <React.Fragment key={wordIndex}>
                      <motion.span
                        className="inline-block"
                        variants={{
                          initial: { 
                            y: 0, 
                            opacity: 0.7,
                            color: "rgba(0, 0, 0, 0.7)"
                          },
                          hover: { 
                            y: -3,
                            opacity: 1,
                            color: "#000",
                            textShadow: "0 4px 15px rgba(0, 0, 0, 0.1)"
                          }
                        }}
                        transition={{ 
                          duration: 0.3, 
                          delay: wordIndex * 0.02,
                          ease: "easeOut"
                        }}
                        whileHover={{
                          y: -6,
                          color: "#10b981",
                          textShadow: "0 8px 25px rgba(16, 185, 129, 0.4)",
                          scale: 1.02
                        }}
                      >
                        {word}
                      </motion.span>
                      {wordIndex < "From concept to deployment, I craft scalable applications with clean code and modern architecture".split(" ").length - 1 && <span> </span>}
                    </React.Fragment>
                  ))}
                </motion.p>
                
                {/* Artistic corner accent */}
                <motion.div
                  className="absolute bottom-4 left-4 w-10 h-10 border-2 border-emerald-400/30 rounded-lg"
                  animate={{ 
                    rotate: [0, 90, 180, 270, 360],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    duration: 12, 
                    repeat: Infinity, 
                    ease: "linear"
                  }}
                >
                  <motion.div
                    className="absolute inset-1 bg-gradient-to-br from-emerald-400 to-orange-500 rounded opacity-20"
                    animate={{ 
                      opacity: [0.2, 0.4, 0.2],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Expertise Section */}
        <motion.div
          className="mb-12 sm:mb-16 lg:mb-20 w-full max-w-7xl mx-auto relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
        >
          {/* Artistic background for section */}
          <motion.div
            className="absolute -inset-16 bg-gradient-to-r from-transparent via-blue-500/5 to-transparent rounded-full blur-3xl"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          <motion.h2 
            className="relative text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-extralight text-black mb-8 sm:mb-12 lg:mb-16 text-center" 
            style={{ letterSpacing: '0.1em' }}
            whileHover={{ scale: 1.005, textShadow: "0 6px 25px rgba(0, 0, 0, 0.06)" }}
            transition={{ duration: 0.3 }}
          >
            {"m y   e x p e r t i s e".split("").map((char, index) => (
              <motion.span
                key={index}
                className="inline-block relative"
                whileHover={{ 
                  y: -12,
                  color: "#6366f1",
                  textShadow: "0 0 20px rgba(99, 102, 241, 0.6)"
                }}
                animate={{
                  y: [0, -1, 0],
                  textShadow: ["0 0 0px rgba(99, 102, 241, 0)", "0 0 5px rgba(99, 102, 241, 0.1)", "0 0 0px rgba(99, 102, 241, 0)"]
                }}
                transition={{ 
                  duration: 0.3, 
                  delay: index * 0.04,
                  repeat: Infinity,
                  repeatDelay: 8 + index * 0.1,
                  ease: "easeInOut"
                }}
              >
                {char === " " ? "\u00A0" : char}
                {/* Character glow effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 opacity-0 blur-sm -z-10"
                  whileHover={{ opacity: 0.3 }}
                  transition={{ duration: 0.2 }}
                />
              </motion.span>
            ))}
          </motion.h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12 w-full px-2 sm:px-0">
            {/* Frontend */}
            <motion.div 
              className="group relative px-0 sm:px-2 lg:px-4 py-0 sm:py-2 lg:py-4"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              whileHover={{ y: -4 }}
            >
              <div className="relative">
                <div className="flex flex-col sm:flex-row sm:items-center mb-6 sm:mb-8 relative">
                  <motion.span 
                    className="text-4xl sm:text-5xl lg:text-6xl font-light text-black/8 mb-2 sm:mb-0 sm:mr-6 group-hover:text-blue-500/15 transition-colors duration-500 leading-none"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  >
                    01
                  </motion.span>
                  <motion.h3 
                    className="text-xl sm:text-2xl lg:text-3xl font-medium relative overflow-hidden" 
                    style={{ 
                      letterSpacing: '0.1em',
                      color: '#000',
                      fontWeight: '500'
                    }}
                    whileHover="hover"
                    initial="initial"
                  >
                    {"Frontend".split("").map((char, index) => (
                      <motion.span
                        key={index}
                        className="inline-block relative"
                        style={{ color: '#000' }}
                        variants={{
                          initial: { 
                            y: 0, 
                            opacity: 1,
                            color: '#000'
                          },
                          hover: { 
                            y: [0, -8, -16, -8, 0],
                            color: "#3b82f6",
                            scale: [1, 1.05, 1.1, 1.05, 1]
                          }
                        }}
                        transition={{ 
                          duration: 0.6, 
                          delay: index * 0.08,
                          ease: "easeInOut"
                        }}
                      >
                        {char}
                      </motion.span>
                    ))}
                  </motion.h3>
                </div>
                <motion.p 
                  className="text-sm sm:text-base lg:text-lg text-black/60 leading-relaxed mb-6 sm:mb-8 group-hover:text-black/80 transition-colors duration-300"
                  initial={{ opacity: 0.8 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  Creating beautiful, responsive interfaces with React, Next.js, and modern CSS frameworks. 
                  I focus on user experience and performance optimization.
                </motion.p>
                <motion.div 
                  className="space-y-2 sm:space-y-3"
                  initial={{ opacity: 0.6 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div 
                    className="text-xs sm:text-sm lg:text-base text-black/40 group-hover:text-blue-500 transition-colors duration-300 cursor-pointer flex items-center"
                    whileHover={{ x: 6 }} 
                    transition={{ duration: 0.2 }}
                  >
                    <span className="mr-3">→</span> React / Next.js
                  </motion.div>
                  <motion.div 
                    className="text-xs sm:text-sm lg:text-base text-black/40 group-hover:text-blue-500 transition-colors duration-300 cursor-pointer flex items-center"
                    whileHover={{ x: 6 }} 
                    transition={{ duration: 0.2, delay: 0.05 }}
                  >
                    <span className="mr-3">→</span> TypeScript
                  </motion.div>
                  <motion.div 
                    className="text-xs sm:text-sm lg:text-base text-black/40 group-hover:text-blue-500 transition-colors duration-300 cursor-pointer flex items-center"
                    whileHover={{ x: 6 }} 
                    transition={{ duration: 0.2, delay: 0.1 }}
                  >
                    <span className="mr-3">→</span> Tailwind CSS
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>

            {/* Backend */}
            <motion.div 
              className="group relative px-0 sm:px-2 lg:px-4 py-0 sm:py-2 lg:py-4"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ y: -4 }}
            >
              <div className="relative">
                <div className="flex flex-col sm:flex-row sm:items-center mb-6 sm:mb-8 relative">
                  <motion.span 
                    className="text-4xl sm:text-5xl lg:text-6xl font-light text-black/8 mb-2 sm:mb-0 sm:mr-6 group-hover:text-green-500/15 transition-colors duration-500 leading-none"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  >
                    02
                  </motion.span>
                  <motion.h3 
                    className="text-xl sm:text-2xl lg:text-3xl font-medium relative overflow-hidden" 
                    style={{ 
                      letterSpacing: '0.1em',
                      color: '#000',
                      fontWeight: '500'
                    }}
                    whileHover="hover"
                    initial="initial"
                  >
                    {"Backend".split("").map((char, index) => (
                      <motion.span
                        key={index}
                        className="inline-block relative"
                        style={{ color: '#000' }}
                        variants={{
                          initial: { 
                            y: 0, 
                            opacity: 1,
                            color: '#000'
                          },
                          hover: { 
                            y: [0, -8, -16, -8, 0],
                            color: "#22c55e",
                            scale: [1, 1.05, 1.1, 1.05, 1]
                          }
                        }}
                        transition={{ 
                          duration: 0.6, 
                          delay: index * 0.08,
                          ease: "easeInOut"
                        }}
                      >
                        {char}
                      </motion.span>
                    ))}
                  </motion.h3>
                </div>
                <motion.p 
                  className="text-sm sm:text-base lg:text-lg text-black/60 leading-relaxed mb-6 sm:mb-8 group-hover:text-black/80 transition-colors duration-300"
                  initial={{ opacity: 0.8 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  Building robust server-side solutions with Node.js, Python, and cloud technologies. 
                  Expertise in APIs, databases, and microservices architecture.
                </motion.p>
                <motion.div 
                  className="space-y-2 sm:space-y-3"
                  initial={{ opacity: 0.6 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div 
                    className="text-xs sm:text-sm lg:text-base text-black/40 group-hover:text-green-500 transition-colors duration-300 cursor-pointer flex items-center"
                    whileHover={{ x: 6 }} 
                    transition={{ duration: 0.2 }}
                  >
                    <span className="mr-3">→</span> Node.js / Python
                  </motion.div>
                  <motion.div 
                    className="text-xs sm:text-sm lg:text-base text-black/40 group-hover:text-green-500 transition-colors duration-300 cursor-pointer flex items-center"
                    whileHover={{ x: 6 }} 
                    transition={{ duration: 0.2, delay: 0.05 }}
                  >
                    <span className="mr-3">→</span> PostgreSQL / MongoDB
                  </motion.div>
                  <motion.div 
                    className="text-xs sm:text-sm lg:text-base text-black/40 group-hover:text-green-500 transition-colors duration-300 cursor-pointer flex items-center"
                    whileHover={{ x: 6 }} 
                    transition={{ duration: 0.2, delay: 0.1 }}
                  >
                    <span className="mr-3">→</span> AWS / Docker
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>

            {/* Mobile */}
            <motion.div 
              className="group relative px-0 sm:px-2 lg:px-4 py-0 sm:py-2 lg:py-4"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{ y: -4 }}
            >
              <div className="relative">
                <div className="flex flex-col sm:flex-row sm:items-center mb-6 sm:mb-8 relative">
                  <motion.span 
                    className="text-4xl sm:text-5xl lg:text-6xl font-light text-black/8 mb-2 sm:mb-0 sm:mr-6 group-hover:text-purple-500/15 transition-colors duration-500 leading-none"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  >
                    03
                  </motion.span>
                  <motion.h3 
                    className="text-xl sm:text-2xl lg:text-3xl font-medium relative overflow-hidden" 
                    style={{ 
                      letterSpacing: '0.1em',
                      color: '#000',
                      fontWeight: '500'
                    }}
                    whileHover="hover"
                    initial="initial"
                  >
                    {"Mobile".split("").map((char, index) => (
                      <motion.span
                        key={index}
                        className="inline-block relative"
                        style={{ color: '#000' }}
                        variants={{
                          initial: { 
                            y: 0, 
                            opacity: 1,
                            color: '#000'
                          },
                          hover: { 
                            y: [0, -8, -16, -8, 0],
                            color: "#a855f7",
                            scale: [1, 1.05, 1.1, 1.05, 1]
                          }
                        }}
                        transition={{ 
                          duration: 0.6, 
                          delay: index * 0.08,
                          ease: "easeInOut"
                        }}
                      >
                        {char}
                      </motion.span>
                    ))}
                  </motion.h3>
                </div>
                <motion.p 
                  className="text-sm sm:text-base lg:text-lg text-black/60 leading-relaxed mb-6 sm:mb-8 group-hover:text-black/80 transition-colors duration-300"
                  initial={{ opacity: 0.8 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  Developing cross-platform mobile applications using React Native and Flutter. 
                  Creating native-like experiences for iOS and Android.
                </motion.p>
                <motion.div 
                  className="space-y-2 sm:space-y-3"
                  initial={{ opacity: 0.6 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div 
                    className="text-xs sm:text-sm lg:text-base text-black/40 group-hover:text-purple-500 transition-colors duration-300 cursor-pointer flex items-center"
                    whileHover={{ x: 6 }} 
                    transition={{ duration: 0.2 }}
                  >
                    <span className="mr-3">→</span> React Native
                  </motion.div>
                  <motion.div 
                    className="text-xs sm:text-sm lg:text-base text-black/40 group-hover:text-purple-500 transition-colors duration-300 cursor-pointer flex items-center"
                    whileHover={{ x: 6 }} 
                    transition={{ duration: 0.2, delay: 0.05 }}
                  >
                    <span className="mr-3">→</span> Flutter
                  </motion.div>
                  <motion.div 
                    className="text-xs sm:text-sm lg:text-base text-black/40 group-hover:text-purple-500 transition-colors duration-300 cursor-pointer flex items-center"
                    whileHover={{ x: 6 }} 
                    transition={{ duration: 0.2, delay: 0.1 }}
                  >
                    <span className="mr-3">→</span> Native APIs
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>

            {/* DevOps */}
            <motion.div 
              className="group relative px-0 sm:px-2 lg:px-4 py-0 sm:py-2 lg:py-4"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              whileHover={{ y: -4 }}
            >
              <div className="relative">
                <div className="flex flex-col sm:flex-row sm:items-center mb-6 sm:mb-8 relative">
                  <motion.span 
                    className="text-4xl sm:text-5xl lg:text-6xl font-light text-black/8 mb-2 sm:mb-0 sm:mr-6 group-hover:text-orange-500/15 transition-colors duration-500 leading-none"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  >
                    04
                  </motion.span>
                  <motion.h3 
                    className="text-xl sm:text-2xl lg:text-3xl font-medium relative overflow-hidden" 
                    style={{ 
                      letterSpacing: '0.1em',
                      color: '#000',
                      fontWeight: '500'
                    }}
                    whileHover="hover"
                    initial="initial"
                  >
                    {"DevOps".split("").map((char, index) => (
                      <motion.span
                        key={index}
                        className="inline-block relative"
                        style={{ color: '#000' }}
                        variants={{
                          initial: { 
                            y: 0, 
                            opacity: 1,
                            color: '#000'
                          },
                          hover: { 
                            y: [0, -8, -16, -8, 0],
                            color: "#f97316",
                            scale: [1, 1.05, 1.1, 1.05, 1]
                          }
                        }}
                        transition={{ 
                          duration: 0.6, 
                          delay: index * 0.08,
                          ease: "easeInOut"
                        }}
                      >
                        {char}
                      </motion.span>
                    ))}
                  </motion.h3>
                </div>
                <motion.p 
                  className="text-sm sm:text-base lg:text-lg text-black/60 leading-relaxed mb-6 sm:mb-8 group-hover:text-black/80 transition-colors duration-300"
                  initial={{ opacity: 0.8 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  Implementing CI/CD pipelines, cloud infrastructure, and monitoring solutions. 
                  Ensuring scalable and reliable deployment processes.
                </motion.p>
                <motion.div 
                  className="space-y-2 sm:space-y-3"
                  initial={{ opacity: 0.6 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div 
                    className="text-xs sm:text-sm lg:text-base text-black/40 group-hover:text-orange-500 transition-colors duration-300 cursor-pointer flex items-center"
                    whileHover={{ x: 6 }} 
                    transition={{ duration: 0.2 }}
                  >
                    <span className="mr-3">→</span> GitHub Actions
                  </motion.div>
                  <motion.div 
                    className="text-xs sm:text-sm lg:text-base text-black/40 group-hover:text-orange-500 transition-colors duration-300 cursor-pointer flex items-center"
                    whileHover={{ x: 6 }} 
                    transition={{ duration: 0.2, delay: 0.05 }}
                  >
                    <span className="mr-3">→</span> AWS / Vercel
                  </motion.div>
                  <motion.div 
                    className="text-xs sm:text-sm lg:text-base text-black/40 group-hover:text-orange-500 transition-colors duration-300 cursor-pointer flex items-center"
                    whileHover={{ x: 6 }} 
                    transition={{ duration: 0.2, delay: 0.1 }}
                  >
                    <span className="mr-3">→</span> Monitoring
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Contact Section */}
        <motion.div
          className="border-t border-black/8 pt-8 sm:pt-12 lg:pt-16 w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9, ease: "easeOut" }}
        >
          <div className="flex flex-col lg:flex-row justify-between items-center w-full gap-8 lg:gap-12">
            <motion.div 
              className="text-center lg:text-left w-full lg:w-auto"
              whileHover={{ scale: 1.005 }}
              transition={{ duration: 0.3 }}
            >
              <motion.h3 
                className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-extralight text-black mb-4 sm:mb-6 cursor-default" 
                style={{ letterSpacing: '0.08em' }}
                whileHover={{ color: "#6366f1" }}
                transition={{ duration: 0.3 }}
              >
                {"L e t ' s   c o l l a b o r a t e".split("").map((char, index) => (
                  <motion.span
                    key={index}
                    className="inline-block"
                    whileHover={{ 
                      y: -3,
                      color: "#6366f1"
                    }}
                    transition={{ 
                      duration: 0.2, 
                      delay: index * 0.03
                    }}
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
              </motion.h3>
              <motion.p 
                className="text-base sm:text-lg text-black/50 mb-8 font-light"
                whileHover={{ 
                  color: "#000",
                  scale: 1.02
                }}
                transition={{ duration: 0.3 }}
              >
                Ready to build something amazing together?
              </motion.p>
            </motion.div>
            {/* Social Links */}
            <div className="flex items-center space-x-10 mt-8 lg:mt-0">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="text-black/30 hover:text-black transition-colors duration-300 p-4 rounded-full bg-gray-50/30 border border-gray-100/30 backdrop-blur-sm"
                  whileHover={{ 
                    scale: 1.15,
                    y: -4,
                    backgroundColor: "#6366f1",
                    color: "#ffffff",
                    boxShadow: "0 15px 35px rgba(99, 102, 241, 0.25)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                >
                  <Icon className="w-6 h-6" />
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Enhanced Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2 }}
      >
        <motion.div
          className="flex flex-col items-center space-y-4 text-black/50 cursor-pointer group"
          animate={{ y: [0, -8, 0] }}
          transition={{ 
            duration: 3, 
            repeat: Infinity, 
            ease: "easeInOut"
          }}
          whileHover={{ scale: 1.1 }}
          onClick={() => {
            const aboutSection = document.getElementById('about');
            if (aboutSection) {
              aboutSection.scrollIntoView({ behavior: 'smooth' });
            }
          }}
        >
          <span className="text-xs font-light tracking-[0.3em] uppercase opacity-60 group-hover:opacity-100 transition-opacity">
            Explore
          </span>
          
          {/* Artistic scroll indicator */}
          <motion.div className="relative">
            {/* Outer ring */}
            <motion.div
              className="w-8 h-8 border-2 border-black/20 rounded-full relative"
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              {/* Inner dot */}
              <motion.div
                className="absolute inset-2 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full"
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.6, 1, 0.6]
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
            
            {/* Animated arrow */}
            <motion.div
              className="absolute top-10 left-1/2 transform -translate-x-1/2"
              animate={{ 
                y: [0, 6, 0],
                opacity: [0.4, 1, 0.4]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                ease: "easeInOut"
              }}
            >
              <ArrowDown className="w-4 h-4" />
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default HeroSection;