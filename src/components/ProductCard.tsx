import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Heart, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Product } from '../types';
import { useCart } from '../CartContext';
import { formatCurrency, cn } from '../lib/utils';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isQuickAddOpen, setIsQuickAddOpen] = useState(false);
  const { addToCart } = useCart();

  const handleQuickAdd = (size: string) => {
    addToCart(product, size, product.colors[0].name);
    setIsQuickAddOpen(false);
  };

  return (
    <div 
      className="group relative flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsQuickAddOpen(false);
      }}
    >
      {/* Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-100 rounded-xl">
        {/* Badges */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
          {product.isNew && (
            <span className="bg-white text-black text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider shadow-sm">
              New
            </span>
          )}
          {product.isBestseller && (
            <span className="bg-black text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider shadow-sm">
              Bestseller
            </span>
          )}
          {product.isAlmostGone && (
            <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider shadow-sm">
              Almost Gone
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button className="absolute top-3 right-3 z-10 p-2 bg-white/80 backdrop-blur-md rounded-full text-black hover:bg-black hover:text-white transition-all duration-300 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0">
          <Heart size={16} />
        </button>

        {/* Product Images */}
        <Link to={`/product/${product.id}`} className="block h-full">
          <img
            src={isHovered ? product.hoverImage : product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
        </Link>

        {/* Quick Add Overlay */}
        <AnimatePresence>
          {isQuickAddOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="absolute inset-x-0 bottom-0 bg-white/95 backdrop-blur-md p-4 z-20"
            >
              <p className="text-[10px] font-bold uppercase tracking-widest mb-3 text-center">Select Size</p>
              <div className="grid grid-cols-4 gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => handleQuickAdd(size)}
                    className="py-2 border border-gray-200 text-xs font-bold hover:bg-black hover:text-white hover:border-black transition-all rounded-md"
                  >
                    {size}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Quick Add Trigger */}
        {!isQuickAddOpen && (
          <button 
            onClick={() => setIsQuickAddOpen(true)}
            className="absolute bottom-4 left-4 right-4 bg-white text-black py-3 rounded-full font-bold text-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:bg-black hover:text-white"
          >
            <ShoppingBag size={16} className="mr-2" />
            Quick Add
          </button>
        )}
      </div>

      {/* Info */}
      <div className="mt-4 space-y-1">
        <div className="flex justify-between items-start">
          <Link to={`/product/${product.id}`} className="text-sm font-bold uppercase tracking-tight hover:underline">
            {product.name}
          </Link>
          <div className="flex items-center text-[10px] font-bold">
            <Star size={10} className="fill-yellow-400 text-yellow-400 mr-0.5" />
            {product.rating}
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold">{formatCurrency(product.price)}</span>
          {product.originalPrice && (
            <span className="text-xs text-gray-400 line-through">{formatCurrency(product.originalPrice)}</span>
          )}
        </div>

        {/* Color Swatches */}
        <div className="flex gap-1.5 pt-1">
          {product.colors.map((color) => (
            <div 
              key={color.name}
              className="w-3 h-3 rounded-full border border-gray-200"
              style={{ backgroundColor: color.hex }}
              title={color.name}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
