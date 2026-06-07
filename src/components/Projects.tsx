'use client';
import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import Image from 'next/image';

const projects = [
  {
    id: "wellness-drive",
    title: "Community Wellness Drive",
    category: "Public Health",
    tagline: "Large-scale preventive health screening program.",
    demo: "",
    github: "",
    metrics: [
      { value: "2K+", label: "Patients Screened" },
      { value: "15", label: "Medical Camps" },
      { value: "40%", label: "Early Detections" }
    ],
    images: ["/images/kusha.png", "/images/kusha.png"],
    overview: "A comprehensive public health initiative aimed at providing free diagnostic screenings for hypertension, diabetes, and malnutrition in underserved rural communities. The program significantly improved early diagnosis rates and established continuous care pathways for chronic patients.",
    tags: ["Public Health", "Diagnostics", "Community Care", "Preventive Medicine"]
  },
  {
    id: "diabetes-protocol",
    title: "Diabetes Care Protocol",
    category: "Clinical Research",
    tagline: "Standardized holistic management for Type-2 Diabetes.",
    demo: "",
    metrics: [
      { value: "300+", label: "Patients Monitored" },
      { value: "-1.5%", label: "Avg HbA1c Drop" },
      { value: "6 Mo", label: "Study Duration" }
    ],
    images: ["/images/kusha.png", "/images/kusha.png"],
    overview: "A clinical initiative focusing on a holistic management protocol for Type-2 Diabetes patients. The approach integrated dietary counseling, customized exercise regimens, and optimized pharmacological interventions, resulting in a measurable reduction in long-term blood glucose levels.",
    tags: ["Endocrinology", "Research", "Patient Education", "Holistic Health"]
  }
];

export default function Projects() {
  const [openId, setOpenId] = useState<string | null>(null);
  const container = useRef(null);
  const isInView = useInView(container, { once: true, margin: "-10%" });

  const togglePanel = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="projects" className="py-24 px-8 md:px-24 bg-white text-black max-w-6xl mx-auto" ref={container}>
      <motion.div 
        initial={{ opacity: 0, y: 60 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="mb-16"
      >
        <p className="text-gray-500 mb-2 uppercase tracking-widest text-sm">Key Contributions</p>
        <h2 className="text-4xl md:text-6xl font-bebas tracking-wide">Clinical <br /> Initiatives</h2>
      </motion.div>

      <div className="flex flex-col border-t border-black/20">
        {projects.map((proj) => (
          <div key={proj.id} className="border-b border-black/20">
            <button 
              onClick={() => togglePanel(proj.id)}
              className="w-full py-8 flex items-center justify-between group hover:bg-black/5 transition-colors px-4"
            >
              <h2 className="text-3xl md:text-4xl font-bebas tracking-wide transition-transform group-hover:translate-x-2">{proj.title}</h2>
              <div className="flex items-center gap-8">
                <p className="hidden md:block text-gray-500 uppercase tracking-widest text-sm">{proj.category}</p>
                <span className="text-2xl font-light w-8 h-8 rounded-full border border-black/20 flex items-center justify-center transition-transform duration-300 bg-white text-black" style={{ transform: openId === proj.id ? 'rotate(45deg)' : 'none' }}>
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
                  className="overflow-hidden bg-gray-50 px-4 md:px-12"
                >
                  <div className="py-12 space-y-12">
                    <div className="flex flex-col md:flex-row justify-between md:items-end gap-6">
                      <div>
                        <h3 className="text-2xl font-sans font-bold mb-2">{proj.title}</h3>
                        <p className="text-gray-600">{proj.tagline}</p>
                      </div>
                      <div className="flex gap-4">
                        {proj.demo && <a href={proj.demo} target="_blank" rel="noreferrer" className="bg-black text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors">Live Demo</a>}
                        {proj.github && <a href={proj.github} target="_blank" rel="noreferrer" className="border border-black/20 px-6 py-2 rounded-full text-sm font-medium hover:bg-black/5 transition-colors">GitHub Repo</a>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {proj.images.map((img, idx) => (
                        <div key={idx} className="relative h-64 md:h-80 w-full overflow-hidden rounded-xl">
                          <img src={img} alt={proj.title} className="w-full h-full object-cover" />
                        </div>
                      ))}
                    </div>

                    <div className="flex justify-between items-center bg-white p-8 rounded-xl border border-black/10 shadow-sm">
                      {proj.metrics.map((metric, idx) => (
                        <div key={idx} className="text-center">
                          <span className="block text-3xl font-bold font-sans text-accent mb-1">{metric.value}</span>
                          <span className="text-sm text-gray-500 uppercase tracking-wider">{metric.label}</span>
                        </div>
                      ))}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                      <div className="col-span-2 space-y-8">
                        <div>
                          <h4 className="text-xl font-bold mb-4">Project Overview</h4>
                          <p className="text-gray-700 leading-relaxed">{proj.overview}</p>
                        </div>
                      </div>
                      <div className="space-y-8">
                        <div>
                          <h4 className="text-xl font-bold mb-4">Focus Areas</h4>
                          <div className="flex flex-wrap gap-2">
                            {proj.tags.map((tag, idx) => (
                              <span key={idx} className="px-3 py-1 bg-black/5 border border-black/10 rounded text-sm text-gray-700">{tag}</span>
                            ))}
                          </div>
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
