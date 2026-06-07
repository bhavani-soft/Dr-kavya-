'use client';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

// Inline SVG icons per role — no placeholder images needed
const RoleIcon = ({ type }: { type: 'resident' | 'consultant' | 'covid' }) => {
  if (type === 'resident') return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-black/60">
      <path d="M12 2a5 5 0 1 1 0 10A5 5 0 0 1 12 2z"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
      <path d="M15 10h2a2 2 0 0 1 2 2v1"/><path d="M17 13l2 2 2-2"/>
    </svg>
  );
  if (type === 'consultant') return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-black/60">
      <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M12 8v8M8 12h8"/>
    </svg>
  );
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-black/60">
      <path d="M12 22c-4.97 0-9-2.24-9-5v-2c0-2.76 4.03-5 9-5s9 2.24 9 5v2c0 2.76-4.03 5-9 5z"/>
      <circle cx="12" cy="7" r="4"/><path d="M15.5 11.5l3 3"/><path d="M18 9l2-2"/>
    </svg>
  );
};

const experiences = [
  {
    role: "Senior Resident",
    company: "Government Medical College, Mulugu",
    duration: "2024 – Present",
    desc: "Currently serving as Senior Resident in the Department of General Medicine at Government Medical College, Mulugu. Responsibilities include managing complex inpatient cases, supervising junior residents, conducting ward rounds, and providing emergency medical care to a diverse patient population across the district. Actively involved in teaching medical undergraduates and postgraduates.",
    iconType: 'resident' as const,
    tags: ["General Medicine", "Senior Residency", "Emergency Care", "Medical Education"],
  },
  {
    role: "Consultant Physician",
    company: "TRR Hospital & Mamatha Institute of Medical Sciences",
    duration: "2022 – 2024",
    desc: "Worked as a Consultant Physician at TRR Hospital and Mamatha Institute of Medical Sciences, providing expert outpatient and inpatient medical consultations. Managed a wide spectrum of conditions including metabolic disorders, infectious diseases, and chronic illnesses. Collaborated with multidisciplinary teams to deliver comprehensive patient care and contributed to institutional quality-improvement initiatives.",
    iconType: 'consultant' as const,
    tags: ["Internal Medicine", "Outpatient Consultation", "Chronic Disease Management", "Multidisciplinary Care"],
  },
  {
    role: "COVID-19 Medical Team",
    company: "MNR Medical College & Hospital",
    duration: "2020 – 2022",
    desc: "Served on the frontline COVID-19 clinical team at MNR Medical College & Hospital during the height of the pandemic. Managed critically ill COVID-19 patients, overseeing oxygen therapy, ventilator protocols, and antiviral treatment regimens. Played a key role in triage, isolation protocols, and infection-control strategies, demonstrating exceptional resilience and clinical acumen under crisis conditions.",
    iconType: 'covid' as const,
    tags: ["COVID-19", "Critical Care", "Infectious Disease", "Triage", "Infection Control"],
  },
];

export default function Experience() {
  const container = useRef(null);
  const isInView = useInView(container, { once: true, margin: "-10%" });

  return (
    <section
      id="experience"
      className="py-20 md:py-24 px-5 sm:px-8 md:px-24 bg-white text-black max-w-5xl mx-auto"
      ref={container}
    >
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="mb-12 md:mb-16"
      >
        <p className="text-gray-500 mb-2 uppercase tracking-widest text-xs sm:text-sm">Where I've worked</p>
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-bebas tracking-wide">
          Work <br /> Experience
        </h2>
      </motion.div>

      {/* Timeline */}
      <div className="relative border-l border-black/20 pl-8 ml-3 sm:ml-4 md:ml-0 md:pl-12 space-y-12 md:space-y-16">
        {experiences.map((exp, i) => (
          <ExperienceItem key={i} exp={exp} index={i} />
        ))}
      </div>
    </section>
  );
}

function ExperienceItem({ exp, index }: { exp: typeof experiences[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -30, y: 20 }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: -30, y: 20 }}
      transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
      className="relative"
    >
      {/* Timeline dot / icon */}
      <div className="absolute -left-[3.2rem] sm:-left-[4rem] md:-left-[5rem] w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full border-2 border-black/20 bg-white flex items-center justify-center shadow-sm">
        <RoleIcon type={exp.iconType} />
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 sm:mb-4">
        <div>
          <h3 className="text-lg sm:text-xl font-bold font-sans">{exp.role}</h3>
          <p className="text-gray-600 text-sm sm:text-base">· {exp.company}</p>
        </div>
        <span className="text-xs sm:text-sm text-gray-500 mt-1 sm:mt-0 uppercase tracking-widest">
          {exp.duration}
        </span>
      </div>

      <p className="text-gray-800 leading-relaxed font-sans mb-5 text-sm md:text-base">
        {exp.desc}
      </p>

      {exp.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {exp.tags.map((tag, i) => (
            <span
              key={i}
              className="px-2.5 sm:px-3 py-0.5 sm:py-1 border border-black/20 rounded-full text-[10px] sm:text-xs text-gray-600"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </motion.div>
  );
}
