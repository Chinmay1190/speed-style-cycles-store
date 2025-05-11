
export type Brand = {
  id: string;
  name: string;
  logo: string;
  description: string;
};

export type Category = {
  id: string;
  name: string;
  slug: string;
};

export type ProductImage = {
  id: string;
  url: string;
  alt: string;
};

export type ProductSpecification = {
  engine?: string;
  power?: string;
  torque?: string;
  transmission?: string;
  weight?: string;
  fuelCapacity?: string;
  seatHeight?: string;
  topSpeed?: string;
};

export type Product = {
  id: string;
  name: string;
  slug: string;
  price: number;
  salePrice?: number;
  description: string;
  images: ProductImage[];
  brand: Brand;
  category: Category;
  featured: boolean;
  stock: number;
  rating: number;
  specifications: ProductSpecification;
  new: boolean;
  bestseller: boolean;
  onSale: boolean;
};

export type CartItem = {
  product: Product;
  quantity: number;
};

export interface ShippingInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface PaymentMethod {
  type: "credit" | "debit" | "cod" | "upi";
  cardNumber?: string;
  nameOnCard?: string;
  expiryDate?: string;
  cvv?: string;
  upiId?: string;
}

export type OrderStatus = 
  | "pending" 
  | "processing" 
  | "shipped" 
  | "delivered" 
  | "cancelled";

export interface Order {
  id: string;
  items: CartItem[];
  totalAmount: number;
  shippingInfo: ShippingInfo;
  paymentMethod: PaymentMethod;
  status: OrderStatus;
  createdAt: Date;
  updatedAt: Date;
}
