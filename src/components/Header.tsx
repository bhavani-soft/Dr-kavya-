'use client';
import {
  motion, useScroll, useTransform, useSpring,
  useMotionTemplate, useMotionValueEvent
} from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const navItems = [
  { name: 'Home',         href: '#home'     },
  { name: 'About',        href: '#about'    },
  { name: 'Projects',     href: '#projects' },
  { name: 'Publications', href: '#books'    },
  { name: 'Blog',         href: '#blog'     },
  { name: 'Resume',       href: '/resume'   },
  { name: 'Contact',      href: '#contact'  },
];

// Transition window: scrollY 1300px → 1650px
// (covers the tail end of the LandingIntro sticky section)
const T0 = 1300;
const T1 = 1650;

export default function Header() {
  const { scrollY } = useScroll();

  // ── Entrance: delayed to match word-flash intro (~2.2 s) ──────────────────
  const [entered, setEntered] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setEntered(true), 2200);
    return () => clearTimeout(t);
  }, []);

  // Track pill state for pointer-events on CTA
  const [isPill, setIsPill]         = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useMotionValueEvent(scrollY, 'change', (y) => {
    setIsPill(y > T1);
  });

  // ── Morph progress: 0 = transparent hero, 1 = frosted pill ───────────────
  const morphRaw = useTransform(scrollY, [T0, T1], [0, 1], { clamp: true });
  // Spring makes the morph feel physically weighted, not mechanical
  const morph    = useSpring(morphRaw, { stiffness: 120, damping: 22, restDelta: 0.001 });

  // ── All animated CSS properties via useTransform ──────────────────────────
  const paddingV     = useTransform(morph, [0, 1], [20,    10]);
  const paddingH     = useTransform(morph, [0, 1], [32,    20]);
  const topInset     = useTransform(morph, [0, 1], [0,     16]);
  const borderRadius = useTransform(morph, [0, 1], [0,   9999]);
  const bgAlpha      = useTransform(morph, [0, 1], [0,   0.92]);
  const blurPx       = useTransform(morph, [0, 1], [0,     14]);
  const shadowBlur   = useTransform(morph, [0, 1], [0,     28]);
  const shadowAlpha  = useTransform(morph, [0, 1], [0,    0.1]);
  const sideInsetNum = useTransform(morph, [0, 1], [0,    7.5]); // vw units
  const ctaOpacity   = useTransform(morph, [0, 1], [0,      1]);
  const ctaScale     = useTransform(morph, [0, 1], [0.8,    1]);
  const menuLabelOp  = useTransform(morph, [0, 0.35], [1,   0]);

  // Text: white (0,0) → black (255 inverted) using RGB channels
  const textCh  = useTransform(morph, [0, 1], [255, 0]);
  const navAlph = useTransform(morph, [0, 1], [0.82, 0.72]);

  // ── Build CSS string MotionValues ─────────────────────────────────────────
  const bg        = useMotionTemplate`rgba(255,255,255,${bgAlpha})`;
  const blur      = useMotionTemplate`blur(${blurPx}px)`;
  const shadow    = useMotionTemplate`0 2px ${shadowBlur}px rgba(0,0,0,${shadowAlpha})`;
  const sideInset = useMotionTemplate`${sideInsetNum}vw`;
  const textColor = useMotionTemplate`rgb(${textCh},${textCh},${textCh})`;
  const navColor  = useMotionTemplate`rgba(${textCh},${textCh},${textCh},${navAlph})`;
  const subColor  = useMotionTemplate`rgba(${textCh},${textCh},${textCh},0.42)`;

  return (
    <motion.header
      // Scroll-linked morphing via style MotionValues
      style={{
        position:         'fixed',
        top:              topInset,
        left:             sideInset,
        right:            sideInset,
        zIndex:           50,
        borderRadius,
        backgroundColor:  bg,
        backdropFilter:   blur,
        boxShadow:        shadow,
        paddingTop:       paddingV,
        paddingBottom:    paddingV,
        paddingLeft:      paddingH,
        paddingRight:     paddingH,
      }}
      // animate only handles entrance + hide/show Y offset
      initial={{ y: -90, opacity: 0 }}
      animate={{
        y:       entered ? 0 : -90,
        opacity: entered ? 1 : 0,
      }}
      transition={{ duration: 0.45, ease: 'easeInOut' }}
      className="flex items-center justify-between"
    >
      {/* ── Logo ─────────────────────────────────────────────────────────── */}
      <Link href="#home" className="flex flex-col font-bebas tracking-wider leading-none shrink-0">
        <motion.span style={{ color: textColor }} className="text-xl leading-none">
          DR.&nbsp;KAVYA
        </motion.span>
        <motion.div
          style={{ color: subColor }}
          className="flex justify-between w-full text-[9px] leading-none mt-0.5 tracking-[0.18em]"
        >
          {'ARISHAM'.split('').map((l, i) => <span key={i}>{l}</span>)}
        </motion.div>
      </Link>

      {/* ── Desktop Nav ──────────────────────────────────────────────────── */}
      <nav className="hidden md:flex items-center gap-6 text-[13px] font-medium font-sans">
        {/* "Menu •" — fades out as pill forms */}
        <motion.div
          style={{ opacity: menuLabelOp }}
          className="flex items-center gap-2 whitespace-nowrap overflow-hidden"
        >
          <span className="uppercase tracking-widest text-xs text-white/80">Menu</span>
          <div className="w-2 h-2 bg-white rounded-full" />
        </motion.div>

        {navItems.map((item) => (
          <Link key={item.name} href={item.href} className="relative group py-0.5">
            <motion.span style={{ color: navColor }} className="block">
              {item.name}
            </motion.span>
            {/* Underline inherits text colour */}
            <motion.span
              style={{ backgroundColor: textColor }}
              className="absolute bottom-0 left-0 h-[1.5px] w-0 group-hover:w-full transition-[width] duration-300 rounded-full"
            />
          </Link>
        ))}
      </nav>

      {/* ── Résumé CTA — materialises as pill forms ───────────────────────── */}
      <motion.div
        style={{ opacity: ctaOpacity, scale: ctaScale }}
        className="hidden md:block shrink-0"
        // block pointer events only when visible
        animate={{ pointerEvents: isPill ? 'auto' : 'none' } as any}
      >
        <Link
          href="/resume"
          className="flex items-center gap-1.5 bg-black text-white text-[11px] font-semibold uppercase tracking-widest px-5 py-2.5 rounded-full hover:bg-neutral-800 transition-colors"
        >
          Résumé
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>
      </motion.div>

      {/* ── Mobile Burger ────────────────────────────────────────────────── */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="md:hidden flex flex-col gap-[5px] p-2"
        aria-label="Toggle menu"
      >
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            style={{ backgroundColor: textColor }}
            className={`block w-5 h-[2px] transition-all origin-center duration-300 ${
              i === 0 && mobileOpen ? 'rotate-45 translate-y-[7px]' :
              i === 1 && mobileOpen ? 'opacity-0' :
              i === 2 && mobileOpen ? '-rotate-45 -translate-y-[7px]' : ''
            }`}
          />
        ))}
      </button>
    </motion.header>
  );
}
