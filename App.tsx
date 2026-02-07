import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const renderPage = () => {
    return (
      <motion.div
        key={currentPage}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8, ease: [0.6, 0.01, 0.35, 1] }}
      >
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
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-rebirth-green selection:text-white">
      <Navbar currentPage={currentPage} onNavigate={setCurrentPage} />
      
      <main className="flex-grow pt-16 md:pt-24">
        <AnimatePresence mode="wait">
          {renderPage()}
        </AnimatePresence>
      </main>
      
      <Footer onNavigate={setCurrentPage} />
    </div>
  );
};

export default App;