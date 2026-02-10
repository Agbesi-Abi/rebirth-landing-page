
import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Page, ProjectDetails } from '../types';
import { getProjectById } from '../data/projects';

gsap.registerPlugin(ScrollTrigger);

interface ProjectDetailProps {
  onNavigate: (page: Page) => void;
  projectId: string;
  onNavigateToProject?: (id: string) => void;
}

const ProjectDetail: React.FC<ProjectDetailProps> = ({ onNavigate, projectId, onNavigateToProject }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  
  const project = getProjectById(projectId) || getProjectById('24-hours-with-kalyjay')!;
  const nextProjectId = projectId === '24-hours-with-kalyjay' ? '24-hours-with-kalyjay' : '24-hours-with-kalyjay';
  const nextProject = getProjectById(nextProjectId)!;

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Progress Bar
      gsap.to(progressBarRef.current, {
        scaleX: 1, ease: "none", scrollTrigger: { trigger: containerRef.current, start: "top top", end: "bottom bottom", scrub: 0.1 }
      });

      // 2. Hero Entrance
      const tl = gsap.timeline();
      tl.from(".hero-char", {
        yPercent: 100, opacity: 0, stagger: 0.03, duration: 1.2, ease: "expo.out"
      })
      .from(".hero-meta-item", {
        y: 20, opacity: 0, stagger: 0.1, duration: 1, ease: "power3.out"
      }, "-=0.8");

      // 3. Narrative & Image Reveals
      gsap.utils.toArray('.img-wrapper').forEach((wrapper: any, i) => {
        const img = wrapper.querySelector('img');
        const parallaxVal = project.fragments[i]?.parallax || 0.1;
        gsap.to(img, {
          yPercent: parallaxVal * 100, ease: "none", scrollTrigger: { trigger: wrapper, start: "top bottom", end: "bottom top", scrub: true }
        });
        gsap.from(wrapper, {
          y: 60, opacity: 0, duration: 1.5, ease: "expo.out", scrollTrigger: { trigger: wrapper, start: "top 95%", toggleActions: "play none none reverse" }
        });
      });
    }, containerRef);
    return () => ctx.revert();
  }, [projectId]);

  return (
    <div ref={containerRef} className="bg-white min-h-screen selection:bg-rebirth-green pb-32">
      <div ref={progressBarRef} className="fixed top-0 left-0 right-0 h-[3px] bg-rebirth-green z-[100] origin-left scale-x-0" />

      {/* Hero */}
      <section className="pt-24 md:pt-44 px-6 md:px-12 lg:px-24">
        <div className="flex flex-col gap-10 md:gap-16 border-b border-neutral-100 pb-20 md:pb-32">
          <div className="flex items-center gap-3 hero-meta-item">
            <span className="w-2 h-2 bg-rebirth-green rounded-full"></span>
            <span className="text-[10px] font-mono tracking-widest text-neutral-400 font-bold uppercase italic font-mono">// UNIT_{project.id.replace(/-/g, '_').toUpperCase()}</span>
          </div>
          
          <h1 className="text-5xl sm:text-7xl md:text-[12vw] font-bold tracking-tighter leading-[0.82] italic uppercase overflow-hidden">
            {project.title.split('').map((char, i) => (
              <span key={i} className="hero-char inline-block whitespace-pre">{char}</span>
            ))}
          </h1>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 mt-4 hero-meta-item">
            <div>
              <p className="text-[9px] font-mono text-neutral-300 uppercase tracking-widest mb-3 font-bold">Client</p>
              <p className="text-xs md:text-sm font-bold uppercase tracking-widest">{project.client}</p>
            </div>
            <div>
              <p className="text-[9px] font-mono text-neutral-300 uppercase tracking-widest mb-3 font-bold">Protocol</p>
              <div className="flex flex-col gap-2">
                {project.services.map((s, i) => (
                  <span key={i} className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">{s}</span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-[9px] font-mono text-neutral-300 uppercase tracking-widest mb-3 font-bold">Location</p>
              <p className="text-xs md:text-sm font-bold uppercase tracking-widest">{project.location}</p>
            </div>
            <div className="hidden lg:block">
              <p className="text-[9px] font-mono text-neutral-300 uppercase tracking-widest mb-3 font-bold">Year</p>
              <p className="text-xs md:text-sm font-bold uppercase tracking-widest">{project.year}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="py-24 md:py-48 px-6 md:px-12 lg:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-24">
          <div className="lg:col-span-4">
            <span className="text-[10px] font-bold tracking-[0.6em] text-rebirth-green uppercase mb-12 block font-mono">// SYNOPSIS</span>
          </div>
          <div className="lg:col-span-8">
            <p className="text-3xl md:text-5xl lg:text-6xl font-serif italic text-neutral-900 leading-[1.1] tracking-tighter max-w-4xl">
              {project.description}
            </p>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="px-6 md:px-12 lg:px-24">
        <div className="grid grid-cols-12 gap-6 md:gap-16 lg:gap-24">
          {project.fragments.map((frag, idx) => (
            <div key={idx} className={`img-wrapper relative ${frag.colSpan}`}>
              <div className={`overflow-hidden relative ${frag.aspect} bg-neutral-100 group`}>
                <img 
                  src={frag.url} 
                  alt={frag.label} 
                  className="w-full h-full object-cover grayscale brightness-90 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-[2.5s] scale-110" 
                />
                <div className="absolute inset-0 bg-rebirth-green/5 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
              <div className="mt-6 flex justify-between items-baseline border-t border-neutral-100 pt-4 font-mono">
                 <span className="text-[9px] font-bold text-rebirth-green uppercase tracking-widest">[{frag.label}]</span>
                 <span className="text-[8px] text-neutral-300 uppercase tracking-widest">{frag.meta}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

  

      {/* Bottom Nav - Responsive Footer to toggle between 2 projects */}
      <section className="pt-48 pb-20 flex flex-col items-center justify-center text-center px-6">
        <span className="text-[10px] font-bold tracking-[0.7em] text-rebirth-green uppercase mb-16 block font-mono animate-pulse italic">NEXT_CASE_STUDY</span>
        <button 
           onClick={() => onNavigateToProject?.(nextProjectId)}
           className="group relative max-w-6xl w-full"
        >
          <div className="overflow-hidden mb-12">
            <h2 className="text-5xl sm:text-7xl md:text-[11vw] font-bold tracking-tighter leading-[0.8] italic uppercase group-hover:text-rebirth-green transition-all duration-700">
              {nextProject.title.split(' ').map((word, i) => (
                <React.Fragment key={i}>{word}<br /></React.Fragment>
              ))}
            </h2>
          </div>
          <div className="mt-12 inline-flex items-center gap-8 group-hover:gap-16 transition-all duration-700">
             <div className="w-20 h-[1.5px] bg-rebirth-green"></div>
             <span className="text-[11px] font-bold uppercase tracking-[0.6em]">Initialize Transfer</span>
             <span className="text-4xl transform group-hover:translate-x-6 transition-transform duration-700">→</span>
          </div>
        </button>
      </section>
    </div>
  );
};

export default ProjectDetail;
