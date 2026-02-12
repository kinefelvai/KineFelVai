
import React from 'react';
import { Search, History, LogOut, User as UserIcon } from 'lucide-react';
import { User } from '../types';

interface NavbarProps {
  user: User | null;
  onHomeClick: () => void;
  onLoginClick: () => void;
  onHistoryClick: () => void;
  onLogoutClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ user, onHomeClick, onLoginClick, onHistoryClick, onLogoutClick }) => {
  return (
    <nav className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800 px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={onHomeClick}>
          <div className="w-10 h-10 bg-cyan-500 rounded-lg flex items-center justify-center font-gaming text-2xl font-bold italic text-slate-950">
            KFV
          </div>
          <span className="font-gaming text-2xl font-bold tracking-tight hidden sm:block">
            Kine <span className="text-cyan-400">Fel Vai</span>
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
          <button onClick={onHomeClick} className="hover:text-cyan-400 transition-colors">Home</button>
          <a href="#" className="hover:text-cyan-400 transition-colors">Games</a>
          <button onClick={onHistoryClick} className="hover:text-cyan-400 transition-colors">My History</button>
          <a href="#" className="hover:text-cyan-400 transition-colors">Support</a>
        </div>

        <div className="flex items-center gap-4">
          <button className="p-2 text-slate-400 hover:text-cyan-400 transition-colors">
            <Search size={20} />
          </button>
          
          {user ? (
            <div className="flex items-center gap-3 pl-4 border-l border-slate-800">
              <div className="flex flex-col items-end hidden sm:flex">
                <span className="text-xs font-bold text-white">{user.name}</span>
                <button onClick={onLogoutClick} className="text-[10px] text-red-500 hover:underline">Logout</button>
              </div>
              <img 
                src={user.picture} 
                alt={user.name} 
                className="w-9 h-9 rounded-full border border-slate-700 cursor-pointer"
                onClick={onHistoryClick}
              />
            </div>
          ) : (
            <button 
              onClick={onLoginClick}
              className="flex items-center gap-2 px-5 py-2 rounded-full bg-cyan-500 text-slate-950 text-sm font-bold hover:bg-cyan-400 transition-all"
            >
              <UserIcon size={16} />
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
