
import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Page } from '../types';

gsap.registerPlugin(ScrollTrigger);

interface ExpertiseProps {
  onNavigate: (page: Page) => void;
}

const Expertise: React.FC<ExpertiseProps> = ({ onNavigate }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const processRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Hero Entrance
      gsap.from(".hero-content > *", {
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
        ease: "power4.out",
      });

      // 2. Expertise Cards (Matrix) Reveal
      const matrixItems = gsap.utils.toArray('.matrix-item');
      matrixItems.forEach((item: any) => {
        gsap.from(item, {
          y: 40,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 90%",
            toggleActions: "play none none reverse"
          }
        });
      });

      // 3. Process Steps Reveal
      const processSteps = gsap.utils.toArray('.process-step');
      processSteps.forEach((step: any, i) => {
        gsap.from(step, {
          x: -30,
          opacity: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: step,
            start: "top 85%",
          }
        });
      });

      // 4. Parallax Background Element
      gsap.to(".parallax-bg", {
        yPercent: -20,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          scrub: true
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const expertiseMatrix = [
    { id: '01', title: 'Digital Brand Identity', desc: 'Crafting visual languages that communicate core values with precision.' },
    { id: '02', title: 'Content Strategy', desc: 'Narrative-driven content that cuts through noise and builds community.' },
    { id: '03', title: 'UI / UX Design', desc: 'Seamless digital experiences designed for conversion and delight.' },
    { id: '04', title: 'Art Direction', desc: 'Visual storytelling that elevates brand perception to premium status.' },
    { id: '05', title: 'Motion Graphics', desc: 'Fluid animations that bring static interfaces to life.' },
    { id: '06', title: 'Cultural Consulting', desc: 'Deep-dive research into cultural shifts to future-proof brands.' },
  ];

  const processPhases = [
    { phase: '01', title: 'Discovery', label: 'AUDIT & RESEARCH', desc: 'We dive deep into your brand’s DNA, current cultural standing, and future aspirations to build a solid strategic foundation.' },
    { phase: '02', title: 'Strategy', label: 'NARRATIVE DESIGN', desc: 'We define the voice, the angle, and the unique value proposition that will make your brand a cultural leader.' },
    { phase: '03', title: 'Creation', label: 'EXECUTION', desc: 'Our studio brings the strategy to life through high-end production, design, and multi-channel content.' },
    { phase: '04', title: 'Growth', label: 'EVALUATE & SCALE', desc: 'We monitor impact, engage the community, and refine the approach for long-term legacy building.' },
  ];

  return (
    <div ref={containerRef} className="bg-white min-h-screen relative selection:bg-rebirth-green selection:text-white">
      {/* Kota-inspired background aesthetic */}
      <div className="parallax-bg fixed inset-0 z-0 pointer-events-none opacity-[0.02]">
        <span className="text-[60vw] font-black italic tracking-tighter absolute -left-20 top-20">RBX</span>
      </div>

      <div className="px-6 md:px-12 lg:px-24 relative z-10">
        {/* Header Section */}
        <section ref={heroRef} className="pt-32 pb-40 md:pt-48 md:pb-64 border-b border-neutral-100">
          <div className="hero-content max-w-7xl">
            <span className="text-[10px] font-bold tracking-[0.5em] text-rebirth-green uppercase mb-12 block">OUR CAPABILITIES</span>
            <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-bold tracking-tighter leading-[0.8] mb-16 italic">
              Expertise <br /> & Process.
            </h1>
            <p className="text-xl md:text-3xl font-serif italic text-neutral-400 max-w-3xl leading-tight">
              We combine high-level strategy with pixel-perfect execution to create brands that don't just exist—they lead.
            </p>
          </div>
        </section>

        {/* Expertise Matrix */}
        <section className="py-32 md:py-48 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-b border-neutral-100">
          {expertiseMatrix.map((item, idx) => (
            <div 
              key={idx} 
              className="matrix-item p-12 md:p-16 border-b border-neutral-100 md:border-r last:border-r-0 odd:md:border-r-0 lg:odd:md:border-r lg:[&:nth-child(3n)]:border-r-0 group hover:bg-rebirth-black transition-colors duration-700"
            >
              <span className="text-[10px] font-bold tracking-widest text-rebirth-green mb-10 block font-mono group-hover:text-white transition-colors">[{item.id}]</span>
              <h3 className="text-3xl font-bold tracking-tighter mb-6 group-hover:text-white transition-colors">{item.title}</h3>
              <p className="text-neutral-400 text-sm leading-relaxed max-w-xs group-hover:text-neutral-300 transition-colors">
                {item.desc}
              </p>
            </div>
          ))}
        </section>

        {/* Our Process - Structured & Tech-inspired */}
        <section ref={processRef} className="py-32 md:py-48">
          <div className="flex flex-col lg:flex-row justify-between items-start mb-32 gap-12">
            <div className="max-w-xl">
              <span className="text-[10px] font-bold tracking-[0.5em] text-rebirth-green uppercase mb-8 block">HOW WE WORK</span>
              <h2 className="text-5xl md:text-7xl font-bold tracking-tighter leading-none italic mb-10">The <span className="text-rebirth-green">Rebirth</span> Protocol.</h2>
            </div>
            <div className="pt-4">
              <p className="text-neutral-400 max-w-sm text-sm uppercase tracking-widest leading-loose font-bold">
                A rigid framework for liquid creativity. We believe that structure allows for the boldest expression.
              </p>
            </div>
          </div>

          <div className="space-y-0 border-t border-neutral-100">
            {processPhases.map((phase, idx) => (
              <div 
                key={idx} 
                className="process-step group grid grid-cols-1 md:grid-cols-12 py-16 border-b border-neutral-100 items-start hover:bg-neutral-50/50 transition-all px-4"
              >
                <div className="md:col-span-1 text-[10px] font-mono font-bold text-rebirth-green pt-2">
                  // {phase.phase}
                </div>
                <div className="md:col-span-4 mt-4 md:mt-0">
                  <h3 className="text-4xl md:text-5xl font-bold tracking-tighter uppercase">{phase.title}</h3>
                  <span className="text-[9px] font-black tracking-widest text-neutral-300 block mt-4 group-hover:text-rebirth-green transition-colors">{phase.label}</span>
                </div>
                <div className="md:col-span-6 md:col-start-7 mt-8 md:mt-0">
                  <p className="text-lg text-neutral-400 font-light leading-relaxed max-w-lg">
                    {phase.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Philosophy Callout */}
        <section className="py-48 bg-rebirth-black -mx-6 md:-mx-12 lg:-mx-24 px-6 md:px-12 lg:px-24 flex flex-col items-center text-center">
           <div className="max-w-5xl">
              <h2 className="text-4xl md:text-7xl lg:text-8xl font-serif italic text-white leading-[0.95] tracking-tighter mb-16">
                "We don't build assets; we nurture <span className="text-rebirth-green">ecosystems</span> where brands flourish."
              </h2>
              <button 
                onClick={() => onNavigate('contact')}
                className="group relative inline-flex items-center justify-center bg-white px-12 py-6 overflow-hidden"
              >
                <span className="relative z-10 text-black text-[10px] uppercase tracking-[0.6em] font-bold">Initiate Project</span>
                <div className="absolute inset-0 bg-rebirth-green transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700"></div>
              </button>
           </div>
        </section>

        {/* Footer CTA */}
        <section ref={footerRef} className="py-64 md:py-96 flex flex-col items-center justify-center text-center">
          <h2 className="text-4xl md:text-8xl font-bold italic mb-20 leading-tight tracking-tighter">
            Elevate your <br /><span className="text-rebirth-green">cultural footprint.</span>
          </h2>
          <button 
            onClick={() => onNavigate('contact')}
            className="group flex items-center gap-10 text-[10px] uppercase tracking-[0.5em] font-bold border-b-2 border-rebirth-green pb-4 hover:gap-16 transition-all"
          >
            Start Proposal
            <span className="text-2xl">→</span>
          </button>
        </section>
      </div>
    </div>
  );
};

export default Expertise;
