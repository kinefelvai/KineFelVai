
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import GameDetail from './pages/GameDetail';
import Admin from './pages/Admin';
import Login from './pages/Login';
import OrderHistory from './pages/OrderHistory';
import { Game, Order, User } from './types';
import { storage } from './store';
import { CheckCircle2, ShoppingBag } from 'lucide-react';

type AppState = 'home' | 'game' | 'admin' | 'admin_login' | 'login' | 'history' | 'success';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<AppState>('home');
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [lastOrder, setLastOrder] = useState<Order | null>(null);
  const [adminPass, setAdminPass] = useState('');
  const [games, setGames] = useState<Game[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userOrders, setUserOrders] = useState<Order[]>([]);

  useEffect(() => {
    setGames(storage.getGames());
    const loggedUser = storage.getCurrentUser();
    if (loggedUser) {
      setCurrentUser(loggedUser);
      setUserOrders(storage.getUserOrders(loggedUser.email));
    }
  }, []);

  const handleGameSelect = (game: Game) => {
    setSelectedGame(game);
    setCurrentPage('game');
    window.scrollTo(0, 0);
  };

  const handlePlaceOrder = (order: Order) => {
    storage.saveOrder(order);
    setLastOrder(order);
    if (currentUser) {
      setUserOrders(storage.getUserOrders(currentUser.email));
    }
    setCurrentPage('success');
    window.scrollTo(0, 0);
  };

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (storage.adminLogin(adminPass)) {
      setCurrentPage('admin');
      setAdminPass('');
    } else {
      alert('Invalid admin password!');
    }
  };

  const handleUserLogin = (user: User) => {
    storage.userLogin(user);
    setCurrentUser(user);
    setUserOrders(storage.getUserOrders(user.email));
    setCurrentPage('home');
  };

  const handleLogout = () => {
    storage.userLogout();
    setCurrentUser(null);
    setUserOrders([]);
    setCurrentPage('home');
  };

  const handleAdminLogout = () => {
    storage.adminLogout();
    setCurrentPage('home');
  };

  const goToHome = () => {
    setCurrentPage('home');
    setSelectedGame(null);
    window.scrollTo(0, 0);
  };

  const goToHistory = () => {
    if (!currentUser) {
      setCurrentPage('login');
    } else {
      setCurrentPage('history');
    }
    window.scrollTo(0, 0);
  };

  const handleAdminTrigger = () => {
    if (storage.isAdminLoggedIn()) {
      setCurrentPage('admin');
    } else {
      setCurrentPage('admin_login');
    }
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-cyan-500 selection:text-slate-950">
      {currentPage !== 'admin' && (
        <Navbar 
          user={currentUser}
          onHomeClick={goToHome}
          onLoginClick={() => setCurrentPage('login')}
          onHistoryClick={goToHistory}
          onLogoutClick={handleLogout}
        />
      )}

      <main className="min-h-[70vh]">
        {currentPage === 'home' && (
          <Home games={games} onGameSelect={handleGameSelect} />
        )}

        {currentPage === 'game' && selectedGame && (
          <GameDetail 
            game={selectedGame} 
            user={currentUser}
            onBack={goToHome} 
            onPlaceOrder={handlePlaceOrder}
            onLoginRequired={() => setCurrentPage('login')}
          />
        )}

        {currentPage === 'login' && (
          <Login onLoginSuccess={handleUserLogin} onBack={goToHome} />
        )}

        {currentPage === 'history' && (
          <OrderHistory orders={userOrders} onBack={goToHome} />
        )}

        {currentPage === 'admin_login' && (
          <div className="max-w-md mx-auto py-32 px-4">
            <div className="bg-slate-900 p-10 rounded-3xl border border-slate-800 shadow-2xl text-center">
              <div className="w-20 h-20 bg-cyan-500 rounded-2xl mx-auto mb-8 flex items-center justify-center font-gaming text-4xl font-bold text-slate-950">
                KFV
              </div>
              <h2 className="font-gaming text-3xl font-bold mb-2">ADMIN LOGIN</h2>
              <p className="text-slate-500 mb-8 text-sm">Secure access for KFV administrators only</p>
              
              <form onSubmit={handleAdminLogin} className="space-y-6">
                <input 
                  type="password" 
                  placeholder="Enter Passcode"
                  value={adminPass}
                  onChange={(e) => setAdminPass(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-6 py-4 focus:outline-none focus:border-cyan-500 text-center tracking-widest"
                />
                <button 
                  type="submit"
                  className="w-full py-4 bg-cyan-500 text-slate-950 font-bold rounded-xl hover:bg-cyan-400 transition-all shadow-lg"
                >
                  AUTHORIZE ACCESS
                </button>
              </form>
              <button 
                onClick={goToHome}
                className="mt-6 text-slate-500 text-sm hover:text-white transition-colors"
              >
                Back to Website
              </button>
            </div>
          </div>
        )}

        {currentPage === 'admin' && (
          <Admin onLogout={handleAdminLogout} />
        )}

        {currentPage === 'success' && lastOrder && (
          <div className="max-w-2xl mx-auto py-32 px-4 text-center">
            <div className="w-24 h-24 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto mb-8 border border-green-500/20">
              <CheckCircle2 size={48} />
            </div>
            <h1 className="font-gaming text-4xl md:text-5xl font-bold text-white mb-4 uppercase tracking-tight">ORDER RECEIVED!</h1>
            <p className="text-slate-400 text-lg mb-10">
              Your order <span className="text-white font-bold">#{lastOrder.id}</span> is being processed. 
              Usually it takes 5-10 minutes.
            </p>
            
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 mb-10 text-left">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">ORDER SUMMARY</h3>
              <div className="grid grid-cols-2 gap-y-4 text-sm">
                <span className="text-slate-400">Game:</span>
                <span className="text-white font-bold text-right">{lastOrder.gameName}</span>
                <span className="text-slate-400">Product:</span>
                <span className="text-white font-bold text-right">{lastOrder.productName}</span>
                <span className="text-slate-400">User ID:</span>
                <span className="text-white font-bold text-right">{lastOrder.userId} {lastOrder.zoneId ? `(${lastOrder.zoneId})` : ''}</span>
                <span className="text-slate-400">Amount Paid:</span>
                <span className="text-cyan-400 font-bold text-right">৳ {lastOrder.amount}</span>
                <span className="text-slate-400">Method:</span>
                <span className="text-white font-bold text-right uppercase">{lastOrder.paymentMethod}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 justify-center">
              <button 
                onClick={goToHome}
                className="px-8 py-4 bg-cyan-500 text-slate-950 font-bold rounded-xl hover:bg-cyan-400 transition-all flex items-center gap-2"
              >
                <ShoppingBag size={20} />
                Continue Shopping
              </button>
              <button 
                onClick={goToHistory}
                className="px-8 py-4 bg-slate-900 text-white font-bold rounded-xl border border-slate-800 hover:border-slate-700 transition-all"
              >
                View History
              </button>
            </div>
          </div>
        )}
      </main>

      {currentPage !== 'admin' && <Footer onAdminTrigger={handleAdminTrigger} />}
    </div>
  );
};

export default App;
