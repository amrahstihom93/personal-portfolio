'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation, useInView, useScroll, useTransform } from 'framer-motion';
import { 
  Code, 
  Palette, 
  Database, 
  Smartphone, 
  Globe, 
  Zap,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const SkillsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  const controls = useAnimation();
  const [activeCategory, setActiveCategory] = useState(0);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["50px", "-50px"]);

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  const skillCategories = [
    {
      title: 'Frontend',
      icon: Code,
      color: 'from-blue-500 to-cyan-500',
      skills: [
        { name: 'React/Next.js', level: 95, icon: '⚛️' },
        { name: 'TypeScript', level: 90, icon: '📘' },
        { name: 'Tailwind CSS', level: 88, icon: '🎨' },
        { name: 'Three.js', level: 85, icon: '🎮' },
        { name: 'Framer Motion', level: 92, icon: '🎭' },
        { name: 'Vue.js', level: 80, icon: '💚' },
      ]
    },
    {
      title: 'Backend',
      icon: Database,
      color: 'from-purple-500 to-pink-500',
      skills: [
        { name: 'Node.js', level: 90, icon: '💚' },
        { name: 'Python', level: 85, icon: '🐍' },
        { name: 'PostgreSQL', level: 88, icon: '🐘' },
        { name: 'MongoDB', level: 82, icon: '🍃' },
        { name: 'GraphQL', level: 78, icon: '📊' },
        { name: 'Docker', level: 85, icon: '🐳' },
      ]
    },
    {
      title: 'Design',
      icon: Palette,
      color: 'from-pink-500 to-orange-500',
      skills: [
        { name: 'Figma', level: 92, icon: '🎨' },
        { name: 'Adobe Creative Suite', level: 88, icon: '🎪' },
        { name: 'Blender', level: 75, icon: '🎭' },
        { name: 'UI/UX Design', level: 90, icon: '✨' },
        { name: 'Prototyping', level: 85, icon: '🔧' },
        { name: 'Brand Design', level: 80, icon: '🎯' },
      ]
    },
    {
      title: 'Mobile',
      icon: Smartphone,
      color: 'from-green-500 to-teal-500',
      skills: [
        { name: 'React Native', level: 85, icon: '📱' },
        { name: 'Flutter', level: 78, icon: '💙' },
        { name: 'iOS Development', level: 75, icon: '🍎' },
        { name: 'Android Development', level: 80, icon: '🤖' },
        { name: 'PWA', level: 88, icon: '⚡' },
        { name: 'Ionic', level: 70, icon: '⚡' },
      ]
    }
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  const nextCategory = () => {
    setActiveCategory((prev) => (prev + 1) % skillCategories.length);
  };

  const prevCategory = () => {
    setActiveCategory((prev) => (prev - 1 + skillCategories.length) % skillCategories.length);
  };

  return (
    <section id="skills" className="section-ultra overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.1),transparent_50%)]" />
        <motion.div 
          style={{ y }}
          className="absolute top-1/4 left-1/4 w-72 h-72 xl:w-96 xl:h-96 2xl:w-[32rem] 2xl:h-[32rem] bg-blue-500/5 rounded-full blur-3xl" 
        />
        <motion.div 
          style={{ y: useTransform(scrollYProgress, [0, 1], ["-50px", "50px"]) }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 xl:w-[32rem] xl:h-[32rem] 2xl:w-[40rem] 2xl:h-[40rem] bg-purple-500/5 rounded-full blur-3xl" 
        />
      </div>

      <div className="container-ultra" ref={ref}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="text-center mb-16 xl:mb-20 2xl:mb-24"
        >
          <motion.h2
            variants={itemVariants}
            className="heading-large mb-6 xl:mb-8 2xl:mb-12"
          >
            My <span className="text-gradient">Skills</span>
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="content-large text-gray-400 max-w-4xl mx-auto"
          >
            A comprehensive toolkit of modern technologies and creative skills
          </motion.p>
        </motion.div>

        {/* Mobile Category Selector */}
        <div className="lg:hidden mb-8 xl:mb-12">
          <div className="flex items-center justify-between bg-gray-800/50 rounded-xl p-6">
            <button
              onClick={prevCategory}
              className="p-3 glass rounded-xl hover:bg-white/10 transition-colors"
            >
              <ChevronLeft className="w-6 h-6 text-gray-400" />
            </button>
            
            <div className="flex items-center space-x-4">
              <div className={`p-3 rounded-xl bg-gradient-to-r ${skillCategories[activeCategory].color}`}>
                {React.createElement(skillCategories[activeCategory].icon, { className: "w-6 h-6 text-white" })}
              </div>
              <span className="font-medium text-white text-xl">
                {skillCategories[activeCategory].title}
              </span>
            </div>
            
            <button
              onClick={nextCategory}
              className="p-3 glass rounded-xl hover:bg-white/10 transition-colors"
            >
              <ChevronRight className="w-6 h-6 text-gray-400" />
            </button>
          </div>
        </div>

        <div className="skills-grid">
          {/* Category Navigation - Desktop */}
          <motion.div
            variants={itemVariants}
            className="hidden lg:block space-y-3 xl:space-y-4"
          >
            <h3 className="text-lg xl:text-xl 2xl:text-2xl font-semibold mb-4 xl:mb-6 text-white">Categories</h3>
            <div className="space-y-2">
              {skillCategories.map((category, index) => (
                <motion.button
                  key={category.title}
                  onClick={() => setActiveCategory(index)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`category-btn ${activeCategory === index ? 'active' : ''}`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg bg-gradient-to-r ${category.color}`}>
                      <category.icon className="w-5 h-5 xl:w-6 xl:h-6 text-white" />
                    </div>
                    <span className="font-medium text-sm xl:text-base">{category.title}</span>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Skills Display */}
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full"
          >
            <div className="card-large">
              <div className="flex justify-between items-center mb-6 xl:mb-8 2xl:mb-10">
                <h3 className="text-xl xl:text-2xl 2xl:text-3xl font-bold text-white">
                  {skillCategories[activeCategory].title} Skills
                </h3>
                <div className="hidden lg:flex space-x-2 xl:space-x-3">
                  <button
                    onClick={prevCategory}
                    className="p-2 xl:p-3 glass rounded-lg hover:bg-white/10 transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5 xl:w-6 xl:h-6 text-gray-400" />
                  </button>
                  <button
                    onClick={nextCategory}
                    className="p-2 xl:p-3 glass rounded-lg hover:bg-white/10 transition-colors"
                  >
                    <ChevronRight className="w-5 h-5 xl:w-6 xl:h-6 text-gray-400" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 xl:gap-6 2xl:gap-8">
                {skillCategories[activeCategory].skills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="space-y-3 xl:space-y-4 p-4 xl:p-5 2xl:p-6 rounded-lg hover:bg-white/5 transition-colors border border-gray-700/30"
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-2 xl:space-x-3">
                        <span className="text-lg xl:text-xl 2xl:text-2xl">{skill.icon}</span>
                        <span className="font-medium text-white text-sm xl:text-base 2xl:text-lg">{skill.name}</span>
                      </div>
                      <span className="text-xs xl:text-sm 2xl:text-base text-gray-400 font-mono">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2 xl:h-2.5 2xl:h-3">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                        className={`h-2 xl:h-2.5 2xl:h-3 rounded-full bg-gradient-to-r ${skillCategories[activeCategory].color}`}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Floating Tech Icons */}
        <div className="mt-20 xl:mt-32 2xl:mt-40 grid grid-cols-6 lg:grid-cols-12 gap-4 xl:gap-6 2xl:gap-8 opacity-20">
          {['⚛️', '📘', '🐍', '🎨', '🚀', '💚', '🐘', '📱', '⚡', '🎮', '🔧', '✨'].map((icon, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0 }}
              animate={isInView ? { opacity: 0.2, scale: 1 } : {}}
              transition={{ delay: 2 + index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.2, opacity: 0.6 }}
              className="text-4xl xl:text-5xl 2xl:text-6xl text-center cursor-pointer"
            >
              {icon}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
