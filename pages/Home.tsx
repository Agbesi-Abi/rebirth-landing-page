import React, { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger, Flip } from 'gsap/all';
import { Page } from '../types';
import HeroSection from '@/components/home/hero';

gsap.registerPlugin(ScrollTrigger, Flip);

interface HomeProps {
  onNavigate: (page: Page) => void;
}

const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const heroImageRef = useRef<HTMLDivElement>(null);
  const manifestoRef = useRef<HTMLDivElement>(null);
  const capability1Ref = useRef<HTMLDivElement>(null);
  const capability2Ref = useRef<HTMLDivElement>(null);
  const typographicRef = useRef<HTMLDivElement>(null);
  const partnersRef = useRef<HTMLDivElement>(null);
  const reviewsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero Section Animations
      if (heroTextRef.current) {
        const heroElements = heroTextRef.current.querySelectorAll('.hero-element');
        gsap.fromTo(
          heroElements,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            stagger: 0.2,
            delay: 0.3
          }
        );

        // SVG decoration animation
        const svg = heroTextRef.current.querySelector('.hero-svg');
        if (svg) {
          gsap.fromTo(
            svg,
            { opacity: 0, scale: 0.5, rotation: -20 },
            {
              opacity: 1,
              scale: 1,
              rotation: 0,
              duration: 0.8,
              delay: 1,
              ease: 'back.out(1.7)'
            }
          );
        }
      }

      // Hero Image Animation
      if (heroImageRef.current) {
        gsap.fromTo(
          heroImageRef.current,
          { scale: 1.1, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 1.5,
            ease: 'power3.out'
          }
        );
      }

      // Manifesto Section
      if (manifestoRef.current) {
        const manifestoElements = manifestoRef.current.querySelectorAll('.manifesto-element');
        gsap.fromTo(
          manifestoElements,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            stagger: 0.2,
            scrollTrigger: {
              trigger: manifestoRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none'
            }
          }
        );
      }

      // Capability 1 Section
      if (capability1Ref.current) {
        const cap1Image = capability1Ref.current.querySelector('.capability-image');
        const cap1Text = capability1Ref.current.querySelectorAll('.capability-text');

        if (cap1Image) {
          gsap.fromTo(
            cap1Image,
            { scale: 1.1, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              duration: 1.5,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: capability1Ref.current,
                start: 'top 75%',
                toggleActions: 'play none none none'
              }
            }
          );
        }

        gsap.fromTo(
          cap1Text,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            stagger: 0.15,
            scrollTrigger: {
              trigger: capability1Ref.current,
              start: 'top 75%',
              toggleActions: 'play none none none'
            }
          }
        );
      }

      // Capability 2 Section
      if (capability2Ref.current) {
        const cap2Image = capability2Ref.current.querySelector('.capability-image');
        const cap2Text = capability2Ref.current.querySelectorAll('.capability-text');

        if (cap2Image) {
          gsap.fromTo(
            cap2Image,
            { scale: 1.1, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              duration: 1.5,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: capability2Ref.current,
                start: 'top 75%',
                toggleActions: 'play none none none'
              }
            }
          );
        }

        gsap.fromTo(
          cap2Text,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            stagger: 0.15,
            scrollTrigger: {
              trigger: capability2Ref.current,
              start: 'top 75%',
              toggleActions: 'play none none none'
            }
          }
        );
      }

      // Typographic Section
      if (typographicRef.current) {
        const typoElements = typographicRef.current.querySelectorAll('.typo-element');
        gsap.fromTo(
          typoElements,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            stagger: 0.2,
            scrollTrigger: {
              trigger: typographicRef.current,
              start: 'top 70%',
              toggleActions: 'play none none none'
            }
          }
        );
      }

      // Partners Section
      if (partnersRef.current) {
        const partnerHeaders = partnersRef.current.querySelectorAll('.partner-header');
        const partnerImages = partnersRef.current.querySelectorAll('.partner-item');

        gsap.fromTo(
          partnerHeaders,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            stagger: 0.15,
            scrollTrigger: {
              trigger: partnersRef.current,
              start: 'top 70%',
              toggleActions: 'play none none none'
            }
          }
        );

        gsap.fromTo(
          partnerImages,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            stagger: 0.2,
            scrollTrigger: {
              trigger: partnersRef.current,
              start: 'top 70%',
              toggleActions: 'play none none none'
            }
          }
        );
      }

      // Reviews Section
      if (reviewsRef.current) {
        const reviewElements = reviewsRef.current.querySelectorAll('.review-element');
        gsap.fromTo(
          reviewElements,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            stagger: 0.2,
            scrollTrigger: {
              trigger: reviewsRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none'
            }
          }
        );
      }

      // CTA Section
      if (ctaRef.current) {
        const ctaLine = ctaRef.current.querySelector('.cta-line');
        const ctaButton = ctaRef.current.querySelector('.cta-button');

        if (ctaLine) {
          gsap.fromTo(
            ctaLine,
            { scaleY: 0 },
            {
              scaleY: 1,
              duration: 1.5,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: ctaRef.current,
                start: 'top 80%',
                toggleActions: 'play none none none'
              }
            }
          );
        }

        if (ctaButton) {
          gsap.fromTo(
            ctaButton,
            { y: 60, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              ease: 'power3.out',
              delay: 0.3,
              scrollTrigger: {
                trigger: ctaRef.current,
                start: 'top 80%',
                toggleActions: 'play none none none'
              }
            }
          );
        }
      }
    });

    // Card Stacking Animation for Reviews
    const slider = reviewsRef.current?.querySelector('.slider');
    const offset = 30;

    const moveCard = () => {
      const lastItem = slider?.querySelector('.item:last-child') as HTMLElement;
      if (slider && lastItem) {
        lastItem.style.display = 'none';
        const newItem = document.createElement('div');
        newItem.className = lastItem.className;
        newItem.innerHTML = lastItem.innerHTML;
        newItem.style.position = 'absolute';
        newItem.style.top = '0px';
        newItem.style.left = '0px';
        slider.insertBefore(newItem, slider.firstChild);
      }
    };

    const handleClick = () => {
      if (slider) {
        const state = Flip.getState('.item');
        moveCard();
        Flip.from(state, {
          targets: '.item',
          ease: 'sine.inOut',
          absolute: true,
          onEnter: (elements) => gsap.from(elements, {
            duration: 0.3,
            yPercent: 20,
            opacity: 0,
            ease: 'expo.out'
          }),
          onLeave: (elements) => gsap.to(elements, {
            duration: 0.3,
            yPercent: 5,
            xPercent: -5,
            transformOrigin: 'bottom left',
            opacity: 0,
            ease: 'expo.out',
            onComplete() {
              elements.forEach(el => slider.removeChild(el));
            }
          })
        });
      }
    };

    if (slider) {
      slider.addEventListener('click', handleClick);
    }

    return () => {
      ctx.revert();
      if (slider) {
        slider.removeEventListener('click', handleClick);
      }
    };
  }, []);

  // Hover handlers for images and CTA
  const handleImageHover = (e: React.MouseEvent<HTMLImageElement>) => {
    gsap.to(e.currentTarget, {
      scale: 1.05,
      duration: 2.5,
      ease: 'power2.out'
    });
  };

  const handleImageLeave = (e: React.MouseEvent<HTMLImageElement>) => {
    gsap.to(e.currentTarget, {
      scale: 1,
      duration: 2.5,
      ease: 'power2.out'
    });
  };

  const handlePartnerHover = (e: React.MouseEvent<HTMLImageElement>) => {
    gsap.to(e.currentTarget, {
      scale: 1.05,
      duration: 1.5,
      ease: 'power2.out'
    });
  };

  const handlePartnerLeave = (e: React.MouseEvent<HTMLImageElement>) => {
    gsap.to(e.currentTarget, {
      scale: 1,
      duration: 1.5,
      ease: 'power2.out'
    });
  };

  const handleCtaHover = (e: React.MouseEvent<HTMLButtonElement>) => {
    const underline = e.currentTarget.querySelector('.cta-underline');
    gsap.to(e.currentTarget.querySelector('.cta-text'), {
      scale: 1.05,
      duration: 0.5,
      ease: 'power3.out'
    });
    if (underline) {
      gsap.to(underline, {
        width: '100%',
        duration: 0.6,
        ease: 'power3.out'
      });
    }
  };

  const handleCtaLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    const underline = e.currentTarget.querySelector('.cta-underline');
    gsap.to(e.currentTarget.querySelector('.cta-text'), {
      scale: 1,
      duration: 0.5,
      ease: 'power3.out'
    });
    if (underline) {
      gsap.to(underline, {
        width: '0%',
        duration: 0.6,
        ease: 'power3.out'
      });
    }
  };

  const partnerImages = [
    {
      url: "https://res.cloudinary.com/dnz71cs9x/image/upload/f_auto,q_auto,w_1200/v1770206155/_K2A6866_nowpow.jpg",
      shape: "rounded-t-full aspect-[3/5]",
      label: "Global Vision",
      offset: "md:mt-0"
    },
    {
      url: "https://res.cloudinary.com/dnz71cs9x/image/upload/f_auto,q_auto,w_1200/v1770206155/1Y3A6629_ozf2mz.jpg",
      shape: "aspect-[16/9] md:skew-y-1",
      label: "Culture Pulse",
      offset: "md:mt-48"
    },
    {
      url: "https://res.cloudinary.com/dnz71cs9x/image/upload/f_auto,q_auto,w_1200/v1770206155/1Y3A4697_x5zbwu.jpg",
      shape: "rounded-full aspect-square",
      label: "Authentic Growth",
      offset: "md:-mt-32"
    }
  ];

  const reviews = [
    {
      quote: "Rebirth doesn't just make content; they define the cultural pulse of our brand. Their strategic approach is unlike anything we've seen in the digital space.",
      author: "Marcus Chen",
      role: "Global Marketing Director, Tech Innovators",
      featured: true
    },
    {
      quote: "Working with the Rebirth team was a masterclass in intentional creativity. They brought a level of depth that translated directly into record engagement.",
      author: "Sarah J. Boateng",
      role: "Founder, Bloom Luxury",
      featured: false
    },
    {
      quote: "A visionary partner. They understood our community better than we did, bridging the gap between legacy and the next generation seamlessly.",
      author: "David Olufemi",
      role: "Head of Strategy, Urban Pulse",
      featured: false
    }
  ];

  return (
    <div className="px-6 md:px-12 lg:px-24 max-w-screen-2xl mx-auto overflow-hidden">
      {/* Hero Section */}
      {/* <section ref={heroRef} className="min-h-[85vh] md:min-h-screen flex flex-col justify-center pt-24 md:pt-32 pb-24 md:pb-40">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 lg:gap-24 items-start">
          <div ref={heroTextRef} className="md:col-span-8 order-2 md:order-1">
            <div className="overflow-visible relative">
              <h1 className="hero-element text-6xl sm:text-7xl md:text-[8.5vw] lg:text-[8vw] font-bold leading-[0.85] tracking-tighter">
                Redefining <br />
                <span className="relative inline-block">
                  <span className="text-rebirth-green font-serif italic font-normal">content, culture</span>
                  <svg 
                    viewBox="0 0 100 100" 
                    className="hero-svg absolute -top-8 -right-6 w-14 h-14 md:-top-16 md:-right-12 md:w-40 md:h-40 text-rebirth-green/20 fill-current"
                  >
                  </svg>
                </span>
                <br />
                <span className="text-rebirth-green font-serif italic font-normal">& creativity</span> <br />
                for the digital <br />
                generation.
              </h1>
            </div>
          </div>
          
          <div ref={heroImageRef} className="md:col-span-4 order-1 md:order-2 self-center max-w-sm md:max-w-none ml-auto">
            <div className="relative group overflow-hidden bg-rebirth-grey shadow-3xl">
              <img 
                src="https://res.cloudinary.com/dnz71cs9x/image/upload/f_auto,q_auto,w_1600/v1770130192/_W6A7206_pino4p.jpg" 
                alt="Culture & Creative Studio Vision" 
                className="w-full aspect-[3/4] object-cover transition-all duration-[2.5s] ease-out"
                onMouseEnter={handleImageHover}
                onMouseLeave={handleImageLeave}
              />
            </div>
          </div>
        </div>
      </section> */}

      <HeroSection />

      {/* Manifesto Intro - Isolated for maximum impact */}
      <section ref={manifestoRef} className="py-40 md:py-80 grid grid-cols-1 md:grid-cols-12 gap-12">
        <div className="md:col-span-7 md:col-start-6 lg:col-span-5 lg:col-start-7">
          <p className="manifesto-element text-2xl md:text-3xl lg:text-4xl text-neutral-800 leading-[1.15] tracking-tight font-light mb-12">
            Rebirth Creative Studio blends storytelling, digital production, and creator strategy to build impactful brands for the digital age.
          </p>
          <div className="manifesto-element w-24 h-[1px] bg-rebirth-green/30"></div>
        </div>
      </section>

      {/* Capabilities Section - Dynamic Staggering */}
      <section className="space-y-48 md:space-y-[70vh] pb-64">
        {/* Layout 01 */}
        <div ref={capability1Ref} className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-7 relative">
            <div className="capability-image overflow-hidden bg-rebirth-grey">
              <img 
                src="https://res.cloudinary.com/dnz71cs9x/image/upload/f_auto,q_auto,w_1200/v1770130189/_K2A7045_xptwf1.jpg" 
                className="w-full aspect-[16/9] object-cover grayscale brightness-90 hover:grayscale-0 transition-all duration-[1.5s]"
                alt="Studio Management"
              />
            </div>
          </div>
          <div className="md:col-span-4 md:col-start-9">
            <span className="capability-text text-[10px] font-bold tracking-[0.4em] text-rebirth-green uppercase mb-8 block">01 / STUDIO</span>
            <h3 className="capability-text text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-8 leading-[0.9]">
              Creative Studio <br /> <span className="text-rebirth-green font-serif italic font-normal">Management.</span>
            </h3>
            <p className="capability-text text-base text-neutral-500 leading-relaxed font-light">
              High-quality production, storytelling, and creative management for brands and creators who dare to lead.
            </p>
          </div>
        </div>

        {/* Layout 02 */}
        <div ref={capability2Ref} className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-4 md:col-start-1 order-2 md:order-1">
            <span className="capability-text text-[10px] font-bold tracking-[0.4em] text-rebirth-green uppercase mb-8 block">02 / TALENT</span>
            <h3 className="capability-text text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-8 leading-[0.9]">
              Influencer <br /> <span className="text-rebirth-green font-serif italic font-normal">Management.</span>
            </h3>
            <p className="capability-text text-base text-neutral-500 leading-relaxed font-light">
              Connecting creators with brands, managing collaborations, and growing authentic audiences.
            </p>
          </div>
          <div className="md:col-span-6 md:col-start-6 order-1 md:order-2">
            <div className="capability-image overflow-hidden bg-rebirth-grey rounded-full aspect-square md:aspect-[4/5] max-w-md mx-auto md:ml-auto">
              <img 
                src="https://res.cloudinary.com/dnz71cs9x/image/upload/f_auto,q_auto,w_1200/v1770130196/_W6A7297_rapyvy.jpg" 
                className="w-full h-full object-cover grayscale brightness-95 hover:grayscale-0 transition-all duration-[1.5s]"
                alt="Influencer Strategy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Typographic Pause */}
      <section 
        ref={typographicRef}
        className="py-64 md:py-[50vh] flex flex-col items-center justify-center border-t border-neutral-100"
      >
        <h2 className="text-[14vw] md:text-[16vw] font-bold tracking-tighter text-center leading-[0.75] flex flex-col items-center">
          <span className="typo-element opacity-10">CREATIVITY</span>
          <span className="typo-element text-rebirth-green font-serif italic font-light relative">
            with Purpose.
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-1/3 h-[1px] bg-rebirth-green/20"></div>
          </span>
        </h2>
      </section>

      {/* Selective Partners Grid - Enhanced Spacing */}
      <section 
        ref={partnersRef}
        className="py-48 md:py-80 border-t border-neutral-100"
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24 md:mb-40 gap-8">
          <h2 className="partner-header text-5xl md:text-8xl font-bold tracking-tighter leading-none">
            Selective <br />
            <span className="text-rebirth-green font-serif italic font-normal">Partners</span>
          </h2>
          <p className="partner-header text-[10px] uppercase tracking-[0.5em] text-neutral-400 font-bold">
            — COLLABORATING WITH EXCELLENCE
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-24 md:gap-16 items-center">
          {partnerImages.map((partner, idx) => (
            <div 
              key={idx}
              className={`partner-item flex flex-col items-center ${partner.offset}`}
            >
              <div className={`w-full overflow-hidden bg-rebirth-grey group relative ${partner.shape}`}>
                <img 
                  src={partner.url} 
                  alt={partner.label} 
                  className="w-full h-full object-cover grayscale brightness-90 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-[1s]"
                  onMouseEnter={handlePartnerHover}
                  onMouseLeave={handlePartnerLeave}
                />
              </div>
              <span className="mt-10 text-[10px] uppercase tracking-ultra-widest font-bold text-neutral-300">
                {partner.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Review Section - Fluid Height */}
      <section
        ref={reviewsRef}
        className="py-48 md:py-80 bg-neutral-50 -mx-6 md:-mx-12 lg:-mx-24 px-6 md:px-12 lg:px-24"
      >
        <div className="max-w-screen-2xl mx-auto">
          <div className="mb-24 flex items-center gap-6">
            <span className="w-12 h-[1px] bg-rebirth-green"></span>
            <h2 className="text-[10px] uppercase tracking-ultra-widest font-bold text-rebirth-green">Voices of the Network</h2>
          </div>

          <div className="slider relative overflow-hidden">
            {reviews.map((review, idx) => (
              <div key={idx} className="item absolute top-0 left-0 w-full">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-24 items-start">
                  <div className="md:col-span-8 lg:col-span-7">
                    <p className="review-element text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-serif italic text-rebirth-black leading-[0.95] tracking-tighter mb-12">
                      "{review.quote}"
                    </p>
                    <div className="review-element flex flex-col gap-2">
                      <span className="text-xs font-bold uppercase tracking-widest text-rebirth-black">{review.author}</span>
                      <span className="text-[10px] uppercase tracking-widest text-neutral-400">{review.role}</span>
                    </div>
                  </div>

                  <div className="md:col-span-4 lg:col-span-3 lg:col-start-10 space-y-32 md:mt-24">
                    {reviews.slice(1).map((otherReview, otherIdx) => (
                      <div key={otherIdx} className="review-element group">
                        <p className="text-xl md:text-2xl font-light text-neutral-600 leading-snug mb-8">
                          "{otherReview.quote}"
                        </p>
                        <div className="flex flex-col gap-1">
                          <span className="text-[10px] font-bold uppercase tracking-widest text-rebirth-green">{otherReview.author}</span>
                          <span className="text-[9px] uppercase tracking-widest text-neutral-400">{otherReview.role}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section ref={ctaRef} className="py-64 md:py-[50vh] flex flex-col items-center text-center">
        <div className="cta-line mb-12 w-[1px] h-32 bg-gradient-to-b from-transparent via-rebirth-green to-transparent"></div>
        <button 
          onClick={() => onNavigate('contact')}
          className="cta-button group relative"
          onMouseEnter={handleCtaHover}
          onMouseLeave={handleCtaLeave}
        >
          <span className="cta-text text-5xl sm:text-6xl md:text-9xl lg:text-[10vw] font-bold tracking-tighter block hover:text-rebirth-green transition-colors duration-500">
            Start a project.
          </span>
          <div className="cta-underline h-1 md:h-2 bg-rebirth-green mx-auto mt-6 w-0"></div>
        </button>
      </section>
    </div>
  );
};

export default Home;