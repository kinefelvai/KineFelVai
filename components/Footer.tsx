
import React from 'react';
import { Facebook, Twitter, Send, PhoneCall } from 'lucide-react';

interface FooterProps {
  onAdminTrigger?: () => void;
}

const Footer: React.FC<FooterProps> = ({ onAdminTrigger }) => {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-cyan-500 rounded flex items-center justify-center font-gaming text-lg font-bold text-slate-950">
              KFV
            </div>
            <span className="font-gaming text-xl font-bold tracking-tight">
              Kine <span className="text-cyan-400">Fel Vai</span>
            </span>
          </div>
          <p className="text-slate-400 text-sm leading-relaxed">
            The most reliable and fastest gaming top-up service in Bangladesh. We provide instant delivery for MLBB, Free Fire, PUBG and many more games.
          </p>
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center hover:bg-cyan-500 hover:text-slate-950 transition-all">
              <Facebook size={18} />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center hover:bg-cyan-500 hover:text-slate-950 transition-all">
              <Twitter size={18} />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center hover:bg-cyan-500 hover:text-slate-950 transition-all">
              <Send size={18} />
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-gaming text-lg font-bold mb-6 text-white tracking-wide">QUICK LINKS</h4>
          <ul className="space-y-4 text-sm text-slate-400">
            <li><a href="#" className="hover:text-cyan-400 transition-colors">About Us</a></li>
            <li><a href="#" className="hover:text-cyan-400 transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-cyan-400 transition-colors">Terms & Conditions</a></li>
            <li><a href="#" className="hover:text-cyan-400 transition-colors">Refund Policy</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-gaming text-lg font-bold mb-6 text-white tracking-wide">SUPPORT</h4>
          <ul className="space-y-4 text-sm text-slate-400">
            <li><a href="#" className="hover:text-cyan-400 transition-colors">Contact Us</a></li>
            <li><a href="#" className="hover:text-cyan-400 transition-colors">Help Center</a></li>
            <li><a href="#" className="hover:text-cyan-400 transition-colors">How to Buy</a></li>
            <li><a href="#" className="hover:text-cyan-400 transition-colors">Payment Methods</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-gaming text-lg font-bold mb-6 text-white tracking-wide">CONTACT</h4>
          <div className="space-y-4 text-sm text-slate-400">
            <div className="flex items-center gap-3">
              <PhoneCall size={16} className="text-cyan-400" />
              <span>+880 1700 000 000</span>
            </div>
            <div className="flex items-center gap-3">
              <Send size={16} className="text-cyan-400" />
              <span>support@kfv.com</span>
            </div>
            <div className="mt-6 flex items-center gap-3 p-3 bg-slate-900 rounded-lg border border-slate-800">
              <div className="p-2 bg-green-500/10 rounded-full">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase font-bold">Live Support</p>
                <p className="text-white font-medium">WhatsApp: +880 17...</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-16 pt-8 border-t border-slate-900 text-center">
        <p 
          className="text-slate-600 text-xs cursor-default select-none"
          onDoubleClick={onAdminTrigger}
        >
          © 2024 Kine Fel Vai (KFV). All rights reserved. Gaming is a passion, we make it affordable.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
