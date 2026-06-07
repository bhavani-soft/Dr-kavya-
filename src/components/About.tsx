'use client';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const text =
  "I am a dedicated physician and medical professional with a passion for delivering compassionate, evidence-based healthcare. With a strong clinical foundation built through frontline COVID-19 service at MNR Medical College, hospital consultancy at TRR and Mamatha Institute of Medical Sciences, and ongoing senior residency training, I focus on holistic patient care that addresses the root cause of illness rather than just its symptoms. My experience spans internal medicine, emergency care, and chronic disease management across both government and private healthcare institutions in Telangana. Beyond clinical work, I am committed to medical education and community health awareness, working to bridge the gap between advanced medicine and everyday wellness. I am continuously learning and evolving — currently deepening my expertise in general medicine while serving patients and mentoring junior residents at Government Medical College, Mulugu.";

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-8%' });

  return (
    <section
      id="about"
      className="py-20 md:py-32 px-5 sm:px-8 md:px-16 lg:px-24 bg-white text-black"
    >
      {/* Section label */}
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.55, ease: 'easeOut' }}
        className="text-xs uppercase tracking-[0.22em] text-black/40 mb-8 md:mb-10 font-sans"
      >
        About
      </motion.p>

      <motion.p
        ref={ref}
        initial={{ opacity: 0, y: 32 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        className="font-playfair text-base sm:text-lg md:text-[1.35rem] lg:text-[1.5rem] leading-[1.82] text-black"
        style={{
          // Left-align on mobile (justify looks broken on narrow screens),
          // justify on wider screens where inter-word spacing is even.
          textAlign: 'left',
          hyphens: 'auto',
          wordSpacing: '0.04em',
        }}
      >
        {text}
      </motion.p>
    </section>
  );
}
