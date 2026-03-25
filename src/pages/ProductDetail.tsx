import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, ChevronRight, ChevronDown, ChevronUp, Share2, Heart, ShieldCheck, Truck, RefreshCw, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { products } from '../data/products';
import { useCart } from '../CartContext';
import { formatCurrency, cn } from '../lib/utils';
import { ProductCard } from '../components/ProductCard';

export const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const product = products.find(p => p.id === id);
  const { addToCart } = useCart();

  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [activeImage, setActiveImage] = useState(0);
  const [openAccordion, setOpenAccordion] = useState<string | null>('description');
  const [isStickyVisible, setIsStickyVisible] = useState(false);

  useEffect(() => {
    if (product) {
      setSelectedColor(product.colors[0].name);
      setActiveImage(0);
      window.scrollTo(0, 0);
    }
  }, [product]);

  useEffect(() => {
    const handleScroll = () => {
      const addToCartBtn = document.getElementById('add-to-cart-main');
      if (addToCartBtn) {
        const rect = addToCartBtn.getBoundingClientRect();
        setIsStickyVisible(rect.bottom < 0);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!product) return <div className="py-24 text-center">Product not found</div>;

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }
    addToCart(product, selectedSize, selectedColor);
  };

  const toggleAccordion = (id: string) => {
    setOpenAccordion(openAccordion === id ? null : id);
  };

  const relatedProducts = products.filter(p => p.id !== product.id).slice(0, 4);

  return (
    <div className="pb-24">
      {/* Breadcrumbs */}
      <div className="container mx-auto px-4 py-6 flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-gray-400">
        <Link to="/" className="hover:text-black transition-colors">Home</Link>
        <ChevronRight size={12} />
        <Link to="/shop" className="hover:text-black transition-colors">Shop</Link>
        <ChevronRight size={12} />
        <Link to={`/shop?category=${product.category}`} className="hover:text-black transition-colors">{product.category}</Link>
        <ChevronRight size={12} />
        <span className="text-black">{product.name}</span>
      </div>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Media Gallery */}
          <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-4">
            {/* Thumbnails */}
            <div className="flex md:flex-col gap-4 overflow-x-auto md:overflow-y-auto no-scrollbar">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={cn(
                    "w-20 aspect-[3/4] flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all",
                    activeImage === idx ? "border-black" : "border-transparent opacity-60 hover:opacity-100"
                  )}
                >
                  <img src={img} alt={`${product.name} ${idx}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
            {/* Main Image */}
            <div className="flex-1 aspect-[3/4] bg-gray-100 rounded-2xl overflow-hidden relative group">
              <img 
                src={product.images[activeImage]} 
                alt={product.name} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <button className="absolute top-6 right-6 p-3 bg-white/80 backdrop-blur-md rounded-full text-black hover:bg-black hover:text-white transition-all opacity-0 group-hover:opacity-100">
                <Share2 size={20} />
              </button>
            </div>
          </div>

          {/* Product Details */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <h1 className="text-4xl font-black uppercase tracking-tighter leading-none">{product.name}</h1>
                <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <Heart size={24} />
                </button>
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map(i => (
                    <Star key={i} size={16} className={cn("fill-current", i <= Math.floor(product.rating) ? "text-yellow-400" : "text-gray-200")} />
                  ))}
                  <span className="ml-2 text-sm font-bold">{product.rating}</span>
                </div>
                <span className="text-gray-300">|</span>
                <button className="text-sm font-bold underline hover:opacity-60 transition-opacity">
                  {product.reviewsCount} Reviews
                </button>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-3xl font-black">{formatCurrency(product.price)}</span>
                {product.originalPrice && (
                  <span className="text-xl text-gray-400 line-through">{formatCurrency(product.originalPrice)}</span>
                )}
              </div>

              <div className="bg-gray-50 p-4 rounded-xl flex items-center space-x-3 text-sm font-medium">
                <Info size={18} className="text-gray-400" />
                <p>Pay in 4 interest-free payments of {formatCurrency(product.price / 4)} with <span className="font-bold">Klarna</span>.</p>
              </div>
            </div>

            {/* Color Selector */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="font-bold uppercase text-xs tracking-widest">Color: <span className="text-gray-500 font-medium">{selectedColor}</span></h4>
              </div>
              <div className="flex gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    className={cn(
                      "w-10 h-10 rounded-full border-2 p-0.5 transition-all",
                      selectedColor === color.name ? "border-black scale-110" : "border-transparent hover:scale-105"
                    )}
                  >
                    <div className="w-full h-full rounded-full border border-gray-200" style={{ backgroundColor: color.hex }} />
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selector */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="font-bold uppercase text-xs tracking-widest">Size: <span className="text-gray-500 font-medium">{selectedSize || 'Select'}</span></h4>
                <button className="text-xs font-bold underline uppercase tracking-widest hover:opacity-60">Size Guide</button>
              </div>
              <div className="grid grid-cols-4 gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={cn(
                      "py-4 border-2 font-bold text-sm transition-all rounded-xl",
                      selectedSize === size 
                        ? "border-black bg-black text-white" 
                        : "border-gray-100 hover:border-black"
                    )}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Add to Cart */}
            <div className="space-y-4 pt-4">
              <button 
                id="add-to-cart-main"
                onClick={handleAddToCart}
                className="w-full bg-black text-white py-5 rounded-full font-black uppercase tracking-widest text-lg hover:bg-black/90 transition-all transform active:scale-95"
              >
                Add to Cart
              </button>
              <div className="flex items-center justify-center space-x-6 text-[10px] font-bold uppercase tracking-widest text-gray-400">
                <div className="flex items-center"><Truck size={14} className="mr-1" /> Free Shipping</div>
                <div className="flex items-center"><RefreshCw size={14} className="mr-1" /> 30-Day Returns</div>
                <div className="flex items-center"><ShieldCheck size={14} className="mr-1" /> Secure Payment</div>
              </div>
            </div>

            {/* Accordions */}
            <div className="border-t pt-8 space-y-4">
              {[
                { id: 'description', title: 'Description', content: product.description },
                { id: 'details', title: 'Details & Care', content: (
                  <ul className="list-disc list-inside space-y-2">
                    {product.details.map((d, i) => <li key={i}>{d}</li>)}
                  </ul>
                )},
                { id: 'shipping', title: 'Shipping & Returns', content: 'Free standard shipping on all orders over $75. Returns accepted within 30 days of delivery for a full refund or exchange.' }
              ].map((section) => (
                <div key={section.id} className="border-b pb-4">
                  <button 
                    onClick={() => toggleAccordion(section.id)}
                    className="w-full flex justify-between items-center py-2 text-left"
                  >
                    <span className="font-bold uppercase text-xs tracking-widest">{section.title}</span>
                    {openAccordion === section.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>
                  <AnimatePresence>
                    {openAccordion === section.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="py-4 text-sm text-gray-600 leading-relaxed">
                          {section.content}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <section className="container mx-auto px-4 mt-32">
        <h2 className="text-3xl font-black uppercase tracking-tighter mb-12">Complete the Look</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {relatedProducts.map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Sticky Mobile Add to Cart */}
      <AnimatePresence>
        {isStickyVisible && (
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t p-4 lg:hidden flex items-center gap-4"
          >
            <div className="flex-1">
              <p className="text-xs font-bold uppercase tracking-tight truncate">{product.name}</p>
              <p className="text-sm font-black">{formatCurrency(product.price)}</p>
            </div>
            <button 
              onClick={handleAddToCart}
              className="bg-black text-white px-8 py-3 rounded-full font-bold text-sm uppercase tracking-widest"
            >
              Add to Cart
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
