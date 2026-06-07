'use client';
import { motion, useScroll, useTransform, AnimatePresence, useMotionTemplate } from 'framer-motion';
import { useEffect, useState } from 'react';

const welcomeWords = [
  "Welcome",       // English
  "నమస్తే",          // Telugu
  "नमस्ते",          // Hindi
  "Bienvenue",     // French
  "Benvenuto",     // Italian
  "환영합니다",       // Korean
  "مرحباً",          // Arabic
  "Bienvenido",    // Spanish
  "Willkommen",    // German
  "欢迎",            // Chinese
];

export default function LandingIntro() {
  const [wordIndex, setWordIndex] = useState(0);
  const [introDone, setIntroDone] = useState(false);

  const { scrollY } = useScroll();

  // ── TEXT SCALE (exponential fly-through) ──────────────────────────────────
  const textScale = useTransform(
    scrollY,
    [  0,   100,  200,  300,  400,  500,  600,  700,  800],
    [  1,   1.7,    3,    5,    9,   16,   27,   47,   80]
  );

  // ── TEXT FILL OPACITY ─────────────────────────────────────────────────────
  const textFillOpacity = useTransform(scrollY, [0, 300, 780], [1, 0.5, 0]);

  // ── TEXT STROKE OPACITY ───────────────────────────────────────────────────
  const textStrokeOpacity = useTransform(scrollY, [0, 150, 780], [0, 0.7, 0]);

  const textColor  = useMotionTemplate`rgba(255, 255, 255, ${textFillOpacity})`;
  const textStroke = useMotionTemplate`1px rgba(255, 255, 255, ${textStrokeOpacity})`;

  // ── BACKGROUND BRIGHTNESS ─────────────────────────────────────────────────
  const heroBrightness = useTransform(scrollY, [0, 780, 1100], [0.15, 0.15, 1]);
  const heroFilter     = useMotionTemplate`brightness(${heroBrightness})`;

  // ── BACKGROUND SCALE ──────────────────────────────────────────────────────
  const heroScale = useTransform(scrollY, [0, 800], [1.06, 1]);

  // ── WORD FLASH + SCROLL RESET ─────────────────────────────────────────────
  useEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);

    if (wordIndex < welcomeWords.length) {
      const t = setTimeout(() => setWordIndex(p => p + 1), 150);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => setIntroDone(true), 500);
      return () => clearTimeout(t);
    }
  }, [wordIndex]);

  return (
    <div className="relative w-full bg-black" style={{ height: 'calc(100vh + 1400px)' }}>
      <div className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center bg-black">

        {/* ── Word-Flash Intro Overlay ── */}
        <AnimatePresence>
          {!introDone && (
            <motion.div
              className="absolute inset-0 z-50 flex items-center justify-center bg-black"
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="font-bebas text-xl sm:text-2xl md:text-4xl tracking-widest text-white overflow-hidden h-[60px] sm:h-[80px] flex items-center">
                <AnimatePresence mode="wait">
                  {wordIndex < welcomeWords.length && (
                    <motion.div
                      key={wordIndex}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.15 }}
                    >
                      {welcomeWords[wordIndex]}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── DR KAVYA Fly-Through Text ── */}
        <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
          <motion.div
            style={{
              scale: textScale,
              color: textColor,
              WebkitTextStroke: textStroke,
              textShadow: '0 0 40px rgba(255,255,255,0.15)',
              fontWeight: 900,
            }}
            className="font-bebas text-[18vw] sm:text-[20vw] md:text-[22vw] leading-none tracking-widest whitespace-nowrap"
          >
            DR KAVYA
          </motion.div>
        </div>

        {/* ── Hero Background + Content ── */}
        <motion.div
          style={{ filter: heroFilter, scale: heroScale }}
          className="absolute inset-0 z-10 w-full h-full"
        >
          {/* Full-bleed hero image */}
          <img
            src="/images/kavya1.png"
            alt="Dr. Kavya Arisham — Physician"
            className="absolute inset-0 w-full h-full object-cover"
            fetchPriority="high"
          />

          {/* Infinite Marquee at bottom */}
          <div className="absolute inset-0 z-10 flex items-end pb-3 sm:pb-6 md:pb-8">
            <div className="whitespace-nowrap flex font-bebas text-2xl sm:text-4xl md:text-6xl leading-none text-white tracking-widest w-full overflow-hidden">
              {[0, 1].map(i => (
                <motion.div
                  key={i}
                  animate={{ x: ['0%', '-100%'] }}
                  transition={{ repeat: Infinity, ease: 'linear', duration: 60 }}
                  className="flex items-center shrink-0"
                >
                  {['DR. KAVYA ARISHAM', '—', 'DR. KAVYA ARISHAM', '—', 'DR. KAVYA ARISHAM', '—'].map(
                    (t, j) => <span key={j} className="px-4 sm:px-8">{t}</span>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Info Box */}
          <div className="absolute bottom-16 sm:bottom-24 md:bottom-32 left-5 md:left-24 z-10 max-w-xs sm:max-w-sm">
            <div className="flex items-center space-x-2 text-[10px] sm:text-xs md:text-sm font-semibold tracking-widest text-white/70 uppercase mb-3 sm:mb-4">
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-white/70 shrink-0" />
              <span>Medical Professional</span>
            </div>
            <h1 className="text-white text-2xl sm:text-3xl md:text-4xl font-playfair font-medium leading-tight mb-4 sm:mb-6">
              Empowering Health <br /> &amp; Wellness
            </h1>
            <button
              className="flex items-center space-x-2 text-xs sm:text-sm font-medium uppercase tracking-widest bg-white text-black rounded-full px-5 sm:px-6 py-2.5 sm:py-3 hover:bg-gray-200 active:scale-95 transition-all"
              onClick={() => {
                document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <span>Explore</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
