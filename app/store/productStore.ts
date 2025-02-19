// /store/productStore.ts
import {create} from 'zustand';

export interface Product {
  id: string ;
  name: string;
  description: string;
  price: number;
  salePrice: number | null;
  images: string[];
  categories: string[];
  stockQuantity: number;
  materials?: string;
  dimensions?: string;
}

interface ProductStore {
  products: Product[];
  isLoading: boolean;
  error: string | null;
  fetchProducts: () => Promise<void>;
  getProductById: (id: string) => Product | undefined;
}

const useProductStore = create<ProductStore>((set, get) => ({
  products: [],
  isLoading: false,
  error: null,
  fetchProducts: async () => {
    set({ isLoading: true, error: null });
    try {
      // NOTE: When switching to a backend, update the URL and logic here.
      const response = await fetch('/products1.json');
      if (!response.ok) throw new Error('Failed to fetch products');
      const data = await response.json();
      const transformedProducts = data.map((p: any) => ({
        id: p.ID.toString(),
        name: p.Name,
        description: p.Description,
        price: parseFloat(p['Regular price']) || 0,
        salePrice: p['Sale price'] ? parseFloat(p['Sale price']) : null,
        images: p.Images ? [p.Images] : ['/placeholder.svg'],
        categories: p.Categories
          ? p.Categories.split(',').map((cat: string) => cat.trim())
          : [],
        stockQuantity: parseInt(p.Stock) || 0,
        materials: p.Materials,
        dimensions: p.Dimensions,
      }));
      set({ products: transformedProducts });
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },
  getProductById: (id: string) =>
    get().products.find((p) => p.id === id),
}));

export default useProductStore;
