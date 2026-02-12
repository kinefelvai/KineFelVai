
import { Game, Review } from './types';

export const INITIAL_GAMES: Game[] = [
  {
    id: '1',
    name: 'Mobile Legends',
    slug: 'mobile-legends',
    image: 'https://picsum.photos/seed/mlbb/400/500',
    banner: 'https://picsum.photos/seed/mlbb-banner/1200/400',
    description: 'Fast and reliable diamond top-up for MLBB.',
    requiresZoneId: true,
    category: 'Mobile',
    products: [
      { id: 'ml1', name: '86 Diamonds', price: 155, originalPrice: 180, badge: 'Popular' },
      { id: 'ml2', name: '172 Diamonds', price: 310, originalPrice: 350 },
      { id: 'ml3', name: '257 Diamonds', price: 460, originalPrice: 500 },
      { id: 'ml4', name: '706 Diamonds', price: 1250, originalPrice: 1400, badge: 'Best Value' },
      { id: 'ml5', name: '2195 Diamonds', price: 3850, originalPrice: 4200 },
    ]
  },
  {
    id: '2',
    name: 'Free Fire',
    slug: 'free-fire',
    image: 'https://picsum.photos/seed/ff/400/500',
    banner: 'https://picsum.photos/seed/ff-banner/1200/400',
    description: 'Instant Garena Free Fire Diamond top-up.',
    requiresZoneId: false,
    category: 'Mobile',
    products: [
      { id: 'ff1', name: '115 Diamonds', price: 85 },
      { id: 'ff2', name: '240 Diamonds', price: 175, badge: 'Hot' },
      { id: 'ff3', name: '610 Diamonds', price: 430 },
      { id: 'ff4', name: '1240 Diamonds', price: 850 },
    ]
  },
  {
    id: '3',
    name: 'PUBG Mobile',
    slug: 'pubg-mobile',
    image: 'https://picsum.photos/seed/pubg/400/500',
    banner: 'https://picsum.photos/seed/pubg-banner/1200/400',
    description: 'Official UC top-up for PUBG Mobile.',
    requiresZoneId: false,
    category: 'Mobile',
    products: [
      { id: 'pb1', name: '60 UC', price: 95 },
      { id: 'pb2', name: '325 UC', price: 450, badge: 'Trending' },
      { id: 'pb3', name: '660 UC', price: 890 },
    ]
  },
  {
    id: '4',
    name: 'Valorant',
    slug: 'valorant',
    image: 'https://picsum.photos/seed/val/400/500',
    banner: 'https://picsum.photos/seed/val-banner/1200/400',
    description: 'Valorant Points for your Riot account.',
    requiresZoneId: false,
    category: 'PC',
    products: [
      { id: 'vp1', name: '475 VP', price: 450 },
      { id: 'vp2', name: '1000 VP', price: 920 },
      { id: 'vp3', name: '2050 VP', price: 1850 },
    ]
  }
];

export const REVIEWS: Review[] = [
  { id: 'r1', name: 'Anisur Rahman', rating: 5, comment: 'Instant delivery! Best price in BD for ML diamonds.', date: '2 days ago' },
  { id: 'r2', name: 'Tanvir Ahmed', rating: 5, comment: 'Trusted site. Always get my UC within 5 minutes.', date: '1 week ago' },
  { id: 'r3', name: 'Sabbir Hossain', rating: 4, comment: 'Good service, UI is very clean.', date: '3 days ago' },
];

export const PAYMENT_METHODS = [
  { id: 'bkash', name: 'bKash', color: 'bg-pink-600', number: '01700000000' },
  { id: 'nagad', name: 'Nagad', color: 'bg-orange-600', number: '01800000000' },
  { id: 'rocket', name: 'Rocket', color: 'bg-purple-600', number: '01900000000' },
  { id: 'binance', name: 'Binance USDT', color: 'bg-yellow-500', number: 'T-Address-Example' },
];
