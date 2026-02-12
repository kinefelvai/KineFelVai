
import { Game, Order, User } from './types';
import { INITIAL_GAMES as SEED_GAMES } from './constants';

const STORAGE_KEYS = {
  GAMES: 'kfv_games',
  ORDERS: 'kfv_orders',
  ADMIN_AUTH: 'kfv_admin_auth',
  USER_SESSION: 'kfv_user_session',
  REGISTERED_USERS: 'kfv_registered_users'
};

export const storage = {
  // Game Management
  getGames: (): Game[] => {
    const data = localStorage.getItem(STORAGE_KEYS.GAMES);
    if (!data) {
      localStorage.setItem(STORAGE_KEYS.GAMES, JSON.stringify(SEED_GAMES));
      return SEED_GAMES;
    }
    return JSON.parse(data);
  },

  // Order Management
  getOrders: (): Order[] => {
    const data = localStorage.getItem(STORAGE_KEYS.ORDERS);
    return data ? JSON.parse(data) : [];
  },
  getUserOrders: (email: string): Order[] => {
    const orders = storage.getOrders();
    return orders.filter(o => o.userEmail === email);
  },
  saveOrder: (order: Order) => {
    const orders = storage.getOrders();
    orders.unshift(order);
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
  },
  updateOrderStatus: (orderId: string, status: string) => {
    const orders = storage.getOrders();
    const updated = orders.map(o => o.id === orderId ? { ...o, status } : o);
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(updated));
  },

  // Admin Auth
  adminLogin: (pass: string) => {
    if (pass === '86646') {
      localStorage.setItem(STORAGE_KEYS.ADMIN_AUTH, 'true');
      return true;
    }
    return false;
  },
  isAdminLoggedIn: () => localStorage.getItem(STORAGE_KEYS.ADMIN_AUTH) === 'true',
  adminLogout: () => localStorage.removeItem(STORAGE_KEYS.ADMIN_AUTH),

  // User Auth & Tracking
  userLogin: (user: User) => {
    localStorage.setItem(STORAGE_KEYS.USER_SESSION, JSON.stringify(user));
    
    // Save to registered users list
    const usersData = localStorage.getItem(STORAGE_KEYS.REGISTERED_USERS);
    const users: User[] = usersData ? JSON.parse(usersData) : [];
    if (!users.find(u => u.email === user.email)) {
      users.push(user);
      localStorage.setItem(STORAGE_KEYS.REGISTERED_USERS, JSON.stringify(users));
    }
  },
  getRegisteredUsers: (): User[] => {
    const data = localStorage.getItem(STORAGE_KEYS.REGISTERED_USERS);
    return data ? JSON.parse(data) : [];
  },
  getCurrentUser: (): User | null => {
    const data = localStorage.getItem(STORAGE_KEYS.USER_SESSION);
    return data ? JSON.parse(data) : null;
  },
  userLogout: () => {
    localStorage.removeItem(STORAGE_KEYS.USER_SESSION);
  }
};
