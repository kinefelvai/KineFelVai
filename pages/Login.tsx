
import React from 'react';
import { Chrome, ShieldCheck, Zap } from 'lucide-react';
import { User } from '../types';

interface LoginProps {
  onLoginSuccess: (user: User) => void;
  onBack: () => void;
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess, onBack }) => {
  const handleGoogleLogin = () => {
    // Mocking Google Login Success
    const mockUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name: "Demo Gamer",
      email: "gamer@example.com",
      picture: "https://api.dicebear.com/7.x/avataaars/svg?seed=Gamer"
    };
    onLoginSuccess(mockUser);
  };

  return (
    <div className="max-w-lg mx-auto px-4 py-24 text-center">
      <div className="w-20 h-20 bg-cyan-500 rounded-2xl mx-auto mb-8 flex items-center justify-center font-gaming text-4xl font-bold text-slate-950">
        KFV
      </div>
      <h1 className="font-gaming text-4xl font-bold text-white mb-4">MEMBER ACCESS</h1>
      <p className="text-slate-500 mb-12">Login with your Gmail to place orders and track your history.</p>

      <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800 shadow-2xl space-y-8">
        <button 
          onClick={handleGoogleLogin}
          className="w-full py-4 bg-white text-slate-950 font-bold rounded-xl hover:bg-slate-100 transition-all flex items-center justify-center gap-3 text-lg"
        >
          <Chrome size={24} className="text-red-500" />
          Continue with Google
        </button>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
            <ShieldCheck className="text-cyan-400 mx-auto mb-2" size={24} />
            <p className="text-[10px] uppercase font-bold text-slate-500">Secure Account</p>
          </div>
          <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
            <Zap className="text-cyan-400 mx-auto mb-2" size={24} />
            <p className="text-[10px] uppercase font-bold text-slate-500">Auto-Fill Details</p>
          </div>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed">
          By continuing, you agree to Kine Fel Vai's <a href="#" className="underline">Terms of Service</a> and <a href="#" className="underline">Privacy Policy</a>.
        </p>
      </div>

      <button 
        onClick={onBack}
        className="mt-8 text-slate-500 hover:text-white transition-colors text-sm"
      >
        Cancel & Go Back
      </button>
    </div>
  );
};

export default Login;
