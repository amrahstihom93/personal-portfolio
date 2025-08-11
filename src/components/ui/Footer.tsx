'use client';

import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Heart, ArrowUp, Github, Linkedin, Mail, Twitter, Phone, MapPin, MessageCircle } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["20px", "-20px"]);

  const socialLinks = [
    { icon: Github, href: 'https://github.com', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
    { icon: MessageCircle, href: 'https://discord.com', label: 'Discord' },
  ];

  const quickLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
  ];

  const services = [
  "Web Development",
  "Mobile Apps",
  "UI/UX Design",
  "Consulting",
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <footer className="relative bg-gray-900/80 backdrop-blur-lg border-t border-gray-800/50 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <motion.div 
          style={{ y }}
          className="absolute top-0 left-1/4 w-64 h-64 md:w-96 md:h-96 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-full blur-3xl" 
        />
        <motion.div 
          style={{ y: useTransform(scrollYProgress, [0, 1], ["-20px", "20px"]) }}
          className="absolute bottom-0 right-1/4 w-64 h-64 md:w-96 md:h-96 bg-gradient-to-r from-pink-500/5 to-orange-500/5 rounded-full blur-3xl" 
        />
      </div>

      <div className="relative z-10" ref={ref}>
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 lg:py-16">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12"
          >
            {/* Brand Section */}
            <motion.div variants={itemVariants} className="lg:col-span-1">
              <div className="mb-4 md:mb-6">
                <h3 className="text-xl md:text-2xl font-bold text-white mb-2 md:mb-4">
                  Your Name
                </h3>
                <p className="text-sm md:text-base text-gray-400 leading-relaxed">
                  Crafting digital experiences with passion and precision. 
                  Let&apos;s build something amazing together.
                </p>
              </div>
              
              {/* Contact Info */}
              <div className="space-y-2 md:space-y-3 mb-6">
                <a
                  href="mailto:hello@yourname.com"
                  className="flex items-center space-x-3 text-sm md:text-base text-gray-400 hover:text-white transition-colors group"
                >
                  <Mail size={16} className="md:w-5 md:h-5 group-hover:text-blue-400 transition-colors" />
                  <span>hello@yourname.com</span>
                </a>
                <a
                  href="tel:+15551234567"
                  className="flex items-center space-x-3 text-sm md:text-base text-gray-400 hover:text-white transition-colors group"
                >
                  <Phone size={16} className="md:w-5 md:h-5 group-hover:text-blue-400 transition-colors" />
                  <span>+1 (555) 123-4567</span>
                </a>
                <div className="flex items-center space-x-3 text-sm md:text-base text-gray-400">
                  <MapPin size={16} className="md:w-5 md:h-5" />
                  <span>New York, NY</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex space-x-3 md:space-x-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 md:p-3 bg-gray-800/50 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700/50 transition-all duration-300"
                    aria-label={social.label}
                  >
                    <social.icon size={18} className="md:w-5 md:h-5" />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div variants={itemVariants} className="lg:col-span-1">
              <h4 className="text-lg md:text-xl font-semibold text-white mb-4 md:mb-6">Quick Links</h4>
              <ul className="space-y-2 md:space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <button
                      onClick={() => handleNavClick(link.href)}
                      className="text-sm md:text-base text-gray-400 hover:text-white transition-colors duration-300 hover:translate-x-1 inline-block"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Services */}
            <motion.div variants={itemVariants} className="lg:col-span-1">
              <h4 className="text-lg md:text-xl font-semibold text-white mb-4 md:mb-6">Services</h4>
              <ul className="space-y-2 md:space-y-3">
                {services.map((service) => (
                  <li key={service}>
                    <span className="text-sm md:text-base text-gray-400">
                      {service}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Newsletter */}
            <motion.div variants={itemVariants} className="lg:col-span-1">
              <h4 className="text-lg md:text-xl font-semibold text-white mb-4 md:mb-6">Stay Updated</h4>
              <p className="text-sm md:text-base text-gray-400 mb-4 md:mb-6">
                Get notified about new projects and insights
              </p>
              
              <div className="space-y-3 md:space-y-4">
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-3 md:px-4 py-2 md:py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white text-sm md:text-base placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 md:px-6 py-2 md:py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg text-white text-sm md:text-base font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
                  >
                    Subscribe
                  </motion.button>
                </div>
                
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-xs md:text-sm text-green-400">
                    Available for new projects
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0"
            >
              <div className="flex items-center space-x-2 text-sm md:text-base text-gray-400">
                <span>© {currentYear} Your Name. Made with</span>
                <Heart size={16} className="text-red-500 animate-pulse" />
                <span>using Next.js</span>
              </div>

              <motion.button
                onClick={scrollToTop}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 md:p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full text-white shadow-lg hover:shadow-xl transition-all duration-300 group"
                aria-label="Back to top"
              >
                <ArrowUp size={18} className="md:w-5 md:h-5 group-hover:translate-y-[-2px] transition-transform" />
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
