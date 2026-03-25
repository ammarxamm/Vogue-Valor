import React, { useState, useEffect } from 'react';
import { X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const WelcomePopup: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const hasSeen = localStorage.getItem('hasSeenWelcome');
    if (!hasSeen) {
      const timer = setTimeout(() => setIsOpen(true), 5000);
      return () => clearTimeout(timer);
    }
  }, []);

  const closePopup = () => {
    setIsOpen(false);
    localStorage.setItem('hasSeenWelcome', 'true');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closePopup}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative bg-white w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row"
          >
            <button 
              onClick={closePopup}
              className="absolute top-4 right-4 z-10 p-2 bg-white/80 backdrop-blur-md rounded-full hover:bg-black hover:text-white transition-all"
            >
              <X size={20} />
            </button>
            
            <div className="md:w-1/2 aspect-square md:aspect-auto">
              <img 
                src="https://picsum.photos/seed/popup/800/1000" 
                alt="Welcome" 
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center space-y-6">
              <div className="space-y-2">
                <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400">Join the Club</h3>
                <h2 className="text-4xl font-black uppercase tracking-tighter leading-none">Get 15% Off Your First Order</h2>
              </div>
              <p className="text-gray-600 text-sm">
                Be the first to know about new drops, exclusive events, and seasonal sales.
              </p>
              <form className="space-y-3" onSubmit={(e) => { e.preventDefault(); closePopup(); }}>
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="w-full bg-gray-100 border-none rounded-full py-4 px-6 text-sm focus:ring-2 focus:ring-black transition-all"
                  required
                />
                <button className="w-full bg-black text-white py-4 rounded-full font-bold flex items-center justify-center group">
                  Unlock My Discount
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
                </button>
              </form>
              <p className="text-[10px] text-gray-400 text-center uppercase tracking-widest">
                No thanks, I'll pay full price
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
