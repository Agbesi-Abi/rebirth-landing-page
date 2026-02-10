5
import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Page } from '../types';
import { PROJECTS } from '../data/projects';

gsap.registerPlugin(ScrollTrigger);

interface WorkProps {
  onNavigate: (page: Page) => void;
  onNavigateToProject?: (id: string) => void;
}

const Work: React.FC<WorkProps> = ({ onNavigate, onNavigateToProject }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const projects = PROJECTS;

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Animate project cards on scroll
      gsap.utils.toArray('.project-card').forEach((card: any, i) => {
        gsap.from(card, {
          y: 60,
          opacity: 0,
          duration: 1.2,
          ease: "expo.out",
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            toggleActions: "play none none reverse"
          }
        });
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-white min-h-screen selection:bg-rebirth-green pb-32">
      {/* Hero Section */}
      <section className="pt-24 md:pt-48 px-6 md:px-12 lg:px-24 pb-20 md:pb-32">
        <div className="flex flex-col gap-10 md:gap-16">
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-1.5 bg-rebirth-green rounded-full shadow-[0_0_8px_#004D31]"></span>
            <span className="text-[10px] font-mono tracking-widest text-neutral-400 font-bold uppercase italic font-mono">
              // WORK_PORTFOLIO
            </span>
          </div>

          <h1 className="text-6xl sm:text-7xl md:text-[13vw] font-bold tracking-tighter leading-[0.82] italic uppercase">
            Our Work
          </h1>

          <p className="text-xl md:text-2xl text-neutral-600 max-w-3xl">
            A curated collection of projects that push creative boundaries and deliver exceptional results.
          </p>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="px-6 md:px-12 lg:px-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 lg:gap-24">
          {projects.map((project, idx) => (
            <div key={project.id} className="project-card group cursor-pointer" onClick={() => onNavigateToProject?.(project.id)}>
              <div className="overflow-hidden mb-8">
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-80 md:h-96 object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-rebirth-green rounded-full"></span>
                  <span className="text-[10px] font-mono tracking-widest text-neutral-400 font-bold uppercase">
                    {project.category}
                  </span>
                </div>

                <h3 className="text-3xl md:text-4xl font-bold tracking-tighter italic uppercase group-hover:text-rebirth-green transition-colors">
                  {project.title}
                </h3>

                <p className="text-neutral-600 leading-relaxed">
                  {project.description.slice(0, 150)}...
                </p>

                <div className="flex items-center gap-4 pt-4 border-t border-neutral-100">
                  <span className="text-[11px] font-bold uppercase tracking-[0.6em] text-neutral-400">View Project</span>
                  <span className="text-2xl transform group-hover:translate-x-2 transition-transform">→</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Work;
