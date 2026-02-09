
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
    { id: '01', title: 'Creative Studio Mgmt', desc: 'Managing creative processes to deliver innovative and impactful brand solutions.', img: "https://res.cloudinary.com/dnz71cs9x/image/upload/f_auto,q_auto,w_1600/v1770206155/_K2A6866_nowpow.jpg" },
    { id: '02', title: 'Influencer Strategy', desc: 'Developing strategies to leverage influencers for authentic brand engagement.', img: "https://res.cloudinary.com/dnz71cs9x/image/upload/f_auto,q_auto,w_1600/v1770206155/_K2A6867_nowpow.jpg" },
    { id: '03', title: 'Brand Campaigns', desc: 'Designing and executing comprehensive campaigns that drive brand awareness and loyalty.', img: "https://res.cloudinary.com/dnz71cs9x/image/upload/f_auto,q_auto,w_1600/v1770206155/_K2A6868_nowpow.jpg" },
    { id: '04', title: 'Events & Activation', desc: 'Organizing and activating events to create memorable brand experiences.', img: "https://res.cloudinary.com/dnz71cs9x/image/upload/f_auto,q_auto,w_1600/v1770206155/_K2A6869_nowpow.jpg" },
    { id: '05', title: 'Digital Community', desc: 'Building and nurturing online communities to foster brand loyalty and interaction.', img: "https://res.cloudinary.com/dnz71cs9x/image/upload/f_auto,q_auto,w_1600/v1770206155/_K2A6873_nowpow.jpg" },
    { id: '06', title: 'Workshops', desc: 'Conducting interactive workshops to inspire creativity and strategic thinking.', img: "https://res.cloudinary.com/dnz71cs9x/image/upload/f_auto,q_auto,w_1600/v1770206155/_K2A6884_nowpow.jpg" },
  ];

  const processPhases = [
    { phase: '01', title: 'Discovery', label: 'AUDIT & RESEARCH', desc: 'We dive deep into your brand’s DNA, current cultural standing, and future aspirations to build a solid strategic foundation.' },
    { phase: '02', title: 'Strategy', label: 'NARRATIVE DESIGN', desc: 'We define the voice, the angle, and the unique value proposition that will make your brand a cultural leader.' },
    { phase: '03', title: 'Creation', label: 'EXECUTION', desc: 'Our studio brings the strategy to life through high-end production, design, and multi-channel content.' },
    { phase: '04', title: 'Growth', label: 'EVALUATE & SCALE', desc: 'We monitor impact, engage the community, and refine the approach for long-term legacy building.' },
  ];

  return (
    <div ref={containerRef} className="bg-white min-h-screen relative selection:bg-rebirth-green selection:text-white">
      <div className="parallax-bg fixed inset-0 z-0 pointer-events-none opacity-[0.02]">
        <span className="text-[50vw] font-black italic tracking-tighter absolute -left-20 top-20">RCS</span>
      </div>

      <div className="px-6 md:px-12 lg:px-24 relative z-10">
        {/* Header Section */}
        <section ref={heroRef} className="pt-32 pb-40 md:pt-48 md:pb-64 border-b border-neutral-100">
          <div className="hero-content max-w-7xl">
            <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-bold tracking-tighter leading-[0.8] mb-16 italic">
              Expertise <br /> & Process.
            </h1>
            <p className="text-xl md:text-3xl font-serif italic text-neutral-400 max-w-3xl leading-tight">
              We combine high-level strategy with pixel-perfect execution to create brands that don't just exist—they lead.
            </p>
          </div>
        </section>

        {/* Expertise Zig-Zag Section */}
<section className="py-32 md:py-48 space-y-32">
  {expertiseMatrix.map((item, idx) => {
    const isLeft = idx % 2 === 0; // Even index: image left, odd: image right
    return (
      <div
        key={idx}
        className={`matrix-item flex flex-col md:flex-row items-center gap-12 md:gap-24 ${
          isLeft ? "" : "md:flex-row-reverse"
        }`}
      >
        {/* Shaped Card / Image */}
        <div
          className="flex-shrink-0 w-full md:w-1/2 h-80 md:h-[400px] rounded-3xl overflow-hidden shadow-lg group"
        >
          <img
            src={item.img || "https://via.placeholder.com/600x400"}
            alt={item.title}
            className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
          />
        </div>

        {/* Text Content */}
        <div className="md:w-1/2 flex flex-col justify-center">
          <span className="text-[10px] font-bold tracking-widest text-rebirth-green mb-4 block font-mono">
            [{item.id}]
          </span>
          <h3 className="text-3xl md:text-4xl font-bold mb-6">{item.title}</h3>
          <p className="text-neutral-600 text-lg md:text-xl leading-relaxed max-w-xl">
            {item.desc}
          </p>
        </div>
      </div>
    );
  })}
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
                  [{phase.phase}]
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
            Schedule a Consultation
            <span className="text-2xl">→</span>
          </button>
        </section>
      </div>
    </div>
  );
};

export default Expertise;
