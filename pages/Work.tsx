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

const Work: React.FC<WorkProps> = ({ onNavigateToProject }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.project-row').forEach((row) => {
        gsap.from(row, {
          y: 80,
          opacity: 0,
          duration: 1.2,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: row,
            start: 'top 85%',
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <main
      ref={containerRef}
      className="bg-white min-h-screen selection:bg-rebirth-green pb-40"
    >
      {/* HERO */}
      <section className="pt-32 md:pt-48 px-6 md:px-12 lg:px-24 pb-24">
        <div className="max-w-6xl">
          <span className="block text-[10px] font-bold tracking-ultra-widest uppercase text-rebirth-green mb-8">
            Selected Work
          </span>

          <h1 className="text-[14vw] md:text-[10vw] leading-[0.85] font-bold tracking-tighter italic uppercase">
            Portfolio
          </h1>

          <p className="mt-10 text-xl md:text-2xl text-neutral-600 max-w-3xl">
            A focused body of work across branding, content, and digital
            experiences — built to stand out and perform.
          </p>
        </div>
      </section>

      {/* PROJECTS */}
      <section className="px-6 md:px-12 lg:px-24">
        <div className="flex flex-col gap-32">
          {PROJECTS.map((project, index) => {
            const isReversed = index % 2 !== 0;

            return (
              <div
                key={project.id}
                onClick={() => onNavigateToProject?.(project.id)}
                className={`project-row grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center cursor-pointer group ${
                  isReversed ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Image */}
              <div className="overflow-hidden">
  <img
    src={project.imageUrl}
    alt={project.title}
    className="w-full h-auto max-h-[520px] object-contain transition-transform duration-[900ms] ease-out group-hover:scale-[1.03]"
  />
</div>


                {/* Content */}
                <div className="max-w-xl">
                  <span className="block text-[10px] font-mono uppercase tracking-[0.4em] text-neutral-400 mb-6">
                    {project.category}
                  </span>

                  <h3 className="text-4xl md:text-5xl font-bold tracking-tighter italic uppercase mb-6 group-hover:text-rebirth-green transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-neutral-600 text-lg leading-relaxed mb-10">
                    {project.description}
                  </p>

                  <div className="flex items-center gap-6">
                    <span className="text-[11px] font-bold uppercase tracking-[0.5em] text-neutral-400">
                      View Project
                    </span>
                    <span className="text-2xl transform transition-transform group-hover:translate-x-2">
                      →
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
};

export default Work;
