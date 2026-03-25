export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  category: string;
  images: string[];
  hoverImage: string;
  colors: { name: string; hex: string }[];
  sizes: string[];
  description: string;
  details: string[];
  fit: string;
  material: string;
  isBestseller?: boolean;
  isNew?: boolean;
  isAlmostGone?: boolean;
  rating: number;
  reviewsCount: number;
}

export interface CartItem extends Product {
  selectedSize: string;
  selectedColor: string;
  quantity: number;
}
