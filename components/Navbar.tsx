
import React, { useState, useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Page } from '../types';

interface NavbarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuTl = useRef<gsap.core.Timeline | null>(null);

  const navItems: { label: string; value: Page }[] = [
    { label: 'Portfolio', value: 'work' },
    { label: 'Expertise', value: 'expertise' },
    { label: 'Contact', value: 'contact' },
  ];

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      menuTl.current = gsap.timeline({ paused: true })
        .to(menuRef.current, { y: 0, duration: 0.8, ease: "expo.inOut" })
        .from(".mobile-nav-item", { y: 100, opacity: 0, stagger: 0.05, duration: 0.8, ease: "power4.out" }, "-=0.4");
    }, menuRef);
    return () => ctx.revert();
  }, []);

  useLayoutEffect(() => {
    if (isOpen) {
      menuTl.current?.play();
    } else {
      menuTl.current?.reverse();
    }
  }, [isOpen]);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleNavigate = (page: Page) => {
    onNavigate(page);
    setIsOpen(false);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-[100] bg-white/95 backdrop-blur-md px-6 py-4 md:py-6 md:px-12 flex items-center justify-between border-b border-neutral-50 lg:border-none">
        <button 
          onClick={() => handleNavigate('home')}
          className="text-base md:text-lg font-bold tracking-tighter flex items-center gap-2 group"
        >
          <span className="w-2 h-2 bg-rebirth-green group-hover:scale-150 transition-transform"></span>
          REBIRTH STUDIO
        </button>
        
        <div className="hidden lg:flex items-center space-x-12">
          {navItems.map((item) => (
            <button
              key={item.value}
              onClick={() => handleNavigate(item.value)}
              className={`text-sm uppercase tracking-widest hover:text-rebirth-green transition-colors ${
                currentPage === item.value ? 'text-rebirth-green font-bold' : 'text-rebirth-black'
              }`}
            >
              {item.label}
            </button>
          ))}
          <button 
            onClick={() => handleNavigate('contact')}
            className="px-6 py-2 border border-rebirth-black text-xs uppercase tracking-widest hover:bg-rebirth-green hover:border-rebirth-green hover:text-white transition-all"
          >
            Start a project
          </button>
        </div>

        <button 
          onClick={toggleMenu}
          className="lg:hidden flex flex-col gap-1.5 p-2 z-[110]"
          aria-label="Toggle Menu"
        >
          <span className={`w-6 h-[1.5px] bg-rebirth-black block origin-center transition-transform duration-500 ${isOpen ? 'rotate-45 translate-y-[7.5px]' : ''}`} />
          <span className={`w-6 h-[1.5px] bg-rebirth-black block transition-opacity duration-500 ${isOpen ? 'opacity-0' : ''}`} />
          <span className={`w-6 h-[1.5px] bg-rebirth-black block origin-center transition-transform duration-500 ${isOpen ? '-rotate-45 -translate-y-[7.5px]' : ''}`} />
        </button>
      </nav>

      <div
        ref={menuRef}
        className="fixed inset-0 z-[90] bg-white flex flex-col px-6 pt-32 pb-12 lg:hidden -translate-y-full"
      >
        <div className="flex flex-col space-y-6">
          <span className="text-[10px] uppercase tracking-ultra-widest text-neutral-300 font-bold mb-4">— MENU</span>
          {navItems.map((item) => (
            <div key={item.value} className="overflow-hidden">
              <button
                onClick={() => handleNavigate(item.value)}
                className="mobile-nav-item text-5xl md:text-7xl font-bold tracking-tighter hover:text-rebirth-green transition-colors text-left"
              >
                {item.label}
              </button>
            </div>
          ))}
          <button
            onClick={() => handleNavigate('contact')}
            className="mobile-nav-item mt-8 text-lg font-serif italic text-rebirth-green hover:text-rebirth-black transition-colors text-left"
          >
            Let's create something together →
          </button>
        </div>

        <div className="mt-auto flex justify-between items-end border-t border-neutral-100 pt-8">
          <div className="flex flex-col gap-2">
            <span className="text-[9px] uppercase tracking-ultra-widest text-neutral-400 font-bold">ACCRA</span>
            <span className="text-[9px] uppercase tracking-ultra-widest text-neutral-400 font-bold">LONDON</span>
          </div>
          <div className="text-[10px] uppercase tracking-widest text-neutral-300 font-bold">
            © 2026
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
