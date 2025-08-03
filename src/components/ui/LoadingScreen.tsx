'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LoadingScreen = () => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressTimer);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    return () => {
      clearTimeout(timer);
      clearInterval(progressTimer);
    };
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black"
        >
          <div className="text-center space-y-8">
            {/* Logo Animation */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <h1 className="text-4xl font-bold text-gradient">Portfolio</h1>
            </motion.div>

            {/* Loading Bar */}
            <div className="w-64 mx-auto">
              <div className="w-full bg-gray-800 rounded-full h-2 mb-4">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  className="h-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
                />
              </div>
              <p className="text-gray-400 text-sm">{progress}%</p>
            </div>

            {/* Floating Elements */}
            <div className="relative">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ 
                    opacity: [0, 1, 0],
                    scale: [0, 1, 0],
                    rotate: [0, 180, 360]
                  }}
                  transition={{
                    duration: 2,
                    delay: i * 0.2,
                    repeat: Infinity,
                    repeatDelay: 1
                  }}
                  className="absolute w-2 h-2 bg-blue-500 rounded-full"
                  style={{
                    left: `${20 + i * 40}px`,
                    top: `${Math.sin(i) * 20}px`
                  }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
