import React from 'react';
import { Page } from '../types';

interface ExpertiseProps {
  onNavigate: (page: Page) => void;
}

const Expertise: React.FC<ExpertiseProps> = ({ onNavigate }) => {
  const headerRef = useRef<HTMLDivElement>(null);
  const serviceRefs = useRef<HTMLDivElement[]>([]);
  const ctaRef = useRef<HTMLElement>(null);
  const ctaButtonRef = useRef<HTMLButtonElement>(null);

  const serviceList = [
    {
      title: 'Creative Studio Management',
      description: 'High-quality production, storytelling, and creative management for brands and creators.',
      img: "https://res.cloudinary.com/dnz71cs9x/image/upload/f_auto,q_auto,w_1200/v1770130190/_K2A7094_mcqvli.jpg",
      tags: ['Production Ops', 'Creative Vision', 'Talent Lifecycle']
    },
    {
      title: 'Influencer Management',
      description: 'Connecting creators with brands, managing collaborations, and growing authentic audiences.',
      img: "https://res.cloudinary.com/dnz71cs9x/image/upload/f_auto,q_auto,w_1200/v1770130189/_K2A7033_fcu6bd.jpg",
      tags: ['Talent Growth', 'Brand Matching', 'Negotiation']
    },
    {
      title: 'Workshop & Training',
      description: 'Empowering individuals and teams with skills in content creation, digital marketing, and branding.',
      img: "https://res.cloudinary.com/dnz71cs9x/image/upload/f_auto,q_auto,w_1000/v1770130176/1Y3A5491_xfiqac.jpg",
      tags: ['Skills Dev', 'Workshops', 'Team Building']
    },
    {
      title: 'Brand Campaign & Strategy',
      description: 'Comprehensive campaigns, workshops, and strategy sessions to elevate brand impact.',
      img: "https://res.cloudinary.com/dnz71cs9x/image/upload/f_auto,q_auto,w_1200/v1770206155/_K2A6866_nowpow.jpg",
      tags: ['Strategy', 'Positioning', 'Execution']
    },
    {
      title: 'Digital Community Building',
      description: 'Engaging online communities through content, interaction, and growth strategies.',
      img: "https://res.cloudinary.com/dnz71cs9x/image/upload/f_auto,q_auto,w_1200/v1770206155/1Y3A6629_ozf2mz.jpg",
      tags: ['Community', 'Engagement', 'Retention']
    },
    {
      title: 'Events & Activation',
      description: 'Planning and executing memorable events and activations to amplify brand presence.',
      img: "https://res.cloudinary.com/dnz71cs9x/image/upload/f_auto,q_auto,w_1200/v1770206155/1Y3A4697_x5zbwu.jpg",
      tags: ['Activations', 'Experiential', 'Buzz']
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(headerRef.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, ease: 'power3.out' });

      // Service animations
      serviceRefs.current.forEach((service, idx) => {
        ScrollTrigger.create({
          trigger: service,
          start: "top 80%",
          onEnter: () => {
            gsap.fromTo(service.querySelectorAll('.animate-item'), { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: 'power3.out' });
            gsap.fromTo(service.querySelector('.animate-image'), { scale: 1.1, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.5, ease: 'power3.out' });
          },
          once: true
        });
      });

      // CTA animation
      ScrollTrigger.create({
        trigger: ctaRef.current,
        start: "top 80%",
        onEnter: () => gsap.fromTo(ctaRef.current, { opacity: 0 }, { opacity: 1, duration: 1.5 }),
        once: true
      });

      // Hover animation for CTA button
      if (ctaButtonRef.current) {
        ctaButtonRef.current.addEventListener('mouseenter', () => gsap.to(ctaButtonRef.current, { scale: 1.05, duration: 0.3, ease: 'power3.out' }));
        ctaButtonRef.current.addEventListener('mouseleave', () => gsap.to(ctaButtonRef.current, { scale: 1, duration: 0.3, ease: 'power3.out' }));
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="px-6 md:px-12 lg:px-24 max-w-screen-2xl mx-auto overflow-hidden">
      <section className="pt-32 pb-48 md:pb-80">
        <div
          ref={headerRef}
          className="relative"
        >
          <span className="text-[10px] font-bold tracking-[0.6em] text-rebirth-green uppercase mb-12 block">OUR CAPABILITIES</span>
          <h1 className="text-7xl md:text-[10rem] lg:text-[12rem] font-bold tracking-tighter leading-[0.8] mb-32">
            Expertise
          </h1>
        </div>

        <div className="space-y-64 md:space-y-[70vh]">
          {serviceList.map((service, idx) => (
            <div
              key={idx}
              ref={(el) => { if (el) serviceRefs.current[idx] = el; }}
              className={`flex flex-col ${idx % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-16 lg:gap-32 items-center`}
            >
              <div className="w-full lg:w-5/12">
                <span className="animate-item text-[10px] uppercase tracking-[0.4em] text-rebirth-green font-bold mb-10 block">— SEQUENCE 0{idx + 1}</span>
                <h2 className="animate-item text-5xl md:text-6xl lg:text-7xl font-bold mb-10 leading-[0.9] tracking-tighter">
                  {service.title}
                </h2>
                <p className="animate-item text-lg md:text-xl text-neutral-500 mb-12 font-light leading-relaxed max-w-lg">
                  {service.description}
                </p>
                <div className="animate-item flex flex-wrap gap-3">
                  {service.tags.map((tag, tIdx) => (
                    <span key={tIdx} className="text-[10px] uppercase tracking-widest border border-neutral-100 px-5 py-2 rounded-full text-neutral-400 font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="animate-image w-full lg:w-7/12">
                 <div className="relative overflow-hidden bg-rebirth-grey aspect-video lg:aspect-[4/3] shadow-2xl">
                    <img src={service.img} className="w-full h-full object-cover grayscale brightness-95" alt={service.title} />
                 </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer CTA - High Isolation */}
      <section
        ref={ctaRef}
        className="py-64 md:py-96 flex flex-col items-center justify-center border-t border-neutral-50 text-center"
      >
        <h2 className="text-4xl md:text-7xl font-serif italic mb-20 leading-tight max-w-3xl px-4 tracking-tighter">
          Interested in elevating your cultural footprint?
        </h2>
        <button
          ref={ctaButtonRef}
          onClick={() => onNavigate('contact')}
          className="group relative overflow-hidden bg-rebirth-green px-12 py-6 md:px-20 md:py-8"
        >
          <span className="relative z-10 text-white text-[11px] uppercase tracking-[0.5em] font-bold">Initiate Protocol</span>
          <div className="absolute inset-0 bg-rebirth-black transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-[0.6, 0.01, 0.35, 1]"></div>
        </button>
      </section>
    </div>
  );
};

export default Expertise;