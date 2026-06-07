'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

const welcomeWords = [
  "Welcome",      // English
  "नमस्ते",         // Hindi
  "స్వాగతం",       // Telugu
  "Bienvenue",    // French
  "Benvenuto",    // Italian
  "환영합니다",      // Korean
];

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    // Rapidly cycle through the welcome words
    if (wordIndex < welcomeWords.length) {
      const interval = setTimeout(() => {
        setWordIndex((prev) => prev + 1);
      }, 250); // very fast, 250ms per word
      return () => clearTimeout(interval);
    } else {
      // Once all words have shown, hold on the final branding before fading out
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [wordIndex]);

  if (!isLoading) return null;

  const showName = wordIndex >= welcomeWords.length;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={showName ? { opacity: 0 } : { opacity: 1 }}
      transition={{ duration: 1, delay: 1.5, ease: 'easeInOut' }}
      onAnimationComplete={() => {
        if (showName) setIsLoading(false);
      }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black"
    >
      <div className="absolute inset-0 pointer-events-none opacity-50" 
           style={{ background: 'radial-gradient(circle, transparent 20%, #000 80%)' }}>
      </div>
      
      <div className="relative z-10 font-bebas text-5xl md:text-8xl tracking-widest text-transparent flex items-center justify-center overflow-hidden"
           style={{ WebkitTextStroke: '2px rgba(255, 255, 255, 0.8)', height: '150px' }}>
        <AnimatePresence mode="wait">
          {!showName ? (
            <motion.div
              key={wordIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.15 }}
              className="absolute"
            >
              {welcomeWords[wordIndex]}
            </motion.div>
          ) : (
            <motion.div
              key="brand"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="absolute"
            >
              DR KAVYA
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
