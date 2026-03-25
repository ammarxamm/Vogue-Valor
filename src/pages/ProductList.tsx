import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, ChevronDown, X, SlidersHorizontal } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { products } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { cn } from '../lib/utils';

export const ProductList: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState('newest');

  const activeCategory = searchParams.get('category');
  const activeFilter = searchParams.get('filter');

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (activeCategory) {
      result = result.filter(p => p.category === activeCategory);
    }

    if (activeFilter === 'new') {
      result = result.filter(p => p.isNew);
    } else if (activeFilter === 'sale') {
      result = result.filter(p => p.originalPrice);
    }

    // Sorting
    if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [activeCategory, activeFilter, sortBy]);

  const categories = ['Men', 'Women', 'Accessories', 'Outerwear'];

  const clearFilters = () => {
    setSearchParams({});
  };

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 space-y-4 md:space-y-0">
        <div>
          <h1 className="text-5xl font-black uppercase tracking-tighter">
            {activeCategory || 'All Collections'}
          </h1>
          <p className="text-gray-500 mt-2">Showing {filteredProducts.length} products</p>
        </div>

        <div className="flex items-center space-x-4">
          <button 
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="flex items-center space-x-2 border border-gray-200 px-6 py-3 rounded-full font-bold text-sm hover:bg-black hover:text-white transition-all"
          >
            <SlidersHorizontal size={18} />
            <span>Filters</span>
          </button>

          <div className="relative group">
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none bg-white border border-gray-200 px-8 py-3 rounded-full font-bold text-sm focus:outline-none focus:ring-2 focus:ring-black cursor-pointer pr-12"
            >
              <option value="newest">Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" size={18} />
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Desktop Sidebar Filters */}
        <aside className="hidden lg:block w-64 space-y-10">
          <div>
            <h4 className="font-bold uppercase text-xs tracking-widest mb-6">Categories</h4>
            <div className="space-y-3">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSearchParams({ category: cat })}
                  className={cn(
                    "block text-sm font-medium transition-colors",
                    activeCategory === cat ? "text-black font-bold" : "text-gray-500 hover:text-black"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold uppercase text-xs tracking-widest mb-6">Size</h4>
            <div className="grid grid-cols-3 gap-2">
              {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map(size => (
                <button key={size} className="py-2 border border-gray-100 text-[10px] font-bold hover:border-black transition-colors rounded-md">
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold uppercase text-xs tracking-widest mb-6">Color</h4>
            <div className="flex flex-wrap gap-3">
              {['#000000', '#FFFFFF', '#BEBEBE', '#556B2F', '#800020', '#C2B280'].map(color => (
                <button 
                  key={color} 
                  className="w-6 h-6 rounded-full border border-gray-200 hover:scale-110 transition-transform"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>

          {(activeCategory || activeFilter) && (
            <button 
              onClick={clearFilters}
              className="flex items-center text-xs font-bold uppercase tracking-widest text-red-600 hover:text-red-700 transition-colors"
            >
              <X size={14} className="mr-1" /> Clear All
            </button>
          )}
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          {filteredProducts.length === 0 ? (
            <div className="py-24 text-center">
              <p className="text-xl font-bold">No products found</p>
              <p className="text-gray-500 mt-2">Try adjusting your filters or search terms.</p>
              <button 
                onClick={clearFilters}
                className="mt-6 bg-black text-white px-8 py-3 rounded-full font-bold"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-12">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      <AnimatePresence>
        {isFilterOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsFilterOpen(false)}
              className="fixed inset-0 bg-black/40 z-[60] backdrop-blur-sm lg:hidden"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              className="fixed left-0 top-0 h-full w-full max-w-xs bg-white z-[70] p-8 overflow-y-auto lg:hidden"
            >
              <div className="flex justify-between items-center mb-12">
                <h2 className="text-2xl font-black uppercase tracking-tighter">Filters</h2>
                <button onClick={() => setIsFilterOpen(false)}><X size={24} /></button>
              </div>
              
              <div className="space-y-12">
                {/* Mobile filter content (same as desktop sidebar) */}
                <div>
                  <h4 className="font-bold uppercase text-xs tracking-widest mb-6">Categories</h4>
                  <div className="space-y-4">
                    {categories.map(cat => (
                      <button
                        key={cat}
                        onClick={() => {
                          setSearchParams({ category: cat });
                          setIsFilterOpen(false);
                        }}
                        className={cn(
                          "block text-lg font-medium transition-colors",
                          activeCategory === cat ? "text-black font-bold" : "text-gray-500"
                        )}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
                {/* ... other filters ... */}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
