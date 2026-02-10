
import React, { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Page } from '../types';

gsap.registerPlugin(ScrollTrigger);

interface HomeProps {
  onNavigate: (page: Page) => void;
}

const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  const horizontalWrapperRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const manifestoRef = useRef<HTMLElement>(null);
  const inspirationRef = useRef<HTMLElement>(null);
  const clientDossierRef = useRef<HTMLDivElement>(null);
  const [currentReview, setCurrentReview] = useState(0);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const reviews = [
    {
      quote: "Rebirth defines the cultural pulse of our brand. Their strategic approach is unlike anything we've seen.",
      author: "Marcus Chen",
      role: "Global Marketing Director, Tech Innovators",
    },
    {
      quote: "A masterclass in intentional creativity. They brought a depth that translated to record engagement.",
      author: "Sarah J. Boateng",
      role: "Founder, Bloom Luxury",
    },
    {
      quote: "They understood our community better than we did, bridging the gap between legacy and the next generation.",
      author: "David Olufemi",
      role: "Head of Strategy, Urban Pulse",
    }
  ];

  const partners = [
    { id: '01', name: 'Tech Innovators', img: 'https://res.cloudinary.com/dnz71cs9x/image/upload/f_auto,q_auto,w_800/v1770130192/_W6A7206_pino4p.jpg', span: 'col-span-2 row-span-2', offset: 'md:translate-y-0' },
    { id: '02', name: 'Bloom Luxury', img: 'https://res.cloudinary.com/dnz71cs9x/image/upload/f_auto,q_auto,w_800/v1770206155/_K2A6866_nowpow.jpg', span: 'col-span-1 row-span-1', offset: 'md:translate-y-20' },
    { id: '03', name: 'Urban Pulse', img: 'https://res.cloudinary.com/dnz71cs9x/image/upload/f_auto,q_auto,w_800/v1770206176/1Y3A6944_e6qsrj.jpg', span: 'col-span-1 row-span-2', offset: 'md:-translate-y-10' },
    { id: '04', name: 'Ethereal Goods', img: 'https://res.cloudinary.com/dnz71cs9x/image/upload/f_auto,q_auto,w_800/v1770130176/1Y3A5491_xfiqac.jpg', span: 'col-span-1 row-span-1', offset: 'md:translate-y-0' },
    { id: '05', name: 'Future Form', img: 'https://res.cloudinary.com/dnz71cs9x/image/upload/f_auto,q_auto,w_800/v1770130175/1Y3A4626_b0jeme.jpg', span: 'col-span-2 row-span-1', offset: 'md:-translate-y-20' },
  ];

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Hero Entrance: Sequential Scale + Subtle Bounce
      const heroItems = heroRef.current?.querySelectorAll('.hero-item');
      if (heroItems) {
        gsap.fromTo(heroItems, 
          { 
            scale: 0.8,
            y: 60, 
            opacity: 0, 
            filter: "blur(10px)"
          },
          { 
            scale: 1,
            y: 0, 
            opacity: 1, 
            filter: "blur(0px)", 
            stagger: 0.25, 
            duration: 1.4, 
            ease: "back.out(1.2)", 
            delay: 0.4 
          }
        );
      }

      // 2. Manifesto "Slide Over" Effect
      ScrollTrigger.create({
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        pin: true,
        pinSpacing: false,
      });

      gsap.from(".manifesto-content", {
        scrollTrigger: {
          trigger: manifestoRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        },
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out"
      });

      // 3. Inspiration Section Entrance
      gsap.from(".inspiration-text", {
        scrollTrigger: {
          trigger: inspirationRef.current,
          start: "top 80%",
        },
        y: 60,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out"
      });

      // 4. Horizontal Scroll Capabilities
      const sections = gsap.utils.toArray('.capability-card');
      gsap.to(sections, {
        xPercent: -100 * (sections.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: horizontalWrapperRef.current,
          pin: true,
          scrub: 1,
          snap: 1 / (sections.length - 1),
          end: () => "+=" + (horizontalWrapperRef.current?.offsetWidth || window.innerWidth),
        }
      });

      // 5. Client Dossier & Marquee
      const partnerItems = gsap.utils.toArray('.partner-item');
      partnerItems.forEach((item: any) => {
        const img = item.querySelector('img');
        gsap.fromTo(item, 
          { clipPath: 'inset(100% 0% 0% 0%)', y: 100, opacity: 0 },
          { clipPath: 'inset(0% 0% 0% 0%)', y: 0, opacity: 1, duration: 1.5, ease: "expo.out", scrollTrigger: { trigger: item, start: "top 90%" } }
        );
        gsap.to(img, { yPercent: 15, ease: "none", scrollTrigger: { trigger: item, start: "top bottom", end: "bottom top", scrub: true } });
      });

      gsap.to(".client-marquee", {
        xPercent: -50,
        ease: "none",
        scrollTrigger: { trigger: clientDossierRef.current, start: "top bottom", end: "bottom top", scrub: 1 }
      });

      cardRefs.current.forEach((card, i) => {
        if (card) {
          gsap.set(card, { rotate: i * 2 - (reviews.length / 2), zIndex: reviews.length - i });
        }
      });
    }, [horizontalWrapperRef]);

    return () => ctx.revert();
  }, []);

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

  const capabilities = [
    { id: "01", title: "Studio.", tag: "PRODUCTION", desc: "High-end content production designed for the digital-first era.", img: "https://res.cloudinary.com/dnz71cs9x/image/upload/f_auto,q_auto,w_1200/v1770130189/_K2A7045_xptwf1.jpg" },
    { id: "02", title: "Talent.", tag: "MANAGEMENT", desc: "Nurturing the next generation of cultural influencers.", img: "https://res.cloudinary.com/dnz71cs9x/image/upload/f_auto,q_auto,w_1200/v1770130196/_W6A7297_rapyvy.jpg" },
    { id: "03", title: "Strategy.", tag: "CONSULTANCY", desc: "Data-driven insights meet deep cultural intuition.", img: "https://res.cloudinary.com/dnz71cs9x/image/upload/f_auto,q_auto,w_1200/v1770130190/_K2A7094_mcqvli.jpg" }
  ];



  return (
    <div className="max-w-screen-2xl mx-auto bg-white">
      {/* Hero Section */}
      <section ref={heroRef} className="h-screen flex flex-col justify-between px-6 md:px-12 lg:px-24 border-b border-neutral-100 overflow-hidden relative pb-4 md:pb-6 pt-2 md:pt-12 lg:pt-16 bg-white z-0">
        <div className="relative z-10 w-full flex-grow flex flex-col justify-center">
          <h1 className="flex flex-col font-bold italic tracking-tighter text-rebirth-black leading-[0.82] uppercase select-none w-full">
            <div className="hero-item text-[12vw] sm:text-[10vw] md:text-[9.5vw] text-left origin-left">Redefining</div>
            <div className="hero-item text-[12vw] sm:text-[10vw] md:text-[9.5vw] text-right flex items-baseline justify-end origin-right">
              <span className="inline-flex items-center justify-center bg-black border border-neutral-100 rounded-xl sm:rounded-2xl md:rounded-[2.5rem] w-12 h-12 sm:w-20 sm:h-20 md:w-36 md:h-36 mx-3 sm:mx-5 md:mx-7 shadow-sm overflow-hidden p-2 sm:p-5 md:p-7 transition-transform hover:scale-110 duration-500">
                <img src="/images/hero.png" alt="hero-image" className="w-full h-full object-cover" />
              </span>
              {/* <span 
                className="text-transparent bg-clip-text bg-cover bg-center transition-all duration-700 hover:scale-105 cursor-pointer inline-block mx-[-0.01em]"
                style={{ 
                  backgroundImage: "url('https://res.cloudinary.com/dnz71cs9x/image/upload/f_auto,q_auto,w_1000/v1770130175/1Y3A4626_b0jeme.jpg')",
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >D</span> */}
              <span className="text-rebirth-green">DIGITAL</span>
            </div>
            <div className="hero-item text-[12vw] sm:text-[10vw] md:text-[9.5vw] md:pl-[10%] text-left origin-left">Creativity</div>
          </h1>
        </div>
        
        <div className="hero-item mt-12 md:mt-0 grid grid-cols-1 md:grid-cols-12 gap-8 items-end w-full">
          <div className="md:col-span-5 md:col-start-8 lg:col-span-4 lg:col-start-9 flex flex-col gap-8 md:gap-6">
            <p className="hidden sm:block text-[14px] sm:text-[15px] font-medium leading-relaxed text-neutral-500 text-left md:text-justify border-l-2 md:border-l-0 border-rebirth-green/20 pl-4 md:pl-0">
              We transform ideas into bold stories, campaigns, and visuals that connect with youth and culture.
            </p>
            <div className="flex items-center justify-between md:justify-start gap-6">
              <button 
                onClick={() => onNavigate('expertise')}
                className="group flex items-center gap-4 text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.4em] border-b-2 border-rebirth-green pb-2 hover:gap-8 transition-all"
              >
                Expertise <span className="hidden sm:block group-hover:translate-x-1 transition-transform">→</span>
              </button>
              <div className="block md:hidden h-[1px] flex-grow bg-neutral-100 ml-4"></div>
            </div>
          </div>
        </div>
        
        {/* Subtle detail for mobile */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 opacity-[0.03] text-[40vw] font-black italic select-none pointer-events-none z-0 hidden sm:block md:hidden">
          RBX
        </div>
      </section>
      

{/* ================= MANIFESTO ================= */}
<section
  ref={manifestoRef}
  className="relative z-10 py-24 md:py-36 px-6 md:px-12 lg:px-24 bg-white"
>
  <div className="manifesto-card bg-rebirth-green rounded-tr-[4rem] overflow-hidden shadow-lg lg:flex lg:items-center lg:gap-10 p-6 md:p-12 max-w-7xl mx-auto">
    
    {/* TEXT LEFT */}
    <div className="lg:w-7/12 text-white flex flex-col justify-center">
      <p className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-tight italic mb-6">
        We take ordinary ideas, twist them, and turn them into{" "}
        <span className="text-white/90 font-extrabold">bold stories</span> that reshape culture and spark creativity.
      </p>
      <button
        onClick={() => onNavigate('expertise')}
        className="text-[10px] md:text-sm font-bold tracking-[0.4em] uppercase border-b-2 border-white pb-1 hover:text-white/90 transition-colors mt-3"
      >
        Our Philosophy →
      </button>
    </div>

    {/* IMAGE RIGHT */}
    <div className="lg:w-5/12 relative group mt-6 lg:mt-0">
      <img
        src="https://res.cloudinary.com/dnz71cs9x/image/upload/f_auto,q_auto,w_1200/v1770206160/_W6A6885_nghepk.jpg"
        alt="Manifesto Visual"
        className="w-full h-auto object-cover aspect-[4/5] rounded-lg grayscale transition-all duration-[1.5s] group-hover:grayscale-0 group-hover:scale-105"
      />
      <div className="absolute inset-0 border border-white/20 pointer-events-none rounded-lg"></div>
      <div className="absolute bottom-4 right-4 text-white text-[8px] md:text-[10px] font-mono tracking-widest bg-black/50 px-3 py-1 opacity-0 group-hover:opacity-100 transition-opacity rounded-sm">
        FRAGMENT_MANIFEST_01
      </div>
    </div>

  </div>
</section>





      {/* Horizontal Capabilities */}
      <section ref={horizontalWrapperRef} className="bg-rebirth-black overflow-hidden relative z-20 h-screen">
        <div className="flex h-screen w-[300vw] items-center">
          {capabilities.map((item, index) => (
            <div key={index} className="capability-card relative h-screen w-screen flex-shrink-0 flex items-center p-6 md:p-24">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center w-full max-w-screen-2xl mx-auto">
                <div className="md:col-span-5 relative z-10">
                  <span className="text-[10px] font-mono font-bold tracking-widest text-rebirth-green mb-12 block">[{item.id} // {item.tag}]</span>
                  <h3 className="text-7xl md:text-[10vw] font-bold text-white tracking-tighter mb-12 leading-none uppercase italic">{item.title}</h3>
                  <p className="text-lg text-neutral-400 font-light leading-relaxed max-w-sm mb-12">{item.desc}</p>
                  <button onClick={() => onNavigate('expertise')} className="group flex items-center gap-4 text-white uppercase text-[10px] tracking-widest font-bold border border-white/20 px-8 py-4 hover:bg-rebirth-green hover:border-rebirth-green transition-all">
                    View Portfolio
                  </button>
                </div>
                <div className="md:col-span-7 relative h-[60vh] md:h-[80vh] overflow-hidden">
                  <img src={item.img} className="w-full h-full object-cover grayscale brightness-50 group-hover:grayscale-0 transition-all duration-[2s]" alt={item.title} />
                  <div className="absolute inset-0 bg-gradient-to-r from-rebirth-black to-transparent"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Meet Some Of Our Clients */}
      <section ref={clientDossierRef} className="py-32 md:py-48 px-6 md:px-12 lg:px-24 bg-white relative overflow-hidden z-20">
        <div className="absolute top-1/2 left-0 w-full whitespace-nowrap opacity-[0.03] pointer-events-none select-none z-0">
          <div className="client-marquee text-[15vw] font-black uppercase tracking-tighter inline-block">
            TECH INNOVATORS BLOOM LUXURY URBAN PULSE ETHEREAL GOODS FUTURE FORM &nbsp;
          </div>
          <div className="client-marquee text-[15vw] font-black uppercase tracking-tighter inline-block">
            TECH INNOVATORS BLOOM LUXURY URBAN PULSE ETHEREAL GOODS FUTURE FORM &nbsp;
          </div>
        </div>

        <div className="relative z-10 flex flex-col md:flex-row justify-between items-baseline mb-32 border-b border-neutral-100 pb-12">
          <div>
            <span className="text-[10px] font-bold tracking-ultra-widest text-rebirth-green uppercase mb-6 block font-mono">// THE STRATEGIC ALLIANCE</span>
            <h2 className="text-4xl md:text-7xl font-serif italic text-rebirth-black tracking-tighter leading-none">
              Meet some of our <br /><span className="text-rebirth-green opacity-50 underline decoration-1 underline-offset-8">clients.</span>
            </h2>
          </div>
          <div className="flex flex-col items-end mt-8 md:mt-0">
            <p className="text-xs uppercase tracking-widest font-bold text-neutral-400">Selected Partners / 2024</p>
            <span className="text-[9px] font-mono text-neutral-300 mt-2 tracking-widest">STATUS: TRANSMITTING_DATA</span>
          </div>
        </div>

        <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-x-8 md:gap-y-16 auto-rows-min">
          {partners.map((partner, index) => (
            <div key={index} className={`partner-item group relative overflow-hidden bg-neutral-50 border border-neutral-100 ${partner.span} ${partner.offset}`}>
              <div className="w-full h-full overflow-hidden">
                <img src={partner.img} alt={partner.name} className="w-full h-full object-cover grayscale brightness-90 transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-110" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-rebirth-black/90 via-rebirth-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute bottom-4 left-4 md:bottom-8 md:left-8 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-8 group-hover:translate-y-0">
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-8 h-[1px] bg-rebirth-green"></span>
                  <span className="text-[9px] font-mono font-bold text-rebirth-green tracking-widest uppercase">ID_{partner.id}</span>
                </div>
                <h3 className="text-xl md:text-3xl font-bold text-white tracking-tighter uppercase italic leading-none">{partner.name}</h3>
                <p className="text-[9px] text-white/40 uppercase tracking-ultra-widest mt-2">Cultural Strategic Partner</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
<section className="py-32 bg-white px-6 z-20 relative">
  <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
    
    {/* Header - Left Column */}
    <div className="text-left">
      <span className="text-[10px] uppercase tracking-ultra-widest font-bold text-rebirth-green mb-8 block">VOICES</span>
      <h2 className="text-5xl md:text-8xl font-bold tracking-tighter italic leading-none">
        The <span className="text-rebirth-green">Response.</span>
      </h2>
      <p className="mt-8 text-neutral-600 max-w-md">
        Hear what industry leaders and clients have to say about their experience.
      </p>
    </div>
    
    {/* Cards & Controls - Right Column */}
    <div className="flex flex-col items-center lg:items-end">
      
      {/* Card Container */}
      <div className="relative w-[300px] h-[400px] md:w-[400px] md:h-[500px] mb-12" style={{ perspective: '1500px' }}>
        {reviews.map((review, idx) => (
          <div 
            key={idx} 
            ref={el => { cardRefs.current[idx] = el; }} 
            className="absolute inset-0 bg-rebirth-black p-10 md:p-16 flex flex-col justify-between border border-neutral-900 shadow-2xl"
          >
            <div className="text-[10px] font-mono text-rebirth-green mb-8">RB / 0{idx + 1}</div>
            <p className="text-2xl md:text-3xl font-serif italic text-white leading-tight">
              "{review.quote}"
            </p>
            <div className="flex flex-col gap-2 pt-12 border-t border-white/10">
              <span className="text-[10px] font-bold uppercase tracking-widest text-white">
                {review.author}
              </span>
              <span className="text-[8px] uppercase tracking-widest text-neutral-500">
                {review.role}
              </span>

            </div>
             {/* Navigation Button */}
      <button 
        onClick={handleNextReview} 
        className=" w-12 h-12 border bg-white justify-end border-neutral-200 flex items-center justify-center hover:bg-rebirth-green hover:border-rebirth-green hover:text-white transition-all group"
      >
        <span className="text-2xl group-hover:translate-x-1 transition-transform">→</span>
      </button>
          </div>
        ))}
      </div>

     
    </div>
  </div>
</section>

      {/* Footer CTA */}
      <section className="py-48 flex flex-col items-center text-center border-t border-neutral-100 z-20 relative">
        <h2 className="text-6xl md:text-[12vw] font-bold tracking-tighter italic leading-none mb-24">Start <span className="text-rebirth-green">Today.</span></h2>
        <button onClick={() => onNavigate('contact')} className="px-20 py-10 bg-rebirth-black text-white text-[12px] uppercase tracking-[0.5em] font-bold hover:bg-rebirth-green transition-colors">
          Initiate Proposal
        </button>
      </section>
    </div>
  );
};

export default Home;
