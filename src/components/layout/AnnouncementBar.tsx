import React from 'react';
import { motion } from 'motion/react';

export const AnnouncementBar: React.FC = () => {
  return (
    <div className="bg-black text-white py-2 px-4 text-center text-xs font-medium tracking-wider uppercase">
      <motion.p
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Free Shipping on Orders Over $75 • Buy 2, Get 10% Off
      </motion.p>
    </div>
  );
};
