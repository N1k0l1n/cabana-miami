// /store/productStore.ts
import { create } from 'zustand';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  salePrice: number | null;
  images: string[];
  categories: string[];
  stockQuantity: number;
  materials?: string | null;
  dimensions?: string | null;
}

interface ProductStore {
  products: Product[];
  isLoading: boolean;
  error: string | null;
  fetchProducts: () => Promise<void>;
  getProductById: (id: string) => Product | undefined;
}

const safeParse = (element: Element, tag: string, fallback: any) => {
  const node = element.getElementsByTagName(tag)[0];
  return node?.textContent || fallback;
};

// /store/productStore.ts
const useProductStore = create<ProductStore>((set, get) => ({
  products: [],
  isLoading: false,
  error: null,
  fetchProducts: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch('/api/quickbooks/products');
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      
      // Parse as JSON instead of XML
      const products = await response.json();
      
      // Transform the API response to match Product interface
      const transformedProducts = products.map((item: any) => ({
        id: item.id.toString(),
        name: item.name,
        description: item.description,
        price: Number(item.price),
        salePrice: item.salePrice ? Number(item.salePrice) : null,
        images: item.images.length ? item.images : ['/placeholder.svg'],
        categories: item.categories || [],
        stockQuantity: Number(item.stockQuantity),
        materials: item.materials || null,
        dimensions: item.dimensions || null
      }));

      set({ products: transformedProducts });
    } catch (error: any) {
      set({ error: error.message || 'Failed to fetch products' });
      console.error('Fetch error:', error);
    } finally {
      set({ isLoading: false });
    }
  },
  getProductById: (id: string) => get().products.find((p) => p.id === id),
}));

export default useProductStore;