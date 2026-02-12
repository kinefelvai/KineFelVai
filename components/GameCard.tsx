
import React from 'react';
import { Game } from '../types';
import { ChevronRight } from 'lucide-react';

interface GameCardProps {
  game: Game;
  onClick: (game: Game) => void;
}

const GameCard: React.FC<GameCardProps> = ({ game, onClick }) => {
  return (
    <div 
      onClick={() => onClick(game)}
      className="group relative cursor-pointer overflow-hidden rounded-2xl bg-slate-900 border border-slate-800 hover:border-cyan-500/50 transition-all duration-300 transform hover:-translate-y-2"
    >
      <div className="aspect-[3/4] overflow-hidden">
        <img 
          src={game.image} 
          alt={game.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 grayscale-[30%] group-hover:grayscale-0"
        />
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-90" />
      
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <span className="inline-block px-2 py-1 bg-cyan-500/20 text-cyan-400 text-[10px] font-bold uppercase tracking-widest rounded mb-2">
          {game.category}
        </span>
        <h3 className="font-gaming text-xl font-bold text-white mb-1">{game.name}</h3>
        <div className="flex items-center justify-between">
          <p className="text-slate-400 text-xs line-clamp-1">{game.description}</p>
          <div className="p-2 bg-slate-800 rounded-full text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity translate-x-4 group-hover:translate-x-0">
            <ChevronRight size={16} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameCard;
