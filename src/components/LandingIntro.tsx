'use client';
import { motion, useScroll, useTransform, AnimatePresence, useMotionTemplate } from 'framer-motion';
import { useEffect, useState } from 'react';

const welcomeWords = [
  "Welcome",       // English
  "नमस्ते",          // Hindi
  "స్వాగతం",        // Telugu
  "Bienvenue",     // French
  "Benvenuto",     // Italian
  "환영합니다",       // Korean
  "مرحباً",          // Arabic
  "Bienvenido",    // Spanish
  "Willkommen",    // German
  "欢迎",            // Chinese
];

// ─────────────────────────────────────────────────────────────────────────────
// SCROLL MAP  (all values in pixels of global scrollY)
// 1 mouse wheel click ≈ 100px  →  8 clicks = 800px
//
//   0px   → text scale 1×,  fill 100%,  hero invisible (0%)
//   300px → text scale ~31×, fill 50%,   hero invisible
//   760px → text scale ~77×, fill 0%,    stroke 0% (text gone)
//   780px → text invisible,  hero still 0%
//   800px → hero SNAPS to 100% solid (instant reveal)
//   800px+ → stays at final state
//
// 800px = 8 mouse-wheel clicks = slow, cinematic fly-through
// Container: 100vh + 1100px so sticky lasts well past the 800px mark
// ─────────────────────────────────────────────────────────────────────────────

export default function LandingIntro() {
  const [wordIndex, setWordIndex] = useState(0);
  const [introDone, setIntroDone] = useState(false);

  // Global scroll — absolute pixel values, no surprises
  const { scrollY } = useScroll();

  // ── TEXT SCALE (exponential — each click grows MORE than the last) ────────
  // Ratio per click ≈ 1.73×  →  1 → 1.7 → 3 → 5 → 9 → 16 → 27 → 47 → 80
  // Feels slow at first, then rockets through the camera on the last clicks
  const textScale = useTransform(
    scrollY,
    [  0,   100,  200,  300,  400,  500,  600,  700,  800],
    [  1,   1.7,    3,    5,    9,   16,   27,   47,   80]
  );

  // ── TEXT FILL OPACITY ─────────────────────────────────────────────────────
  // 0px=fully white → 300px=half faded → 780px=completely gone
  const textFillOpacity = useTransform(scrollY, [0, 300, 780], [1, 0.5, 0]);

  // ── TEXT STROKE OPACITY ───────────────────────────────────────────────────
  // Emerges at 150px as fill fades, fully gone by 780px
  const textStrokeOpacity = useTransform(scrollY, [0, 150, 780], [0, 0.7, 0]);

  // Build CSS-string MotionValues from the opacity ones
  const textColor   = useMotionTemplate`rgba(255, 255, 255, ${textFillOpacity})`;
  const textStroke  = useMotionTemplate`1px rgba(255, 255, 255, ${textStrokeOpacity})`;

  // ── BACKGROUND BRIGHTNESS ──────────────────────────────────────────────────
  // 0–780px : stays dark (15%) while DR KAVYA text is zooming
  // 780–1100px: slowly brightens to 100% over ~3 scroll clicks
  // 1100px+  : full brightness, stays there
  const heroBrightness = useTransform(scrollY, [0, 780, 1100], [0.15, 0.15, 1]);
  const heroFilter     = useMotionTemplate`brightness(${heroBrightness})`;

  // ── BACKGROUND SCALE ──────────────────────────────────────────────────────
  // Subtle de-zoom from 1.06× → 1× as text flies through
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
    // Container must be at least (100vh + 500px) for the sticky to last
    // We use 100vh + 700px for a comfortable buffer after the reveal
    <div className="relative w-full bg-black" style={{ height: 'calc(100vh + 1400px)' }}>
      <div className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center bg-black">

        {/* ── Word-Flash Intro Overlay (z-50, blocks view until done) ── */}
        <AnimatePresence>
          {!introDone && (
            <motion.div
              className="absolute inset-0 z-50 flex items-center justify-center bg-black"
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div
                className="font-bebas text-2xl md:text-4xl tracking-widest text-white overflow-hidden h-[80px] flex items-center"
              >
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

        {/* ── DR KAVYA Fly-Through Text (z-20, above hero, below overlay) ── */}
        <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
          <motion.div
            style={{
              scale: textScale,
              color: textColor,
              WebkitTextStroke: textStroke,
              textShadow: '0 0 40px rgba(255,255,255,0.15)',
              fontWeight: 900,
            }}
            className="font-bebas text-[22vw] leading-none tracking-widest whitespace-nowrap"
          >
            DR KAVYA
          </motion.div>
        </div>

        {/* ── Hero Background + Content (z-10, revealed at 500px scroll) ── */}
        <motion.div
          style={{ filter: heroFilter, scale: heroScale }}
          className="absolute inset-0 z-10 w-full h-full"
        >
          {/* Full-bleed hero image — no overlays, 100% brightness */}
          <img
            src="/images/kavya1.png"
            alt="Dr Kavya Arisham"
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Infinite Marquee at bottom */}
          <div className="absolute inset-0 z-10 flex items-end pb-4 md:pb-8">
            <div className="whitespace-nowrap flex font-bebas text-4xl md:text-6xl leading-none text-white tracking-widest w-full overflow-hidden">
              {[0, 1].map(i => (
                <motion.div
                  key={i}
                  animate={{ x: ['0%', '-100%'] }}
                  transition={{ repeat: Infinity, ease: 'linear', duration: 60 }}
                  className="flex items-center shrink-0"
                >
                  {['DR. KAVYA ARISHAM', '-', 'DR. KAVYA ARISHAM', '-', 'DR. KAVYA ARISHAM', '-'].map(
                    (t, j) => <span key={j} className="px-8">{t}</span>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Info Box */}
          <div className="absolute bottom-32 left-8 md:left-24 z-10 max-w-sm">
            <div className="flex items-center space-x-2 text-xs md:text-sm font-semibold tracking-widest text-white/70 uppercase mb-4">
              <span className="w-2 h-2 rounded-full bg-white/70" />
              <span>Medical Professional</span>
            </div>
            <h1 className="text-white text-3xl md:text-4xl font-playfair font-medium leading-tight mb-6">
              Empowering Health <br /> &amp; Wellness
            </h1>
            <button className="flex items-center space-x-2 text-sm font-medium uppercase tracking-widest bg-white text-black rounded-full px-6 py-3 hover:bg-gray-200 transition-colors">
              <span>Explore</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
