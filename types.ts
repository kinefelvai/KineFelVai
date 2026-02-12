
export type OrderStatus = 'Pending' | 'Completed' | 'Cancelled';

export interface User {
  id: string;
  email: string;
  name: string;
  picture: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  badge?: string;
}

export interface Game {
  id: string;
  name: string;
  slug: string;
  image: string;
  banner: string;
  description: string;
  products: Product[];
  requiresZoneId: boolean;
  category: string;
}

export interface Order {
  id: string;
  userEmail: string; // Linked to logged in user
  gameId: string;
  gameName: string;
  productId: string;
  productName: string;
  amount: number;
  userId: string;
  zoneId?: string;
  customerName: string;
  paymentMethod: string;
  paymentNumber: string;
  transactionId: string;
  status: OrderStatus;
  createdAt: string;
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
}
