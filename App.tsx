
import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Expertise from './pages/Expertise';
import Work from './pages/Work';
import ProjectPage from './pages/ProjectPage';
import Contact from './pages/Contact';
import { Page } from './types';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const pageContainerRef = useRef<HTMLDivElement>(null);
  const transitionRef = useRef<HTMLDivElement>(null);



  useLayoutEffect(() => {
    const tl = gsap.timeline();
    
    if (pageContainerRef.current) {
      // Sophisticated cinematic entrance
      tl.fromTo(pageContainerRef.current, 
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.4, ease: "expo.out", clearProps: "all" }
      );
    }
    
    window.scrollTo(0, 0);
  }, [currentPage]);

  const renderPage = () => {
    return (
      <div ref={pageContainerRef} key={currentPage} className="w-full">
        {(() => {
          switch (currentPage) {
            case 'home': return <Home onNavigate={setCurrentPage} />;
            case 'expertise': return <Expertise onNavigate={setCurrentPage} />;
            case 'work': return <Work onNavigate={setCurrentPage} />;
            case 'project': return <ProjectPage onNavigate={setCurrentPage} />;
            case 'contact': return <Contact />;
            default: return <Home onNavigate={setCurrentPage} />;
          }
        })()}
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-rebirth-green selection:text-white bg-white">
      <Navbar currentPage={currentPage} onNavigate={setCurrentPage} />

      <main className="flex-grow pt-16 md:pt-24">
        {renderPage()}
      </main>

      <Footer onNavigate={setCurrentPage} />
    </div>
  );
};

export default App;
