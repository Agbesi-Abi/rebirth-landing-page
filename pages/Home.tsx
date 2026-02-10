import React, { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Page } from '../types';

gsap.registerPlugin(ScrollTrigger);

interface HomeProps {
  onNavigate: (page: Page) => void;
  onNavigateToProduct: (id: string) => void;
}

const Home: React.FC<HomeProps> = ({ onNavigate, onNavigateToProduct }) => {
  const horizontalWrapperRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const manifestoRef = useRef<HTMLElement>(null);
  const clientDossierRef = useRef<HTMLDivElement>(null);
  const [activeCapability, setActiveCapability] = useState(0);
  const [currentReview, setCurrentReview] = useState(0);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const reviews = [
    {
      quote: "Rebirth defines the cultural pulse of our brand. Their strategic approach is unlike anything we've seen.",
      author: "Marcus Chen",
      role: "Global Marketing Director",
      id: "REF_001"
    },
    {
      quote: "A masterclass in intentional creativity. They brought a depth that translated to record engagement.",
      author: "Sarah J. Boateng",
      role: "Founder",
      id: "REF_002"
    },
    {
      quote: "They understood our community better than we did, bridging the gap between legacy and the next generation.",
      author: "David Olufemi",
      role: "Head of Strategy",
      id: "REF_003"
    }
  ];

  const partners = [
    { id: '01', name: 'Tech Innovators', img: 'https://res.cloudinary.com/dnz71cs9x/image/upload/f_auto,q_auto,dpr_auto,w_1200/v1770130174/1Y3A4707_lriemd.jpg', span: 'col-span-2 row-span-2', offset: 'md:translate-y-0' },
    { id: '02', name: 'Bloom Luxury', img: 'https://res.cloudinary.com/dnz71cs9x/image/upload/f_auto,q_auto,dpr_auto,w_1200/v1770206157/1Y3A7092_wtrhu6.jpg', span: 'col-span-1 row-span-1', offset: 'md:translate-y-20' },
    { id: '03', name: 'Urban Pulse', img: 'https://res.cloudinary.com/dnz71cs9x/image/upload/f_auto,q_auto,dpr_auto,w_1200/v1770130191/_K2A7099_rc5cdf.jpg', span: 'col-span-1 row-span-2', offset: 'md:-translate-y-10' },
    { id: '04', name: 'Ethereal Goods', img: 'https://res.cloudinary.com/dnz71cs9x/image/upload/f_auto,q_auto,dpr_auto,w_1200/v1770130174/1Y3A4609_tsj8aq.jpg', span: 'col-span-1 row-span-1', offset: 'md:translate-y-0' },
    { id: '05', name: 'Future Form', img: 'https://res.cloudinary.com/dnz71cs9x/image/upload/f_auto,q_auto,dpr_auto,w_1200/v1770130189/_K2A6899_xtowwf.jpg', span: 'col-span-2 row-span-1', offset: 'md:-translate-y-20' },
  ];

  const capabilities = [
    { id: "01", title: "Activists.", tag: "STRATEGY", desc: "Redefining accountability through digital visual language.", img: "https://res.cloudinary.com/dnz71cs9x/image/upload/f_auto,q_auto,w_1200/v1770130192/_W6A7206_pino4p.jpg", projectId: "fix-the-country" },
    { id: "02", title: "Talent.", tag: "MANAGEMENT", desc: "Capturing the raw architecture of modern influence.", img: "https://res.cloudinary.com/dnz71cs9x/image/upload/f_auto,q_auto,w_600/v1770130192/_W6A6240_xpxrqv.jpg", projectId: "24-hours-with-kalyjay" },
    { id: "03", title: "Studio.", tag: "PRODUCTION", desc: "High-end content designed for the digital legacy era.", img: "https://res.cloudinary.com/dnz71cs9x/image/upload/f_auto,q_auto,w_1000/v1770159831/1Y3A4981_y41hjy.jpg", projectId: "fix-the-country" }
  ];

  const handleNextReview = () => {
    const cardToAnimate = cardRefs.current[currentReview];
    if (cardToAnimate) {
      gsap.to(cardToAnimate, {
        x: 800,
        y: -200,
        rotate: 45,
        opacity: 0,
        duration: 0.8,
        ease: "back.in(1.2)",
        onComplete: () => {
          setCurrentReview((prev) => (prev + 1) % reviews.length);
          if (currentReview === reviews.length - 1) {
            cardRefs.current.forEach((card, i) => {
              if (card) {
                gsap.fromTo(card, { opacity: 0, x: -300 }, {
                  opacity: 1, x: 0, y: 0, rotate: i * 2 - (reviews.length / 2), duration: 0.6, delay: i * 0.1,
                });
              }
            });
          }
        }
      });
    }
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Hero Animations
      const heroItems = heroRef.current?.querySelectorAll('.hero-item');
      if (heroItems) {
        gsap.fromTo(heroItems, 
          { y: 50, opacity: 0, filter: "blur(10px)" },
          { y: 0, opacity: 1, filter: "blur(0px)", stagger: 0.1, duration: 1, ease: "expo.out", delay: 0.2 }
        );
      }

      // Horizontal Scroll
      const sections = gsap.utils.toArray('.capability-card');
      gsap.to(sections, { 
        xPercent: -100 * (sections.length - 1), 
        ease: "none", 
        scrollTrigger: { 
          trigger: horizontalWrapperRef.current, 
          pin: true, 
          scrub: 1, 
          snap: 1 / (sections.length - 1),
          onUpdate: (self) => setActiveCapability(Math.round(self.progress * (sections.length - 1))),
          end: () => "+=" + (horizontalWrapperRef.current?.offsetWidth || window.innerWidth) 
        } 
      });

      // Reviews Initial Positioning
      cardRefs.current.forEach((card, i) => {
        if (card) {
          gsap.set(card, { rotate: i * 2 - reviews.length, zIndex: reviews.length - i });
        }
      });

      // Marquee
      gsap.to(".client-marquee", { xPercent: -50, ease: "none", scrollTrigger: { trigger: clientDossierRef.current, start: "top bottom", end: "bottom top", scrub: 1 } });
    }, [horizontalWrapperRef]);

    return () => ctx.revert();
  }, []);

  return (
    <div className="bg-white">
      {/* ================= HERO ================= */}
      <section
        ref={heroRef}
        className="hero-bg min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-24"
      >
        {/* Desktop */}
        <h1 className="hidden md:flex flex-col font-bold italic tracking-tighter leading-[0.85] uppercase">
          <span className="hero-item text-[9.5vw]">Redefining</span>
          <span className="hero-item text-[9.5vw] text-right text-rebirth-green">
            Digital
          </span>
          <span className="hero-item text-[9.5vw] md:pl-[10%]">
            Creativity
          </span>
        </h1>

        {/* Mobile */}
        <h1 className="md:hidden flex flex-col font-bold italic leading-tight uppercase">
          <span className="hero-item text-[14vw]">Bold ideas.</span>
          <span className="hero-item text-[14vw] text-rebirth-green">
            Real culture.
          </span>
          <span className="hero-item text-[14vw]">Digital first.</span>
        </h1>

        <p className="hero-item mt-6 max-w-md text-neutral-500 text-sm">
          We create culture-forward stories for brands shaping the next
          generation.
        </p>

        <button
          onClick={() => onNavigate("expertise")}
          className="hero-item mt-10 w-fit uppercase text-[11px] tracking-[0.4em] font-bold border-b-2 border-rebirth-green pb-2"
        >
          Explore Expertise →
        </button>
      </section>

            {/* ================= MANIFESTO ================= */}
      <section ref={manifestoRef} className="py-24 md:py-36 px-0 md:px-12 lg:px-24 bg-white overflow-hidden">
        <div className="md:bg-rebirth-green md:rounded-tr-[4rem] lg:flex lg:items-center lg:gap-10 md:p-12 max-w-7xl mx-auto md:text-white transition-all">
          {/* Mobile Image: Full Width Top */}
          <div className="lg:w-5/12 mb-12 md:mb-0 lg:mt-0 md:order-2">
            <img 
              src="/images/manifesto.jpeg" 
              className="w-full h-auto object-cover aspect-[4/5] md:aspect-[4/5] md:rounded-lg" 
              alt="Manifesto" 
            />
          </div>
          
          {/* Mobile Text: Padded below image */}
          <div className="lg:w-7/12 md:order-1 px-6 md:px-0">
            <p className="text-4xl md:text-5xl font-bold tracking-tighter leading-[1.1] italic mb-10 text-rebirth-black md:text-white">
              We take <span className="text-rebirth-green md:text-white/80">ordinary</span> ideas, twist them, and turn them into <span className="md:text-white/80 underline decoration-1 underline-offset-8">bold stories</span> that reshape culture.
            </p>
            <button 
              onClick={() => onNavigate('expertise')} 
              className="text-[10px] md:text-xs font-bold tracking-[0.4em] uppercase border-b-2 border-rebirth-green md:border-white pb-1 text-rebirth-black md:text-white hover:text-rebirth-green md:hover:text-white/70 transition-colors"
            >
              Our Philosophy →
            </button>
          </div>
        </div>
      </section>

      {/* ================= HORIZONTAL CAPABILITIES ================= */}
      <section ref={horizontalWrapperRef} className="bg-rebirth-black overflow-hidden relative h-[65vh] md:h-[75vh]">
        <div className="flex h-full w-[300vw] items-center">
          {capabilities.map((item, index) => (
            <div key={index} className="capability-card relative h-full w-screen flex-shrink-0 flex items-center p-0 md:p-12 lg:p-24 overflow-hidden">
              <div className="absolute inset-0 md:relative md:inset-auto md:w-full md:max-w-screen-2xl md:mx-auto md:grid md:grid-cols-12 md:gap-12 md:items-center h-full">
                
                {/* Image */}
                <div className="absolute inset-0 md:relative md:col-span-7 h-full md:h-[55vh] lg:h-[60vh] overflow-hidden order-1 md:order-2">
                  <img src={item.img} className="w-full h-full object-cover brightness-[0.4] md:brightness-75" alt={item.title} />
                  <div className="absolute inset-0 bg-gradient-to-b from-rebirth-black/60 via-transparent to-rebirth-black md:bg-gradient-to-r md:from-rebirth-black md:via-rebirth-black/10 md:to-transparent"></div>
                </div>

                {/* Content */}
                <div className="relative z-10 flex flex-col justify-end md:justify-center h-full p-8 md:p-0 md:col-span-5 order-2 md:order-1">
                  <div className="max-w-md">
                    <span className="text-[9px] font-mono font-bold tracking-[0.4em] text-rebirth-green mb-3 md:mb-6 block">[{item.id} // {item.tag}]</span>
                    <h3 className="text-3xl md:text-[5vw] font-bold text-white tracking-tighter mb-4 md:mb-8 leading-none uppercase italic">{item.title}</h3>
                    <p className="text-[13px] md:text-base text-neutral-300 md:text-neutral-400 font-light leading-relaxed mb-6 md:mb-10 max-w-sm">
                      {item.desc}
                    </p>
                    <button onClick={() => onNavigateToProduct(item.projectId)} className="group flex items-center justify-center gap-4 text-white uppercase text-[8px] md:text-[9px] tracking-widest font-bold border border-white/20 px-5 py-3 md:px-8 md:py-4 hover:bg-rebirth-green hover:border-rebirth-green transition-all">
                      View Case Study
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Indicator */}
        <div className="absolute bottom-10 right-10 z-30 flex flex-col items-end gap-4">
           <div className="flex gap-2">
            {capabilities.map((_, i) => (
              <div key={i} className={`h-[2px] transition-all duration-500 ${activeCapability === i ? 'w-8 bg-rebirth-green' : 'w-2 bg-white/20'}`} />
            ))}
           </div>
        </div>
      </section>



      {/* ================= CLIENT DOSSIER ================= */}
      <section ref={clientDossierRef} className="py-32 px-6 md:px-12 lg:px-24 bg-white relative overflow-hidden">
        <div className="absolute top-1/2 left-0 w-full whitespace-nowrap opacity-[0.03] pointer-events-none select-none">
          <div className="client-marquee text-[15vw] font-black uppercase tracking-tighter inline-block">TECH INNOVATORS BLOOM LUXURY URBAN PULSE ETHEREAL GOODS FUTURE FORM &nbsp;</div>
          <div className="client-marquee text-[15vw] font-black uppercase tracking-tighter inline-block">TECH INNOVATORS BLOOM LUXURY URBAN PULSE ETHEREAL GOODS FUTURE FORM &nbsp;</div>
        </div>
        <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-min">
          {partners.map((partner, index) => (
            <div key={index} className={`group relative overflow-hidden bg-neutral-50 border border-neutral-100 ${partner.span} ${partner.offset}`}>
              <div className="w-full h-full overflow-hidden">
                <img src={partner.img} alt={partner.name} className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110" />
              </div>
              <div className="absolute inset-0 bg-rebirth-black/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <h3 className="text-white text-lg font-bold italic tracking-tighter">{partner.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= TESTIMONIALS ================= */}
      <section className="py-32 bg-white px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <h2 className="text-5xl md:text-8xl font-bold tracking-tighter italic leading-none">The <span className="text-rebirth-green">Response.</span></h2>
          <div className="relative w-full max-w-[400px] h-[500px] mx-auto" style={{ perspective: '1500px' }}>
            {reviews.map((review, idx) => (
              <div key={idx} ref={el => { cardRefs.current[idx] = el; }} className="absolute inset-0 bg-rebirth-black p-10 flex flex-col justify-between border border-neutral-900 shadow-2xl">
                <p className="text-2xl font-serif italic text-white leading-tight">"{review.quote}"</p>
                <div className="flex flex-col gap-2 pt-8 border-t border-white/10 text-white">
                  <span className="text-[10px] font-bold uppercase tracking-widest">{review.author}</span>
                  <span className="text-[8px] uppercase tracking-widest text-neutral-500">{review.role}</span>
                </div>
                <button onClick={handleNextReview} className="w-10 h-10 bg-white flex items-center justify-center self-end">
                  <span>→</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FOOTER CTA ================= */}
      <section className="py-48 flex flex-col items-center text-center px-6">
        <h2 className="text-5xl md:text-[10vw] font-bold tracking-tighter italic leading-none mb-24">Start <span className="text-rebirth-green">Today.</span></h2>
        <button onClick={() => onNavigate('contact')} className="w-full md:w-auto px-20 py-8 bg-rebirth-black text-white text-[11px] uppercase tracking-[0.5em] font-bold hover:bg-rebirth-green transition-colors">Initiate Proposal</button>
      </section>
    </div>
  );
};

export default Home;