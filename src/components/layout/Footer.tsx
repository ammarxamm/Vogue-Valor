import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Twitter, Facebook, Youtube, ArrowRight } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand & Newsletter */}
          <div className="space-y-6">
            <Link to="/" className="text-2xl font-bold tracking-tighter">
              V&V<span className="text-xs align-top ml-0.5">®</span>
            </Link>
            <p className="text-sm text-gray-600 max-w-xs">
              Join the club for 15% off your first order and stay updated on our latest drops.
            </p>
            <form className="relative max-w-xs" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full bg-gray-100 border-none rounded-full py-3 px-6 text-sm focus:ring-2 focus:ring-black transition-all"
              />
              <button className="absolute right-1 top-1 bg-black text-white p-2 rounded-full hover:bg-black/80 transition-colors">
                <ArrowRight size={18} />
              </button>
            </form>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-bold uppercase text-xs tracking-widest mb-6">Shop</h4>
            <ul className="space-y-4">
              <li><Link to="/shop?category=Men" className="text-sm text-gray-600 hover:text-black transition-colors">Men's Collection</Link></li>
              <li><Link to="/shop?category=Women" className="text-sm text-gray-600 hover:text-black transition-colors">Women's Collection</Link></li>
              <li><Link to="/shop?category=Accessories" className="text-sm text-gray-600 hover:text-black transition-colors">Accessories</Link></li>
              <li><Link to="/shop?filter=new" className="text-sm text-gray-600 hover:text-black transition-colors">New Arrivals</Link></li>
              <li><Link to="/shop?filter=sale" className="text-sm text-red-600 hover:text-red-700 transition-colors">Sale</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-bold uppercase text-xs tracking-widest mb-6">Support</h4>
            <ul className="space-y-4">
              <li><Link to="/shipping" className="text-sm text-gray-600 hover:text-black transition-colors">Shipping Policy</Link></li>
              <li><Link to="/returns" className="text-sm text-gray-600 hover:text-black transition-colors">Returns & Exchanges</Link></li>
              <li><Link to="/sizing" className="text-sm text-gray-600 hover:text-black transition-colors">Sizing Guide</Link></li>
              <li><Link to="/faq" className="text-sm text-gray-600 hover:text-black transition-colors">FAQs</Link></li>
              <li><Link to="/contact" className="text-sm text-gray-600 hover:text-black transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-bold uppercase text-xs tracking-widest mb-6">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-black hover:text-white transition-all">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-black hover:text-white transition-all">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-black hover:text-white transition-all">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-black hover:text-white transition-all">
                <Youtube size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-xs text-gray-500">
            © 2026 Vogue & Valor Premium Apparel. All rights reserved.
          </p>
          <div className="flex items-center space-x-6 opacity-50 grayscale">
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-3" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-3" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-3" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/3/30/Apple_Pay_logo.svg" alt="Apple Pay" className="h-3" />
          </div>
        </div>
      </div>
    </footer>
  );
};
