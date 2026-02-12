
import React, { useState } from 'react';
import { Game, Product, Order, User } from '../types';
import { PAYMENT_METHODS } from '../constants';
import { ChevronLeft, Info, CheckCircle2, AlertCircle, LogIn } from 'lucide-react';

interface GameDetailProps {
  game: Game;
  user: User | null;
  onBack: () => void;
  onPlaceOrder: (order: Order) => void;
  onLoginRequired: () => void;
}

const GameDetail: React.FC<GameDetailProps> = ({ game, user, onBack, onPlaceOrder, onLoginRequired }) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [userId, setUserId] = useState('');
  const [zoneId, setZoneId] = useState('');
  const [customerName, setCustomerName] = useState(user?.name || '');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [txnId, setTxnId] = useState('');
  const [paymentNumber, setPaymentNumber] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      onLoginRequired();
      return;
    }
    if (!selectedProduct) return setError('Please select a product.');
    if (!userId) return setError('Please enter your User ID.');
    if (game.requiresZoneId && !zoneId) return setError('Please enter your Zone ID.');
    if (!customerName) return setError('Please enter your name.');
    if (!paymentMethod) return setError('Please select a payment method.');
    if (!txnId) return setError('Please enter the Transaction ID.');
    if (!paymentNumber) return setError('Please enter your payment number.');

    const order: Order = {
      id: 'KFV-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
      userEmail: user.email,
      gameId: game.id,
      gameName: game.name,
      productId: selectedProduct.id,
      productName: selectedProduct.name,
      amount: selectedProduct.price,
      userId,
      zoneId: game.requiresZoneId ? zoneId : undefined,
      customerName,
      paymentMethod,
      paymentNumber,
      transactionId: txnId,
      status: 'Pending',
      createdAt: new Date().toISOString(),
    };

    onPlaceOrder(order);
  };

  return (
    <div className="container mx-auto px-4 py-8 pb-32">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8"
      >
        <ChevronLeft size={20} />
        <span>Back to Store</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left Col: Info & Products */}
        <div className="lg:col-span-2 space-y-12">
          {/* Banner */}
          <div className="relative rounded-3xl overflow-hidden aspect-[3/1] bg-slate-900 border border-slate-800">
            <img 
              src={game.banner} 
              className="w-full h-full object-cover opacity-60"
              alt={game.name}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 p-8 flex flex-col justify-end">
              <h1 className="font-gaming text-4xl font-bold text-white mb-2">{game.name}</h1>
              <p className="text-slate-400 max-w-lg">{game.description}</p>
            </div>
          </div>

          {/* User ID Field */}
          <div className="bg-slate-900/50 p-8 rounded-2xl border border-slate-800">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-cyan-500 text-slate-950 rounded-full flex items-center justify-center font-bold">1</div>
              <h3 className="font-gaming text-xl font-bold">ENTER USER DETAILS</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-400 ml-1">User ID</label>
                <input 
                  type="text" 
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  placeholder="Example: 12345678"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors"
                />
              </div>
              {game.requiresZoneId && (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-400 ml-1">Zone ID</label>
                  <input 
                    type="text" 
                    value={zoneId}
                    onChange={(e) => setZoneId(e.target.value)}
                    placeholder="Example: 1234"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                </div>
              )}
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium text-slate-400 ml-1">Customer Name</label>
                <input 
                  type="text" 
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Your display name"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Product Selection */}
          <div className="bg-slate-900/50 p-8 rounded-2xl border border-slate-800">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-cyan-500 text-slate-950 rounded-full flex items-center justify-center font-bold">2</div>
              <h3 className="font-gaming text-xl font-bold">SELECT PRODUCT</h3>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {game.products.map((product) => (
                <div 
                  key={product.id}
                  onClick={() => setSelectedProduct(product)}
                  className={`relative p-4 rounded-xl border cursor-pointer transition-all ${
                    selectedProduct?.id === product.id 
                      ? 'bg-cyan-500/10 border-cyan-500' 
                      : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  {product.badge && (
                    <span className="absolute -top-2 -right-2 px-2 py-0.5 bg-yellow-500 text-slate-950 text-[10px] font-bold rounded">
                      {product.badge}
                    </span>
                  )}
                  <h4 className="font-bold text-white mb-2">{product.name}</h4>
                  <div className="flex flex-col">
                    <span className="text-cyan-400 font-bold">৳ {product.price}</span>
                    {product.originalPrice && (
                      <span className="text-slate-600 text-xs line-through">৳ {product.originalPrice}</span>
                    )}
                  </div>
                  {selectedProduct?.id === product.id && (
                    <div className="absolute top-2 right-2 text-cyan-400">
                      <CheckCircle2 size={16} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Col: Checkout */}
        <div className="lg:col-span-1">
          <div className="sticky top-28 space-y-6">
            <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800 shadow-xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-cyan-500 text-slate-950 rounded-full flex items-center justify-center font-bold">3</div>
                <h3 className="font-gaming text-xl font-bold">PAYMENT & ORDER</h3>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-3">
                  {PAYMENT_METHODS.map((method) => (
                    <div 
                      key={method.id}
                      onClick={() => setPaymentMethod(method.id)}
                      className={`p-3 rounded-xl border cursor-pointer transition-all flex flex-col items-center gap-2 ${
                        paymentMethod === method.id 
                          ? 'bg-cyan-500/10 border-cyan-500' 
                          : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className={`w-10 h-10 ${method.color} rounded-full flex items-center justify-center font-bold text-[10px]`}>
                        {method.name.charAt(0)}
                      </div>
                      <span className="text-xs font-bold uppercase">{method.name}</span>
                    </div>
                  ))}
                </div>

                {paymentMethod && (
                  <div className="p-4 bg-slate-950 rounded-xl border border-dashed border-slate-700 text-center">
                    <p className="text-xs text-slate-500 mb-1 uppercase font-bold tracking-widest">Send Money To</p>
                    <p className="text-xl font-gaming font-bold text-white tracking-wider">
                      {PAYMENT_METHODS.find(m => m.id === paymentMethod)?.number}
                    </p>
                  </div>
                )}

                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase ml-1 block mb-2">Sender Mobile / Transaction ID</label>
                    <input 
                      type="text" 
                      placeholder="Sender Number"
                      value={paymentNumber}
                      onChange={(e) => setPaymentNumber(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 focus:outline-none focus:border-cyan-500 mb-2"
                    />
                    <input 
                      type="text" 
                      placeholder="Transaction ID (TRXID)"
                      value={txnId}
                      onChange={(e) => setTxnId(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>

                {error && (
                  <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-500 rounded-lg flex items-center gap-2 text-xs">
                    <AlertCircle size={14} />
                    {error}
                  </div>
                )}

                <div className="pt-6 border-t border-slate-800">
                  <div className="flex justify-between mb-4">
                    <span className="text-slate-400">Subtotal</span>
                    <span className="text-white font-bold">৳ {selectedProduct?.price || 0}</span>
                  </div>
                  
                  {user ? (
                    <button 
                      onClick={handleSubmit}
                      className="w-full py-4 bg-cyan-500 text-slate-950 font-bold rounded-xl hover:bg-cyan-400 hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] transition-all transform active:scale-95"
                    >
                      PLACE ORDER
                    </button>
                  ) : (
                    <button 
                      onClick={onLoginRequired}
                      className="w-full py-4 bg-slate-800 text-white font-bold rounded-xl hover:bg-slate-700 transition-all flex items-center justify-center gap-2"
                    >
                      <LogIn size={20} />
                      Login to Order
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameDetail;
