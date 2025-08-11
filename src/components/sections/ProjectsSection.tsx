'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useAnimation, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Play, Filter, X } from 'lucide-react';

const ProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  const controls = useAnimation();
  const [selectedProject, setSelectedProject] = useState<unknown>(null);
  const [filter, setFilter] = useState('All');

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["100px", "-100px"]);

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  const projects = [
    {
      id: 1,
      title: 'AI-Powered Dashboard',
      category: 'Web App',
      description: 'A modern analytics dashboard with AI-driven insights and real-time data visualization.',
      longDescription: 'This comprehensive dashboard leverages machine learning algorithms to provide actionable insights from complex datasets. Built with Next.js, TypeScript, and integrated with various AI APIs for predictive analytics.',
      image: '/api/placeholder/600/400',
      technologies: ['Next.js', 'TypeScript', 'AI/ML', 'Chart.js', 'PostgreSQL'],
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com',
      featured: true,
    },
    {
      id: 2,
      title: '3D Portfolio Website',
      category: 'Web Design',
      description: 'An immersive 3D portfolio experience built with Three.js and modern web technologies.',
      longDescription: 'Interactive 3D portfolio showcasing creative work through stunning visual experiences. Features particle systems, 3D models, and smooth animations powered by Three.js and GSAP.',
      image: '/api/placeholder/600/400',
      technologies: ['Three.js', 'React', 'GSAP', 'Blender', 'WebGL'],
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com',
      featured: true,
    },
    {
      id: 3,
      title: 'E-Commerce Platform',
      category: 'Full Stack',
      description: 'Complete e-commerce solution with payment integration and admin dashboard.',
      longDescription: 'Full-featured e-commerce platform with user authentication, payment processing, inventory management, and comprehensive admin dashboard. Built for scalability and performance.',
      image: '/api/placeholder/600/400',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Docker'],
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com',
      featured: false,
    },
    {
      id: 4,
      title: 'Mobile Fitness App',
      category: 'Mobile',
      description: 'Cross-platform fitness tracking app with social features and workout plans.',
      longDescription: 'Comprehensive fitness application with workout tracking, social features, and personalized training plans. Includes real-time stats, progress visualization, and community challenges.',
      image: '/api/placeholder/600/400',
      technologies: ['React Native', 'Firebase', 'Node.js', 'MongoDB', 'Socket.io'],
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com',
      featured: false,
    },
    {
      id: 5,
      title: 'Brand Identity System',
      category: 'Design',
      description: 'Complete brand identity and design system for a tech startup.',
      longDescription: 'Comprehensive brand identity including logo design, color palette, typography, and complete design system. Created brand guidelines and marketing materials for consistent brand presence.',
      image: '/api/placeholder/600/400',
      technologies: ['Figma', 'Adobe CS', 'Sketch', 'Principle', 'InVision'],
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com',
      featured: true,
    },
    {
      id: 6,
      title: 'Real-time Chat App',
      category: 'Web App',
      description: 'Real-time messaging platform with video calls and file sharing.',
      longDescription: 'Modern chat application with real-time messaging, video calls, file sharing, and group management. Features end-to-end encryption and cross-platform compatibility.',
      image: '/api/placeholder/600/400',
      technologies: ['React', 'Socket.io', 'WebRTC', 'Node.js', 'Redis'],
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com',
      featured: false,
    },
  ];

  const categories = ['All', 'Web App', 'Web Design', 'Full Stack', 'Mobile', 'Design'];
  
  const filteredProjects = filter === 'All' 
    ? projects 
    : projects.filter(project => project.category === filter);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
  };

  return (
    <section id="projects" className="section-ultra overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <motion.div 
          style={{ y }}
          className="absolute top-0 left-1/3 w-96 h-96 xl:w-[32rem] xl:h-[32rem] 2xl:w-[40rem] 2xl:h-[40rem] bg-blue-500/5 rounded-full blur-3xl" 
        />
        <motion.div 
          style={{ y: useTransform(scrollYProgress, [0, 1], ["-100px", "100px"]) }}
          className="absolute bottom-0 right-1/3 w-96 h-96 xl:w-[40rem] xl:h-[40rem] 2xl:w-[48rem] 2xl:h-[48rem] bg-purple-500/5 rounded-full blur-3xl" 
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
            Featured <span className="text-gradient">Projects</span>
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="content-large text-gray-400 max-w-4xl mx-auto mb-12 xl:mb-16 2xl:mb-20"
          >
            A showcase of my latest work and creative endeavors
          </motion.p>

          {/* Filter Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-3 xl:gap-4 2xl:gap-6 mb-12 xl:mb-16 2xl:mb-20"
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`btn-medium transition-all duration-300 ${
                  filter === category
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                    : 'glass text-gray-300 hover:text-white'
                }`}
              >
                {category}
              </button>
            ))}
          </motion.div>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-12 2xl:gap-16"
        >
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              layout
              whileHover={{ y: -5 }}
              className={`group relative overflow-hidden card-large cursor-pointer ${
                project.featured ? 'md:col-span-2 lg:col-span-2' : ''
              }`}
              onClick={() => setSelectedProject(project)}
            >
              {/* Project Image */}
              <div className="relative overflow-hidden">
                <div className={`${project.featured ? 'aspect-[16/9]' : 'aspect-[4/3]'} bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center`}>
                  <Play className={`${project.featured ? 'w-16 h-16 xl:w-20 xl:h-20 2xl:w-24 2xl:h-24' : 'w-12 h-12 xl:w-16 xl:h-16 2xl:w-20 2xl:h-20'} text-white opacity-60`} />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Overlay Icons */}
                <div className="absolute top-6 xl:top-8 2xl:top-10 right-6 xl:right-8 2xl:right-10 flex space-x-3 xl:space-x-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <motion.a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-3 xl:p-4 2xl:p-5 glass rounded-full text-white"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ExternalLink className="w-5 h-5 xl:w-6 xl:h-6 2xl:w-8 2xl:h-8" />
                  </motion.a>
                  <motion.a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-3 xl:p-4 2xl:p-5 glass rounded-full text-white"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Github className="w-5 h-5 xl:w-6 xl:h-6 2xl:w-8 2xl:h-8" />
                  </motion.a>
                </div>

                {project.featured && (
                  <div className="absolute top-6 xl:top-8 2xl:top-10 left-6 xl:left-8 2xl:left-10">
                    <span className="px-4 xl:px-6 2xl:px-8 py-2 xl:py-3 2xl:py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-sm xl:text-base 2xl:text-lg font-semibold rounded-full">
                      Featured
                    </span>
                  </div>
                )}
              </div>

              {/* Project Info */}
              <div className="p-6 xl:p-8 2xl:p-10">
                <div className="flex justify-between items-start mb-4 xl:mb-6 2xl:mb-8">
                  <h3 className="text-xl xl:text-2xl 2xl:text-3xl font-bold text-white group-hover:text-blue-400 transition-colors">
                    {project.title}
                  </h3>
                  <span className="text-sm xl:text-base 2xl:text-lg text-blue-400 bg-blue-400/10 px-3 xl:px-4 2xl:px-6 py-1 xl:py-2 2xl:py-3 rounded-full">
                    {project.category}
                  </span>
                </div>
                
                <p className="text-gray-400 text-base xl:text-lg 2xl:text-xl mb-6 xl:mb-8 2xl:mb-10 leading-relaxed line-clamp-2">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 xl:gap-3 2xl:gap-4">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="text-sm xl:text-base 2xl:text-lg text-gray-300 bg-gray-700/50 px-3 xl:px-4 2xl:px-6 py-1 xl:py-2 2xl:py-3 rounded"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="text-sm xl:text-base 2xl:text-lg text-gray-400">
                      +{project.technologies.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6 xl:p-8 2xl:p-12 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="max-w-6xl xl:max-w-7xl 2xl:max-w-8xl w-full glass rounded-2xl xl:rounded-3xl overflow-hidden max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <div className="aspect-[16/9] bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                  <Play className="w-16 h-16 xl:w-20 xl:h-20 2xl:w-24 2xl:h-24 text-white opacity-60" />
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-6 xl:top-8 2xl:top-10 right-6 xl:right-8 2xl:right-10 p-3 xl:p-4 2xl:p-5 glass rounded-full text-white"
                >
                  <X className="w-6 h-6 xl:w-8 xl:h-8 2xl:w-10 2xl:h-10" />
                </button>
              </div>

              <div className="p-8 xl:p-12 2xl:p-16">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-6 xl:mb-8 2xl:mb-12 gap-6 xl:gap-8">
                  <div>
                    <h3 className="text-3xl xl:text-4xl 2xl:text-5xl font-bold text-white mb-4 xl:mb-6 2xl:mb-8">{selectedProject.title}</h3>
                    <span className="text-blue-400 bg-blue-400/10 px-4 xl:px-6 2xl:px-8 py-2 xl:py-3 2xl:py-4 rounded-full text-base xl:text-lg 2xl:text-xl">
                      {selectedProject.category}
                    </span>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4 xl:gap-6 2xl:gap-8">
                    <a
                      href={selectedProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-large bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium flex items-center justify-center space-x-3"
                    >
                      <ExternalLink className="w-5 h-5 xl:w-6 xl:h-6 2xl:w-8 2xl:h-8" />
                      <span>Live Demo</span>
                    </a>
                    <a
                      href={selectedProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-large glass text-white font-medium flex items-center justify-center space-x-3"
                    >
                      <Github className="w-5 h-5 xl:w-6 xl:h-6 2xl:w-8 2xl:h-8" />
                      <span>Code</span>
                    </a>
                  </div>
                </div>

                <p className="text-gray-300 content-large mb-8 xl:mb-12 2xl:mb-16 leading-relaxed">
                  {selectedProject.longDescription}
                </p>

                <div>
                  <h4 className="text-white text-xl xl:text-2xl 2xl:text-3xl font-semibold mb-6 xl:mb-8 2xl:mb-10">Technologies Used</h4>
                  <div className="flex flex-wrap gap-3 xl:gap-4 2xl:gap-6">
                    {selectedProject.technologies.map((tech: string) => (
                      <span
                        key={tech}
                        className="text-base xl:text-lg 2xl:text-xl text-gray-300 bg-gray-700/50 px-4 xl:px-6 2xl:px-8 py-2 xl:py-3 2xl:py-4 rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ProjectsSection;
