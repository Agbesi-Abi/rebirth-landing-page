import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface HeroSectionProps {
  onNavigate: (page: string) => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate }) => {
  const heroRef = useRef<HTMLElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-line", {
        y: 40,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        stagger: 0.15,
      });

      gsap.fromTo(
        ".image-letter",
        { backgroundSize: "60% auto", clipPath: "inset(100% 0 0 0)", opacity: 0 },
        {
          backgroundSize: "200% auto",
          clipPath: "inset(0% 0 0 0)",
          opacity: 1,
          duration: 1.4,
          ease: "power3.out",
          delay: 0.6,
        }
      );

      gsap.to(".image-letter", {
        backgroundPosition: "100% 50%",
        duration: 18,
        ease: "linear",
        repeat: -1,
        delay: 2,
      });

      gsap.from(".side-meta", { opacity: 0, x: 20, duration: 1, delay: 0.8 });

      gsap.to(".hero-line", {
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
        letterSpacing: "0.08em",
        y: -30,
        ease: "none",
      });

      gsap.to(".image-letter", {
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
        scale: 1.06,
        y: -18,
        ease: "none",
      });

      gsap.to(overlayRef.current, {
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
        y: 40,
        opacity: 0.3,
        ease: "none",
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-[calc(100vh-80px)] flex flex-col justify-between px-4 sm:px-6 md:px-12 lg:px-20 xl:px-24 2xl:px-32 pt-8 md:pt-16 xl:pt-20 2xl:pt-24 pb-12 md:pb-20 xl:pb-24 2xl:pb-28 bg-white overflow-hidden"
    >
      {/* Gradient overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(120deg, rgba(0,255,127,0.1), rgba(0,0,0,0))",
          mixBlendMode: "overlay",
          zIndex: 5,
        }}
      />

      {/* Content wrapper */}
      <div className="flex flex-col md:flex-row h-full relative z-10">
        {/* Hero Text */}
        <div className="flex-1 flex flex-col justify-between h-full">
          <div className="flex flex-col h-full">
            <span className="hero-line text-[clamp(4rem,10vw,12rem)] leading-[0.85]">
              Digital
            </span>

            <span className="hero-line image-letter flex-grow text-[clamp(4.5rem,12vw,13rem)] leading-[0.85] md:pl-[5%] lg:pl-[8%] xl:pl-[10%] font-black bg-clip-text text-transparent relative">
              Culture
            </span>

            <span className="hero-line text-[clamp(4rem,10vw,12rem)] leading-[0.85] md:pl-[15%] lg:pl-[20%] xl:pl-[25%] mt-auto">
              Redefined
            </span>
          </div>
        </div>

        {/* Side Meta */}
        <div className="md:flex-0 md:w-[280px] lg:w-[320px] xl:w-[360px] 2xl:w-[400px] mt-8 md:mt-0 md:ml-8 self-start md:self-end">
          <div className="side-meta space-y-6">
            <p className="text-sm md:text-base lg:text-lg xl:text-xl font-medium italic leading-tight text-rebirth-black/80">
              We're a creative studio and culture agency that crafts bold work for brands who{" "}
              <span className="text-rebirth-green font-bold">refuse to blend in.</span>
            </p>
            <button
              onClick={() => onNavigate("contact")}
              className="relative inline-flex items-center gap-4 overflow-hidden group px-4 py-2 xl:px-6 xl:py-3"
            >
              <span className="relative z-10 text-xs font-bold uppercase tracking-widest border-b-2 border-rebirth-black pb-1 group-hover:text-rebirth-green group-hover:border-rebirth-green transition-all italic">
                Start project
              </span>
              <span className="absolute inset-0 bg-rebirth-green opacity-0 group-hover:opacity-20 transition-all rounded"></span>
              <span className="w-8 h-8 xl:w-10 xl:h-10 rounded-full bg-rebirth-black text-white flex items-center justify-center text-xs group-hover:bg-rebirth-green transition-colors relative z-10">
                →
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Hero image mask */}
      <style jsx>{`
        .image-letter {
          display: inline-block;
          position: relative;
          background-image: url('https://res.cloudinary.com/dnz71cs9x/image/upload/f_auto,q_auto,w_1600/v1770130192/_W6A7206_pino4p.jpg');
          background-size: 200% auto;
          background-position: center;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          font-weight: inherit;
          transform: translateZ(0);
          will-change: clip-path, background-size, background-position, transform;
          mix-blend-mode: lighten;
        }
        .image-letter::after {
          content: '';
          position: absolute;
          inset: 0;
          background: inherit;
          filter: blur(18px) saturate(140%);
          opacity: 0.45;
          z-index: -1;
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
