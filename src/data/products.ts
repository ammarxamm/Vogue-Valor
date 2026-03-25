import { Product } from '../types';

export const products: Product[] = [
  {
    id: '1',
    name: 'Essential Organic Cotton Tee',
    price: 35,
    originalPrice: 45,
    category: 'Men',
    images: [
      'https://picsum.photos/seed/tee1/800/1000',
      'https://picsum.photos/seed/tee1-back/800/1000',
      'https://picsum.photos/seed/tee1-detail/800/1000'
    ],
    hoverImage: 'https://picsum.photos/seed/tee1-lifestyle/800/1000',
    colors: [
      { name: 'Black', hex: '#000000' },
      { name: 'White', hex: '#FFFFFF' },
      { name: 'Navy', hex: '#000080' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Our signature organic cotton tee is the foundation of any modern wardrobe. Breathable, soft, and ethically made.',
    details: [
      '100% GOTS Certified Organic Cotton',
      'Pre-shrunk for the perfect fit',
      'Reinforced neck seams',
      'Ethically made in Portugal'
    ],
    fit: 'Regular Fit',
    material: '100% Organic Cotton',
    isBestseller: true,
    rating: 4.8,
    reviewsCount: 1240
  },
  {
    id: '2',
    name: 'Classic Linen Button-Down',
    price: 85,
    category: 'Women',
    images: [
      'https://picsum.photos/seed/linen1/800/1000',
      'https://picsum.photos/seed/linen1-back/800/1000'
    ],
    hoverImage: 'https://picsum.photos/seed/linen1-lifestyle/800/1000',
    colors: [
      { name: 'Sand', hex: '#C2B280' },
      { name: 'Sky Blue', hex: '#87CEEB' }
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    description: 'A timeless silhouette in premium European linen. Perfect for warm days and effortless layering.',
    details: [
      '100% European Flax Linen',
      'Mother of pearl buttons',
      'Relaxed, airy silhouette',
      'Garment dyed for softness'
    ],
    fit: 'Relaxed Fit',
    material: '100% Linen',
    isNew: true,
    rating: 4.9,
    reviewsCount: 850
  },
  {
    id: '3',
    name: 'Technical Shell Parka',
    price: 245,
    category: 'Outerwear',
    images: [
      'https://picsum.photos/seed/parka1/800/1000',
      'https://picsum.photos/seed/parka1-back/800/1000'
    ],
    hoverImage: 'https://picsum.photos/seed/parka1-lifestyle/800/1000',
    colors: [
      { name: 'Olive', hex: '#556B2F' },
      { name: 'Charcoal', hex: '#36454F' }
    ],
    sizes: ['M', 'L', 'XL'],
    description: 'Weather-resistant performance meets urban aesthetics. Designed to keep you dry without sacrificing style.',
    details: [
      'Water-repellent recycled nylon',
      'Adjustable storm hood',
      'Internal security pockets',
      'Seam-sealed construction'
    ],
    fit: 'Modern Fit',
    material: 'Recycled Nylon',
    isAlmostGone: true,
    rating: 4.7,
    reviewsCount: 320
  },
  {
    id: '4',
    name: 'Merino Wool Crewneck',
    price: 110,
    category: 'Men',
    images: [
      'https://picsum.photos/seed/merino1/800/1000',
      'https://picsum.photos/seed/merino1-back/800/1000'
    ],
    hoverImage: 'https://picsum.photos/seed/merino1-lifestyle/800/1000',
    colors: [
      { name: 'Grey Melange', hex: '#BEBEBE' },
      { name: 'Burgundy', hex: '#800020' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Ultra-fine merino wool that regulates temperature naturally. A versatile layer for all seasons.',
    details: [
      '100% Extra Fine Merino Wool',
      'Naturally odor-resistant',
      'Ribbed cuffs and hem',
      'Machine washable'
    ],
    fit: 'Slim Fit',
    material: 'Merino Wool',
    rating: 4.8,
    reviewsCount: 560
  }
];
