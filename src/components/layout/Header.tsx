import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, ShoppingBag, User, Heart, Menu, X } from 'lucide-react';
import { useCart } from '../../CartContext';
import { cn } from '../../lib/utils';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { totalItems, setIsCartOpen } = useCart();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'New Arrivals', path: '/shop?filter=new' },
    { name: 'Men', path: '/shop?category=Men' },
    { name: 'Women', path: '/shop?category=Women' },
    { name: 'Accessories', path: '/shop?category=Accessories' },
    { name: 'Sale', path: '/shop?filter=sale', className: 'text-red-600' }
  ];

  return (
    <header className={cn(
      "sticky top-0 z-50 w-full transition-all duration-300",
      isScrolled ? "bg-white/90 backdrop-blur-md shadow-sm py-3" : "bg-white py-5"
    )}>
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        {/* Mobile Menu Toggle */}
        <button 
          className="lg:hidden p-2 -ml-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Logo */}
        <Link to="/" className="text-2xl font-bold tracking-tighter hover:opacity-80 transition-opacity">
          V&V<span className="text-xs align-top ml-0.5">®</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.path}
              className={cn(
                "text-sm font-medium hover:text-black/60 transition-colors",
                link.className
              )}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Icons */}
        <div className="flex items-center space-x-4 md:space-x-6">
          <button className="hidden md:block p-2 hover:bg-gray-100 rounded-full transition-colors">
            <Search size={20} />
          </button>
          <button className="hidden md:block p-2 hover:bg-gray-100 rounded-full transition-colors">
            <User size={20} />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors relative">
            <Heart size={20} />
          </button>
          <button 
            className="p-2 hover:bg-gray-100 rounded-full transition-colors relative"
            onClick={() => setIsCartOpen(true)}
          >
            <ShoppingBag size={20} />
            {totalItems > 0 && (
              <span className="absolute top-1 right-1 bg-black text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white border-t shadow-xl py-6 px-4 space-y-4 animate-in fade-in slide-in-from-top-4 duration-300">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.path}
              className={cn(
                "block text-lg font-medium border-b border-gray-100 pb-2",
                link.className
              )}
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-4 flex space-x-6">
            <Link to="/account" className="flex items-center text-sm font-medium">
              <User size={20} className="mr-2" /> Account
            </Link>
            <Link to="/wishlist" className="flex items-center text-sm font-medium">
              <Heart size={20} className="mr-2" /> Wishlist
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
