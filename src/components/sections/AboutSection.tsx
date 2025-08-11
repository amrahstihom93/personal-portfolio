'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });
  const controls = useAnimation();
  
  // Typing effect state
  const [displayedText, setDisplayedText] = useState('');
  const [showTyping, setShowTyping] = useState(false);
  // Removed unused currentWordIndex and setCurrentWordIndex

  const bioText = "I&apos;m a passionate full-stack developer with a strong foundation in web development. With 5+ years of experience, I&apos;m skilled in languages like JavaScript, TypeScript, and modern frameworks. I&apos;m enthusiastic about staying informed on the latest trends while eagerly embracing new technologies.";

  // Typing effect
  useEffect(() => {
    if (showTyping) {
      let i = 0;
      const typingInterval = setInterval(() => {
        if (i < bioText.length) {
          setDisplayedText(bioText.slice(0, i + 1));
          i++;
        } else {
          clearInterval(typingInterval);
        }
      }, 30);
      return () => clearInterval(typingInterval);
    }
  }, [showTyping, bioText]);

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
      setTimeout(() => setShowTyping(true), 800);
    }
  }, [isInView, controls]);

  // Professional skills categorized like Omkar's site
  const coreSkills = [
    { name: 'HTML', level: 95 },
    { name: 'CSS', level: 92 },
    { name: 'JavaScript', level: 90 }
  ];

  const frameworks = [
    { name: 'React', level: 88 },
    { name: 'Next.js', level: 85 },
    { name: 'TypeScript', level: 82 },
    { name: 'Node.js', level: 80 },
    { name: 'GSAP', level: 75 }
  ];

  const tools = [
    { name: 'Git', level: 90 },
    { name: 'Figma', level: 85 },
    { name: 'Vercel', level: 88 },
    { name: 'AWS', level: 75 }
  ];

  const journey = [
    {
      title: 'Freelance Developer',
      company: 'Self-employed',
      period: 'Present',
      type: 'current'
    },
    {
      title: 'Sr. Frontend Developer',
      company: 'Tech Solutions',
      period: '2022-23',
      type: 'experience'
    },
    {
      title: 'Frontend Engineer',
      company: 'Digital Agency',
      period: '2020-22',
      type: 'experience'
    },
    {
      title: 'Web Developer',
      company: 'StartUp Inc',
      period: '2019-20',
      type: 'experience'
    },
    {
      title: 'Computer Science',
      company: 'University',
      period: '2015-19',
      type: 'education'
    }
  ];

  return (
    <section id="about" className="relative min-h-screen w-full bg-gray-900 overflow-hidden">
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 py-32" ref={ref}>
        
        {/* Gosavi-style Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-32"
        >
          {/* Small intro text */}
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <span className="text-xs font-mono uppercase tracking-[0.3em] text-white/60">
              About Me
            </span>
          </motion.div>

          {/* Main heading - Gosavi style */}
          <motion.h1 
            className="text-[3rem] md:text-[4rem] lg:text-[5.5rem] xl:text-[6.5rem] font-light leading-[0.9] tracking-[-0.02em] text-white mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
          >
            I'm a passionate<br />
            <span className="italic font-light text-white/70">full-stack developer</span>
          </motion.h1>

          {/* Description - Clean and minimal */}
          <motion.div
            className="max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <p className="text-lg md:text-xl leading-relaxed text-white/80 font-light mb-8">
              {displayedText}
              {showTyping && displayedText.length < bioText.length && (
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                  className="text-white/50"
                >
                  |
                </motion.span>
              )}
            </p>
          </motion.div>
        </motion.div>

        {/* Gosavi-style Two Column Layout */}
        <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 mb-32">
          {/* Left Column - Skills */}
          <motion.div
            className="lg:col-span-5"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 1, duration: 0.8 }}
          >
            <div className="sticky top-32">
              <span className="text-xs font-mono uppercase tracking-[0.3em] text-white/50 mb-8 block">
                Technologies
              </span>
              
              <div className="space-y-6">
                {[...coreSkills, ...frameworks.slice(0, 3), ...tools.slice(0, 2)].map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 1.2 + index * 0.1, duration: 0.5 }}
                    className="group"
                  >
                    <div className="flex items-center justify-between py-3 border-b border-white/10 hover:border-white/20 transition-colors duration-300">
                      <span className="text-base font-light text-white group-hover:text-white/70 transition-colors">
                        {skill.name}
                      </span>
                      <span className="text-xs font-mono text-white/60">
                        {skill.level}%
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column - Experience */}
          <motion.div
            className="lg:col-span-7"
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 1.1, duration: 0.8 }}
          >
            <span className="text-xs font-mono uppercase tracking-[0.3em] text-white/50 mb-8 block">
              Experience
            </span>
            
            <div className="space-y-12">
              {journey.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 1.3 + index * 0.1, duration: 0.6 }}
                  className="group"
                >
                  <div className="mb-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-xl font-light text-white group-hover:text-white/70 transition-colors">
                        {item.title}
                      </h3>
                      <span className="text-xs font-mono text-white/60 whitespace-nowrap ml-4">
                        {item.period}
                      </span>
                    </div>
                    <p className="text-base text-white/70 font-light">{item.company}</p>
                  </div>
                  <div className="w-full h-px bg-white/10 group-hover:bg-white/20 transition-colors duration-300"></div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Gosavi-style Contact CTA */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.8, duration: 0.8 }}
        >
          <motion.a
            href="#contact"
            className="inline-flex items-center group text-white hover:text-white/60 transition-colors duration-300"
            whileHover={{ y: -2 }}
            transition={{ duration: 0.2 }}
          >
            <span className="text-base font-light tracking-wide mr-3">
              Let's work together
            </span>
            <motion.div
              className="w-8 h-px bg-white group-hover:w-12 transition-all duration-300"
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};
export default AboutSection;
