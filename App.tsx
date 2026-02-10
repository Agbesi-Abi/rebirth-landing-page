
import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Expertise from './pages/Expertise';
import Work from './pages/Work';
import ProjectDetail from './pages/ProjectDetail';
import Contact from './pages/Contact';
import { Page } from './types';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedProjectId, setSelectedProjectId] = useState<string>('fix-the-country');
  const pageContainerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const tl = gsap.timeline();
    
    if (pageContainerRef.current) {
      tl.fromTo(pageContainerRef.current, 
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.4, ease: "expo.out", clearProps: "all" }
      );
    }
    
    window.scrollTo(0, 0);
  }, [currentPage]);

  const handleNavigateToProject = (id: string) => {
    setSelectedProjectId(id);
    setCurrentPage('project');
  };

  const renderPage = () => {
    return (
      <div ref={pageContainerRef} key={currentPage} className="w-full">
        {(() => {
          switch (currentPage) {
            case 'home': return <Home onNavigate={setCurrentPage} />;
            case 'expertise': return <Expertise onNavigate={setCurrentPage} />;
            case 'work': return <Work onNavigate={setCurrentPage} onNavigateToProject={handleNavigateToProject} />;
            case 'project': return <ProjectDetail onNavigate={setCurrentPage} projectId={selectedProjectId} onNavigateToProject={handleNavigateToProject} />;
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
      
      <main className="flex-grow pt-10 md:pt-14">
        {renderPage()}
      </main>
      
      
      <Footer onNavigate={setCurrentPage} />
    </div>
  );
};

export default App;
