
import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Page, Project } from '../types';

gsap.registerPlugin(ScrollTrigger);

interface WorkProps {
  onNavigate: (page: Page) => void;
}

const projects: Project[] = [
  { id: 1, title: 'The Sound of Tomorrow', category: 'Creative Direction', imageUrl: 'https://res.cloudinary.com/dnz71cs9x/image/upload/f_auto,q_auto,w_1000/v1770130192/_W6A7206_pino4p.jpg' },
  { id: 2, title: 'Global Identity Reset', category: 'Brand Strategy', imageUrl: 'https://res.cloudinary.com/dnz71cs9x/image/upload/f_auto,q_auto,w_1200/v1770206155/_K2A6866_nowpow.jpg' },
  { id: 3, title: 'Creator Summit 2024', category: 'Activations', imageUrl: 'https://res.cloudinary.com/dnz71cs9x/image/upload/f_auto,q_auto,w_1200/v1770206155/1Y3A6629_ozf2mz.jpg' },
  { id: 4, title: 'Digital First Vision', category: 'Digital Production', imageUrl: 'https://res.cloudinary.com/dnz71cs9x/image/upload/f_auto,q_auto,w_1200/v1770206155/1Y3A4697_x5zbwu.jpg' },
  { id: 5, title: 'Culture Pulse', category: 'Community Building', imageUrl: 'https://res.cloudinary.com/dnz71cs9x/image/upload/f_auto,q_auto,w_1200/v1770206176/1Y3A6944_e6qsrj.jpg' },
];

const Work: React.FC<WorkProps> = ({ onNavigate }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Header Entrance
      gsap.from(".work-header", {
        y: 60,
        opacity: 0,
        duration: 1.2,
        ease: "expo.out"
      });

      // 2. Project List Reveal
      const projectItems = gsap.utils.toArray('.project-item');
      projectItems.forEach((item: any) => {
        const img = item.querySelector('.project-image');
        const text = item.querySelector('.project-text');

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        });

        tl.from(img, { y: 60, opacity: 0, duration: 1.2, ease: "power4.out" })
          .from(text, { y: 30, opacity: 0, duration: 1, ease: "power3.out" }, "-=0.8");
      });

      // 3. Final CTA Reveal
      gsap.from(".work-cta-text", {
        y: 50,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: ".work-cta",
          start: "top 80%"
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="px-6 md:px-12 lg:px-24 max-w-screen-2xl mx-auto overflow-hidden">
      <section className="pt-32 pb-64 md:pb-80">
        <div className="work-header mb-40">
          <h1 className="text-7xl md:text-9xl lg:text-[10rem] font-bold tracking-tighter leading-[0.85] mb-12">
            Selected <br />Portfolios
          </h1>
          <p className="text-neutral-300 uppercase text-[10px] tracking-[0.6em] font-bold">— ARCHIVE INDEX 2024</p>
        </div>
        
        <div className="space-y-64 md:space-y-96">
          {projects.map((project, index) => (
            <div 
              key={project.id}
              className={`project-item flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-16 md:gap-32 items-start`}
            >
              <div className="project-image w-full md:w-8/12 group relative overflow-hidden bg-neutral-50 shadow-xl">
                <img 
                  src={project.imageUrl} 
                  alt={project.title} 
                  className="w-full aspect-video md:aspect-[16/9] object-cover grayscale brightness-90 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-[1.2s] group-hover:scale-105"
                />
                <div className="absolute top-8 right-8 text-white opacity-0 group-hover:opacity-100 transition-all duration-700 flex items-center gap-6">
                   <span className="text-[10px] uppercase tracking-[0.4em] font-bold hidden sm:block">Case Study 0{project.id}</span>
                   <div className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center bg-white/10 backdrop-blur-md">→</div>
                </div>
              </div>
              <div className="project-text w-full md:w-3/12 pt-8 md:pt-16">
                <span className="text-[10px] uppercase tracking-[0.4em] text-rebirth-green mb-8 block font-bold italic">{project.category}</span>
                <h3 className="text-4xl md:text-5xl font-bold tracking-tighter mb-8 leading-[1.1]">{project.title}</h3>
                <div className="w-16 h-[1px] bg-neutral-200 mb-8"></div>
                <p className="text-base text-neutral-400 font-light leading-relaxed mb-10">
                  Pushing boundaries of digital engagement through immersive experiences.
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Large Scale CTA */}
      <section className="work-cta py-64 md:py-[50vh] flex flex-col items-center text-center border-t border-neutral-50">
        <h2 className="work-cta-text text-5xl sm:text-6xl md:text-[8vw] font-bold tracking-tighter mb-24 leading-[0.8] max-w-6xl px-4">
          You like what you see? <br />
          <span className="text-rebirth-green font-serif italic font-light opacity-60">Manifest your vision.</span>
        </h2>
        <button 
          onClick={() => onNavigate('contact')}
          className="relative w-32 h-32 md:w-48 md:h-48 rounded-full border border-rebirth-green flex items-center justify-center overflow-hidden group transition-transform hover:scale-110 active:scale-95"
        >
          <span className="relative z-10 text-4xl md:text-5xl transition-colors duration-700 group-hover:text-white">↗</span>
          <div className="absolute inset-0 bg-rebirth-green transform scale-0 group-hover:scale-100 transition-transform duration-700 rounded-full"></div>
        </button>
      </section>
    </div>
  );
};

export default Work;
