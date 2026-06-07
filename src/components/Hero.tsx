'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

export default function Hero() {
  const { scrollY } = useScroll();
  const yBox = useTransform(scrollY, [0, 1000], [0, 200]);

  return (
    <section id="home" className="relative w-full h-screen overflow-hidden bg-black flex items-center justify-center">
      {/* Infinite Marquee Text */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none opacity-20 overflow-hidden mix-blend-overlay">
        <div className="whitespace-nowrap flex font-bebas text-[20vw] leading-none text-white tracking-wider">
          <motion.div
            animate={{ x: ['0%', '-100%'] }}
            transition={{ ease: 'linear', duration: 20, repeat: Infinity }}
            className="flex shrink-0"
          >
            Dr. Kavya Arisham - Dr. Kavya Arisham - Dr. Kavya Arisham -&nbsp;
          </motion.div>
          <motion.div
            animate={{ x: ['0%', '-100%'] }}
            transition={{ ease: 'linear', duration: 20, repeat: Infinity }}
            className="flex shrink-0"
          >
            Dr. Kavya Arisham - Dr. Kavya Arisham - Dr. Kavya Arisham -&nbsp;
          </motion.div>
        </div>
      </div>

      {/* Parallax Floating Box */}
      <motion.div 
        style={{ y: yBox }}
        className="absolute bottom-32 left-8 md:left-24 z-10 max-w-sm"
      >
        <p className="text-white/60 uppercase tracking-widest text-xs mb-2 flex items-center gap-2">
          <span className="w-2 h-2 bg-white rounded-full inline-block"></span>
          B.Tech CS Student
        </p>
        <h1 className="text-white text-4xl md:text-5xl font-playfair font-medium leading-tight mb-6">
          Crafting Data-Driven <br /> Digital Experiences
        </h1>
        <a href="/resume" className="inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full font-medium hover:bg-gray-200 transition-colors">
          Résumé
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7"></path>
          </svg>
        </a>
      </motion.div>
    </section>
  );
}
