'use client';
import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';

// Gradient placeholder card — replaces broken kusha.png images
const ProjectImagePlaceholder = ({ title, index }: { title: string; index: number }) => {
  const gradients = [
    'from-slate-800 to-slate-900',
    'from-neutral-700 to-stone-900',
  ];
  return (
    <div className={`relative h-52 sm:h-64 md:h-80 w-full overflow-hidden rounded-xl bg-gradient-to-br ${gradients[index % 2]} flex items-center justify-center`}>
      <div className="text-center px-4">
        <div className="w-10 h-10 rounded-full border-2 border-white/20 flex items-center justify-center mx-auto mb-3">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-white/50">
            <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M12 8v8M8 12h8"/>
          </svg>
        </div>
        <p className="text-white/40 text-xs uppercase tracking-widest font-sans">{title}</p>
      </div>
    </div>
  );
};

const projects = [
  {
    id: "wellness-drive",
    title: "Community Wellness Drive",
    category: "Public Health",
    tagline: "Large-scale preventive health screening program.",
    metrics: [
      { value: "2K+", label: "Patients Screened" },
      { value: "15",  label: "Medical Camps"    },
      { value: "40%", label: "Early Detections" },
    ],
    imageCount: 2,
    overview: "A comprehensive public health initiative aimed at providing free diagnostic screenings for hypertension, diabetes, and malnutrition in underserved rural communities. The program significantly improved early diagnosis rates and established continuous care pathways for chronic patients.",
    tags: ["Public Health", "Diagnostics", "Community Care", "Preventive Medicine"],
  },
  {
    id: "diabetes-protocol",
    title: "Diabetes Care Protocol",
    category: "Clinical Research",
    tagline: "Standardized holistic management for Type-2 Diabetes.",
    metrics: [
      { value: "300+", label: "Patients Monitored" },
      { value: "-1.5%", label: "Avg HbA1c Drop"   },
      { value: "6 Mo",  label: "Study Duration"    },
    ],
    imageCount: 2,
    overview: "A clinical initiative focusing on a holistic management protocol for Type-2 Diabetes patients. The approach integrated dietary counseling, customized exercise regimens, and optimized pharmacological interventions, resulting in a measurable reduction in long-term blood glucose levels.",
    tags: ["Endocrinology", "Research", "Patient Education", "Holistic Health"],
  },
];

export default function Projects() {
  const [openId, setOpenId] = useState<string | null>(null);
  const container = useRef(null);
  const isInView = useInView(container, { once: true, margin: "-10%" });

  const togglePanel = (id: string) => setOpenId(openId === id ? null : id);

  return (
    <section
      id="projects"
      className="py-20 md:py-24 px-5 sm:px-8 md:px-24 bg-white text-black max-w-6xl mx-auto"
      ref={container}
    >
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="mb-12 md:mb-16"
      >
        <p className="text-gray-500 mb-2 uppercase tracking-widest text-xs sm:text-sm">Key Contributions</p>
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-bebas tracking-wide">
          Clinical <br /> Initiatives
        </h2>
      </motion.div>

      <div className="flex flex-col border-t border-black/20">
        {projects.map((proj) => (
          <div key={proj.id} className="border-b border-black/20">
            <button
              onClick={() => togglePanel(proj.id)}
              className="w-full py-6 sm:py-8 flex items-center justify-between group hover:bg-black/5 active:bg-black/10 transition-colors px-3 sm:px-4"
              aria-expanded={openId === proj.id}
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bebas tracking-wide transition-transform group-hover:translate-x-2 text-left">
                {proj.title}
              </h2>
              <div className="flex items-center gap-4 sm:gap-8 shrink-0 ml-4">
                <p className="hidden md:block text-gray-500 uppercase tracking-widest text-sm">
                  {proj.category}
                </p>
                <span
                  className="text-2xl font-light w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-black/20 flex items-center justify-center transition-transform duration-300 bg-white text-black"
                  style={{ transform: openId === proj.id ? 'rotate(45deg)' : 'none' }}
                >
                  +
                </span>
              </div>
            </button>

            <AnimatePresence>
              {openId === proj.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
                  className="overflow-hidden bg-gray-50 px-3 sm:px-6 md:px-12"
                >
                  <div className="py-8 sm:py-12 space-y-8 sm:space-y-12">
                    {/* Header row */}
                    <div className="flex flex-col md:flex-row justify-between md:items-end gap-4">
                      <div>
                        <h3 className="text-xl sm:text-2xl font-sans font-bold mb-1 sm:mb-2">{proj.title}</h3>
                        <p className="text-gray-600 text-sm sm:text-base">{proj.tagline}</p>
                      </div>
                    </div>

                    {/* Image placeholders */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                      {Array.from({ length: proj.imageCount }).map((_, idx) => (
                        <ProjectImagePlaceholder key={idx} title={proj.title} index={idx} />
                      ))}
                    </div>

                    {/* Metrics */}
                    <div className="grid grid-cols-3 gap-2 bg-white p-5 sm:p-8 rounded-xl border border-black/10 shadow-sm">
                      {proj.metrics.map((metric, idx) => (
                        <div key={idx} className="text-center">
                          <span className="block text-2xl sm:text-3xl font-bold font-sans text-accent mb-0.5 sm:mb-1">
                            {metric.value}
                          </span>
                          <span className="text-[10px] sm:text-sm text-gray-500 uppercase tracking-wider leading-tight block">
                            {metric.label}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Overview + Tags */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                      <div className="md:col-span-2">
                        <h4 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Project Overview</h4>
                        <p className="text-gray-700 leading-relaxed text-sm sm:text-base">{proj.overview}</p>
                      </div>
                      <div>
                        <h4 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Focus Areas</h4>
                        <div className="flex flex-wrap gap-1.5 sm:gap-2">
                          {proj.tags.map((tag, idx) => (
                            <span
                              key={idx}
                              className="px-2.5 sm:px-3 py-0.5 sm:py-1 bg-black/5 border border-black/10 rounded text-xs sm:text-sm text-gray-700"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
}
