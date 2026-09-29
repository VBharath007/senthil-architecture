"use client";

import { useState } from "react";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectCard } from "./ProjectCard";
import { PROJECTS } from "@/data/site";
import { motion, AnimatePresence } from "framer-motion";

export function Projects() {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categories = [
    { label: "All Projects", value: "All", count: PROJECTS.length },
    { label: "Architecture", value: "Architecture Design", count: PROJECTS.filter(p => p.categories.includes("Architecture Design")).length },
    { label: "Interiors", value: "Interior Design", count: PROJECTS.filter(p => p.categories.includes("Interior Design")).length },
    { label: "Design + Build", value: "Design + Build", count: PROJECTS.filter(p => p.categories.includes("Design + Build")).length },
  ];

  const filteredProjects = activeCategory === "All"
    ? PROJECTS
    : PROJECTS.filter((p) => p.categories.includes(activeCategory));

  return (
    <section id="projects" className="relative overflow-hidden bg-white py-20 dark:bg-ink-950 sm:py-28">
      <Container>
        {/* Section Heading */}
        <div className="mb-8">
          <SectionHeading
            eyebrow="Curated Portfolio"
            title="Selected Architectural Works"
            description="Explore our residential, commercial, and industrial landmarks across Tamil Nadu."
          />
        </div>

        {/* Dedicated Architectural Filter Bar */}
        <div className="mb-12 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-ink-900/10 dark:border-white/10 pb-4">
          <div className="inline-flex items-center gap-1 sm:gap-1.5 p-1 rounded-full bg-ink-900/[0.03] dark:bg-white/[0.04] border border-ink-900/10 dark:border-white/10 shadow-sm max-w-full flex-wrap sm:flex-nowrap">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.value;
              return (
                <button
                  key={cat.value}
                  onClick={() => setActiveCategory(cat.value)}
                  className={`relative flex items-center gap-2 rounded-full px-3 py-2 sm:px-4 sm:py-2.5 text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                    isActive
                      ? "text-white dark:text-white font-bold shadow-sm"
                      : "text-ink-600 hover:text-ink-950 dark:text-white/60 dark:hover:text-white hover:bg-ink-900/5 dark:hover:bg-white/5"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeProjectFilter"
                      className="absolute inset-0 rounded-full bg-brand-500 shadow-md shadow-brand-500/25"
                      transition={{ type: "spring", stiffness: 450, damping: 35 }}
                    />
                  )}
                  <span className="relative z-10">{cat.label}</span>
                  <span
                    className={`relative z-10 flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[11px] font-mono font-semibold transition-colors ${
                      isActive
                        ? "bg-white/25 text-white dark:bg-black/20"
                        : "bg-ink-900/10 text-ink-600 dark:bg-white/10 dark:text-white/70"
                    }`}
                  >
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-ink-500 dark:text-white/50">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-brand-500" />
            <span>Showing {filteredProjects.length} Selected Project{filteredProjects.length !== 1 ? "s" : ""}</span>
          </div>
        </div>



        {/* Filtered Projects Grid */}
        <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, i) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, delay: i * 0.04 }}
              >
                <ProjectCard 
                  slug={project.slug}
                  title={project.title}
                  description={project.description || ""}
                  location={project.location}
                  category={project.categories[0]}
                  image={`/assets/projects/${project.slug}/${activeCategory === "Interior Design" && project.interior_cover ? project.interior_cover : project.cover}`}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </Container>
    </section>
  );
}
