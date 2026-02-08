import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Expertise from './pages/Expertise';
import Work from './pages/Work';
import ProjectPage from './pages/ProjectPage';
import Contact from './pages/Contact';
import { Page } from './types';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <Home onNavigate={setCurrentPage} />;
      case 'expertise': return <Expertise onNavigate={setCurrentPage} />;
      case 'work': return <Work onNavigate={setCurrentPage} />;
      case 'project': return <ProjectPage onNavigate={setCurrentPage} />;
      case 'contact': return <Contact />;
      default: return <Home onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-rebirth-green selection:text-white">
      <Navbar currentPage={currentPage} onNavigate={setCurrentPage} />

      <main className="flex-grow pt-16 md:pt-24">
        {renderPage()}
      </main>
    </div>
  );
};

export default App;