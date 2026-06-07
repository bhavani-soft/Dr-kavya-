'use client';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';

const experiences = [
  {
    role: "Senior Resident",
    company: "Government Medical College, Mulugu",
    duration: "2024 – Present",
    desc: "Currently serving as Senior Resident in the Department of General Medicine at Government Medical College, Mulugu. Responsibilities include managing complex inpatient cases, supervising junior residents, conducting ward rounds, and providing emergency medical care to a diverse patient population across the district. Actively involved in teaching medical undergraduates and postgraduates.",
    icon: "/images/kusha.png",
    tags: ["General Medicine", "Senior Residency", "Emergency Care", "Medical Education"]
  },
  {
    role: "Consultant Physician",
    company: "TRR Hospital & Mamatha Institute of Medical Sciences",
    duration: "2022 – 2024",
    desc: "Worked as a Consultant Physician at TRR Hospital and Mamatha Institute of Medical Sciences, providing expert outpatient and inpatient medical consultations. Managed a wide spectrum of conditions including metabolic disorders, infectious diseases, and chronic illnesses. Collaborated with multidisciplinary teams to deliver comprehensive patient care and contributed to institutional quality-improvement initiatives.",
    icon: "/images/kusha.png",
    tags: ["Internal Medicine", "Outpatient Consultation", "Chronic Disease Management", "Multidisciplinary Care"]
  },
  {
    role: "COVID-19 Medical Team",
    company: "MNR Medical College & Hospital",
    duration: "2020 – 2022",
    desc: "Served on the frontline COVID-19 clinical team at MNR Medical College & Hospital during the height of the pandemic. Managed critically ill COVID-19 patients, overseeing oxygen therapy, ventilator protocols, and antiviral treatment regimens. Played a key role in triage, isolation protocols, and infection-control strategies, demonstrating exceptional resilience and clinical acumen under crisis conditions.",
    icon: "/images/kusha.png",
    tags: ["COVID-19", "Critical Care", "Infectious Disease", "Triage", "Infection Control"]
  }
];

export default function Experience() {
  const container = useRef(null);
  const isInView = useInView(container, { once: true, margin: "-10%" });

  return (
    <section id="experience" className="py-24 px-8 md:px-24 bg-white text-black max-w-5xl mx-auto" ref={container}>
      <motion.div 
        initial={{ opacity: 0, y: 60 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="mb-16"
      >
        <p className="text-gray-500 mb-2 uppercase tracking-widest text-sm">Where I've worked</p>
        <h2 className="text-4xl md:text-6xl font-bebas tracking-wide">Work <br /> Experience</h2>
      </motion.div>

      <div className="relative border-l border-black/20 pl-8 ml-4 md:ml-0 md:pl-12 space-y-16">
        {experiences.map((exp, i) => (
          <ExperienceItem key={i} exp={exp} index={i} />
        ))}
      </div>
    </section>
  );
}

function ExperienceItem({ exp, index }: { exp: any, index: number }) {
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
      <div className="absolute -left-[4.5rem] md:-left-[5.5rem] w-12 h-12 rounded-full overflow-hidden border-2 border-black/20 bg-white flex items-center justify-center p-2 shadow-sm">
        <img src={exp.icon} alt={exp.company} className="w-full h-full object-contain" />
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
        <div>
          <h3 className="text-xl font-bold font-sans">{exp.role}</h3>
          <p className="text-gray-600">· {exp.company}</p>
        </div>
        <span className="text-sm text-gray-500 mt-2 md:mt-0 uppercase tracking-widest">{exp.duration}</span>
      </div>

      <p className="text-gray-800 leading-relaxed font-sans mb-6 text-sm md:text-base">
        {exp.desc}
      </p>

      {exp.tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {exp.tags.map((tag: string, i: number) => (
            <span key={i} className="px-3 py-1 border border-black/20 rounded-full text-xs text-gray-600">
              {tag}
            </span>
          ))}
        </div>
      )}
    </motion.div>
  );
}
