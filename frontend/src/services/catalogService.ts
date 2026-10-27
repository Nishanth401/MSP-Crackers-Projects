import catalogData from '../data/catalog.json';
import { Product, Category, FilterState } from '../types';

export const METADATA = catalogData.metadata;
export const CATEGORIES: Category[] = catalogData.categories.map(c => {
  const count = (catalogData.products as Product[]).filter(p => p.category === c.slug).length;
  return { ...c, itemCount: count };
});
export const ALL_PRODUCTS: Product[] = (catalogData.products as Product[]).map(p => ({
  ...p,
  inStock: true
}));

export function getProductBySlug(slug: string): Product | undefined {
  return ALL_PRODUCTS.find(p => p.slug === slug || String(p.code) === slug);
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return CATEGORIES.find(c => c.slug === slug);
}

export function getProductsByCategory(categorySlug: string): Product[] {
  return ALL_PRODUCTS.filter(p => p.category === categorySlug);
}

export function getGiftBoxes(): Product[] {
  return ALL_PRODUCTS.filter(p => p.category === 'gift-boxes');
}

export function getFeaturedProducts(): Product[] {
  // Select verified iconic items: Gold Lakshmi, Chakkers Deluxe, Flower Pots Super Dlx, Classic Bomb, Bijili Red, Twinkling Star, Tri Colour, Disco Wheel, 30 Shots, 55cm Sparklers, Dora Gift Box
  const featuredCodes = [1, 8, 10, 16, 17, 20, 23, 30, 60, 88, 99, 104, 117, 119, 121, 126, 130];
  return ALL_PRODUCTS.filter(p => featuredCodes.includes(p.code));
}

export function filterProducts(filters: Partial<FilterState>): Product[] {
  let list = [...ALL_PRODUCTS];

  if (filters.category && filters.category !== 'all') {
    list = list.filter(p => p.category === filters.category);
  }

  if (filters.searchQuery && filters.searchQuery.trim() !== '') {
    const q = filters.searchQuery.toLowerCase().trim();
    list = list.filter(p => 
      p.name.toLowerCase().includes(q) ||
      p.tamil.toLowerCase().includes(q) ||
      String(p.code) === q ||
      p.category.toLowerCase().includes(q)
    );
  }

  if (filters.verifiedOnly) {
    list = list.filter(p => p.status === 'VERIFIED');
  }

  if (filters.minPrice !== undefined && filters.minPrice > 0) {
    list = list.filter(p => p.netPrice !== null && p.netPrice >= filters.minPrice!);
  }

  if (filters.maxPrice !== undefined && filters.maxPrice < 100000) {
    list = list.filter(p => p.netPrice !== null && p.netPrice <= filters.maxPrice!);
  }

  // Sorting
  if (filters.sortBy) {
    switch (filters.sortBy) {
      case 'price-asc':
        list.sort((a, b) => (a.netPrice ?? 999999) - (b.netPrice ?? 999999));
        break;
      case 'price-desc':
        list.sort((a, b) => (b.netPrice ?? 0) - (a.netPrice ?? 0));
        break;
      case 'name-asc':
        list.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'discount-desc':
        list.sort((a, b) => (b.discountPercent ?? 0) - (a.discountPercent ?? 0));
        break;
      case 'code':
      default:
        list.sort((a, b) => a.code - b.code);
        break;
    }
  }

  return list;
}
