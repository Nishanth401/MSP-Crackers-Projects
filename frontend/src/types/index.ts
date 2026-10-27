export type VerificationStatus = 'VERIFIED' | 'NEEDS_VERIFICATION';
export type AvailabilityStatus = 'IN_STOCK' | 'LOW_STOCK' | 'OUT_OF_STOCK' | 'CONTACT_STORE';

export interface Category {
  id: number;
  slug: string;
  name: string;
  tamil: string;
  description: string;
  bannerUrl?: string;
  itemCount?: number;
}

export interface Product {
  code: number;
  slug: string;
  name: string;
  tamil: string;
  category: string;
  pack: string;
  pieces: string;
  listPrice: number | null;
  netPrice: number | null;
  discountPercent: number | null;
  status: VerificationStatus;
  notes?: string;
  page: number;
  isGiftPack?: boolean;
  itemCount?: number;
  inStock?: boolean;
  image?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type DeliveryMethod = 'SHOWROOM_PICKUP' | 'AUTHORIZED_TRANSPORT';

export interface CheckoutForm {
  name: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  deliveryMethod: DeliveryMethod;
  notes: string;
  ageConfirmed: boolean;
  safetyAgreed: boolean;
}

export interface OrderRecord {
  orderReference: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  address?: string;
  city?: string;
  pincode?: string;
  deliveryMethod: DeliveryMethod;
  items: {
    code: number;
    name: string;
    tamil: string;
    pack: string;
    price: number;
    quantity: number;
    lineTotal: number;
  }[];
  subtotal: number;
  discountTotal: number;
  total: number;
  status: 'RECEIVED' | 'CONFIRMED' | 'READY_FOR_PICKUP' | 'COMPLETED';
  createdAt: string;
}

export interface FilterState {
  category: string;
  searchQuery: string;
  minPrice: number;
  maxPrice: number;
  verifiedOnly: boolean;
  sortBy: 'code' | 'price-asc' | 'price-desc' | 'name-asc' | 'discount-desc';
}
