
import React from 'react';
import { Game, Review } from '../types';
import GameCard from '../components/GameCard';
import { REVIEWS } from '../constants';
// Added missing PhoneCall and Send to the icon imports
import { Zap, ShieldCheck, Heart, CircleDollarSign, Star, Quote, PhoneCall, Send } from 'lucide-react';

interface HomeProps {
  games: Game[];
  onGameSelect: (game: Game) => void;
}

const Home: React.FC<HomeProps> = ({ games, onGameSelect }) => {
  return (
    <div className="pb-20">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://picsum.photos/seed/gaming-hero/1920/1080" 
            className="w-full h-full object-cover opacity-20"
            alt="Hero BG"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-bold mb-6 animate-pulse">
              <Zap size={14} />
              <span>OVER 50,000+ COMPLETED ORDERS</span>
            </div>
            <h1 className="font-gaming text-5xl md:text-7xl font-bold text-white leading-tight mb-6">
              Instant & <span className="text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]">Reliable</span> <br /> 
              Game Top-Up
            </h1>
            <p className="text-slate-400 text-lg md:text-xl mb-10 max-w-lg leading-relaxed">
              Experience the fastest top-up service in Bangladesh with the most competitive prices. Safe, secure, and professional.
            </p>
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={() => document.getElementById('games')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 bg-cyan-500 text-slate-950 font-bold rounded-xl hover:bg-cyan-400 hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] transition-all transform hover:-translate-y-1"
              >
                Shop Now
              </button>
              <button className="px-8 py-4 bg-slate-900 text-white font-bold rounded-xl border border-slate-800 hover:border-slate-700 transition-all">
                Track Order
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Games */}
      <section id="games" className="container mx-auto px-4 py-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <h2 className="font-gaming text-4xl font-bold text-white mb-2">Featured Games</h2>
            <p className="text-slate-500">Pick your favorite game and top-up instantly</p>
          </div>
          <div className="flex gap-2">
            <span className="px-4 py-2 rounded-full bg-slate-900 border border-slate-800 text-xs font-bold text-slate-400 cursor-pointer hover:bg-slate-800">Mobile</span>
            <span className="px-4 py-2 rounded-full bg-slate-900 border border-slate-800 text-xs font-bold text-slate-400 cursor-pointer hover:bg-slate-800">PC</span>
            <span className="px-4 py-2 rounded-full bg-slate-900 border border-slate-800 text-xs font-bold text-slate-400 cursor-pointer hover:bg-slate-800">Console</span>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {games.map(game => (
            <GameCard key={game.id} game={game} onClick={onGameSelect} />
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-slate-900/50 py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-gaming text-4xl font-bold text-white mb-4">Why Choose KFV?</h2>
            <div className="w-20 h-1.5 bg-cyan-500 mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="bg-slate-950 p-8 rounded-2xl border border-slate-800 text-center hover:border-cyan-500/50 transition-colors">
              <div className="w-16 h-16 bg-cyan-500/10 text-cyan-400 rounded-full flex items-center justify-center mx-auto mb-6">
                <Zap size={32} />
              </div>
              <h3 className="font-gaming text-xl font-bold mb-3">Instant Delivery</h3>
              <p className="text-slate-500 text-sm">Most orders are completed within 5-10 minutes of payment confirmation.</p>
            </div>
            
            <div className="bg-slate-950 p-8 rounded-2xl border border-slate-800 text-center hover:border-cyan-500/50 transition-colors">
              <div className="w-16 h-16 bg-cyan-500/10 text-cyan-400 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShieldCheck size={32} />
              </div>
              <h3 className="font-gaming text-xl font-bold mb-3">100% Secure</h3>
              <p className="text-slate-500 text-sm">Your data and account information are encrypted and never shared.</p>
            </div>

            <div className="bg-slate-950 p-8 rounded-2xl border border-slate-800 text-center hover:border-cyan-500/50 transition-colors">
              <div className="w-16 h-16 bg-cyan-500/10 text-cyan-400 rounded-full flex items-center justify-center mx-auto mb-6">
                <CircleDollarSign size={32} />
              </div>
              <h3 className="font-gaming text-xl font-bold mb-3">Best Prices</h3>
              <p className="text-slate-500 text-sm">We offer the cheapest rates in Bangladesh without compromising quality.</p>
            </div>

            <div className="bg-slate-950 p-8 rounded-2xl border border-slate-800 text-center hover:border-cyan-500/50 transition-colors">
              <div className="w-16 h-16 bg-cyan-500/10 text-cyan-400 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart size={32} />
              </div>
              <h3 className="font-gaming text-xl font-bold mb-3">Trusted Service</h3>
              <p className="text-slate-500 text-sm">Join thousands of happy gamers who trust KFV for their daily top-ups.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="container mx-auto px-4 py-24">
        <div className="flex items-center justify-between mb-12">
          <h2 className="font-gaming text-4xl font-bold text-white">Gamers Talk</h2>
          <div className="flex items-center gap-1 text-yellow-400">
            <Star size={20} fill="currentColor" />
            <Star size={20} fill="currentColor" />
            <Star size={20} fill="currentColor" />
            <Star size={20} fill="currentColor" />
            <Star size={20} fill="currentColor" />
            <span className="text-white font-bold ml-2">4.9/5</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {REVIEWS.map((review) => (
            <div key={review.id} className="bg-slate-900 p-8 rounded-2xl border border-slate-800 relative">
              <Quote className="absolute top-6 right-6 text-slate-800" size={40} />
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} className={i < review.rating ? 'text-yellow-500' : 'text-slate-700'} fill={i < review.rating ? 'currentColor' : 'none'} />
                ))}
              </div>
              <p className="text-slate-300 italic mb-6 leading-relaxed">"{review.comment}"</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center font-bold text-cyan-400">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">{review.name}</h4>
                  <p className="text-slate-500 text-xs">{review.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Floating Buttons */}
      <div className="fixed bottom-8 right-8 z-40 flex flex-col gap-4">
        <a href="#" className="w-14 h-14 bg-green-500 text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
          <PhoneCall size={28} />
        </a>
        <a href="#" className="w-14 h-14 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
          <Send size={28} />
        </a>
      </div>
    </div>
  );
};

export default Home;