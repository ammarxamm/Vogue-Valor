import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Truck, RefreshCw, ShieldCheck, Leaf, Instagram } from 'lucide-react';
import { motion } from 'motion/react';
import { products } from '../data/products';
import { ProductCard } from '../components/ProductCard';

export const Home: React.FC = () => {
  const bestsellers = products.filter(p => p.isBestseller);

  return (
    <div className="space-y-24 pb-24">
      {/* Hero Section */}
      <section className="relative h-[90vh] w-full overflow-hidden">
        <div className="absolute inset-0 bg-black/30 z-10" />
        <img 
          src="https://picsum.photos/seed/hero/1920/1080" 
          alt="Hero" 
          className="absolute inset-0 w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="relative z-20 h-full container mx-auto px-4 flex flex-col justify-center items-start text-white">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-2xl space-y-6"
          >
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-none uppercase">
              The Summer <br /> Collection
            </h1>
            <p className="text-lg md:text-xl font-medium opacity-90 max-w-lg">
              Premium essentials designed for the modern explorer. Ethically made, sustainably sourced, and built to last.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Link to="/shop" className="bg-white text-black px-10 py-4 rounded-full font-bold text-lg hover:bg-black hover:text-white transition-all duration-300 flex items-center group">
                Shop Now
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
              </Link>
              <Link to="/shop?filter=new" className="bg-transparent border-2 border-white text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-black transition-all duration-300">
                New Arrivals
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="container mx-auto px-4 py-12 border-y border-gray-100">
        <p className="text-center text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-8">As Featured In</p>
        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-40 grayscale">
          <span className="text-2xl font-black tracking-tighter italic">VOGUE</span>
          <span className="text-2xl font-black tracking-tighter">GQ</span>
          <span className="text-2xl font-black tracking-tighter uppercase">Hypebeast</span>
          <span className="text-2xl font-black tracking-tighter">ELLE</span>
          <span className="text-2xl font-black tracking-tighter">Esquire</span>
        </div>
      </section>

      {/* Category Grid */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link to="/shop?category=Men" className="group relative aspect-[4/5] overflow-hidden rounded-2xl">
            <img src="https://picsum.photos/seed/men/800/1000" alt="Men" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-8 left-8 text-white">
              <h3 className="text-3xl font-black uppercase tracking-tighter">Men</h3>
              <p className="text-sm font-medium opacity-80 mt-1">Shop Collection</p>
            </div>
          </Link>
          <Link to="/shop?category=Women" className="group relative aspect-[4/5] overflow-hidden rounded-2xl">
            <img src="https://picsum.photos/seed/women/800/1000" alt="Women" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-8 left-8 text-white">
              <h3 className="text-3xl font-black uppercase tracking-tighter">Women</h3>
              <p className="text-sm font-medium opacity-80 mt-1">Shop Collection</p>
            </div>
          </Link>
          <Link to="/shop?category=Accessories" className="group relative aspect-[4/5] overflow-hidden rounded-2xl md:col-span-2 lg:col-span-1">
            <img src="https://picsum.photos/seed/acc/800/1000" alt="Accessories" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-8 left-8 text-white">
              <h3 className="text-3xl font-black uppercase tracking-tighter">Accessories</h3>
              <p className="text-sm font-medium opacity-80 mt-1">Shop Collection</p>
            </div>
          </Link>
        </div>
      </section>

      {/* Bestsellers */}
      <section className="container mx-auto px-4">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-4xl font-black uppercase tracking-tighter">Bestsellers</h2>
            <p className="text-gray-500 mt-2">The pieces everyone is talking about.</p>
          </div>
          <Link to="/shop" className="text-sm font-bold uppercase tracking-widest border-b-2 border-black pb-1 hover:opacity-60 transition-opacity">
            View All
          </Link>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {bestsellers.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Brand Story / Value Prop */}
      <section className="bg-gray-50 py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-5xl font-black uppercase tracking-tighter leading-none">
                Ethically Made. <br /> Built to Last.
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                We believe in quality over quantity. Our garments are crafted in small batches using the world's finest sustainable materials. No shortcuts, no compromises.
              </p>
              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-2">
                  <Leaf className="text-green-600" size={32} />
                  <h4 className="font-bold uppercase text-xs tracking-widest">100% Organic</h4>
                  <p className="text-sm text-gray-500">GOTS certified organic cotton and linen.</p>
                </div>
                <div className="space-y-2">
                  <ShieldCheck className="text-blue-600" size={32} />
                  <h4 className="font-bold uppercase text-xs tracking-widest">Ethical Labor</h4>
                  <p className="text-sm text-gray-500">Fair wages and safe working conditions.</p>
                </div>
                <div className="space-y-2">
                  <Truck className="text-black" size={32} />
                  <h4 className="font-bold uppercase text-xs tracking-widest">Carbon Neutral</h4>
                  <p className="text-sm text-gray-500">Offsetting every shipment worldwide.</p>
                </div>
                <div className="space-y-2">
                  <RefreshCw className="text-black" size={32} />
                  <h4 className="font-bold uppercase text-xs tracking-widest">Lifetime Repair</h4>
                  <p className="text-sm text-gray-500">We fix what you love, for life.</p>
                </div>
              </div>
            </div>
            <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl">
              <img src="https://picsum.photos/seed/story/1000/1000" alt="Brand Story" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* UGC Section */}
      <section className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-black uppercase tracking-tighter">Seen on You</h2>
          <p className="text-gray-500 mt-2">Tag @vogueandvalor for a chance to be featured.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="aspect-square rounded-xl overflow-hidden group relative">
              <img src={`https://picsum.photos/seed/ugc${i}/600/600`} alt={`UGC ${i}`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Instagram className="text-white" size={24} />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
