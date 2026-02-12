
import React from 'react';
import { Order } from '../types';
import { ChevronLeft, Package, Clock, CheckCircle, XCircle } from 'lucide-react';

interface OrderHistoryProps {
  orders: Order[];
  onBack: () => void;
}

const OrderHistory: React.FC<OrderHistoryProps> = ({ orders, onBack }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8"
      >
        <ChevronLeft size={20} />
        <span>Back to Store</span>
      </button>

      <div className="mb-10">
        <h1 className="font-gaming text-4xl font-bold text-white mb-2">MY ORDER HISTORY</h1>
        <p className="text-slate-500">Track and view all your previous game top-ups.</p>
      </div>

      <div className="space-y-4">
        {orders.length > 0 ? (
          orders.map((order) => (
            <div key={order.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition-all">
              <div className="flex flex-col md:flex-row justify-between gap-6">
                <div className="flex gap-5">
                  <div className="w-16 h-16 bg-slate-800 rounded-xl flex items-center justify-center font-gaming text-2xl font-bold text-cyan-500 shrink-0">
                    {order.gameName.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-white">{order.gameName}</h3>
                      <span className="text-xs text-slate-500">• {order.id}</span>
                    </div>
                    <p className="text-sm text-cyan-400 font-medium mb-2">{order.productName}</p>
                    <div className="flex flex-wrap gap-4 text-xs text-slate-500">
                      <span className="flex items-center gap-1"><Package size={14}/> ID: {order.userId}</span>
                      <span className="flex items-center gap-1"><Clock size={14}/> {new Date(order.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-end justify-between">
                  <span className="text-lg font-bold text-white">৳ {order.amount}</span>
                  <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold ${
                    order.status === 'Completed' ? 'bg-green-500/10 text-green-500' :
                    order.status === 'Cancelled' ? 'bg-red-500/10 text-red-500' :
                    'bg-yellow-500/10 text-yellow-500'
                  }`}>
                    {order.status === 'Completed' && <CheckCircle size={14} />}
                    {order.status === 'Cancelled' && <XCircle size={14} />}
                    {order.status === 'Pending' && <Clock size={14} className="animate-pulse" />}
                    {order.status.toUpperCase()}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-24 bg-slate-900/50 rounded-3xl border border-dashed border-slate-800">
            <Package className="mx-auto text-slate-700 mb-4" size={48} />
            <p className="text-slate-500">You haven't placed any orders yet.</p>
            <button 
              onClick={onBack}
              className="mt-6 text-cyan-400 font-bold hover:underline"
            >
              Start Shopping
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderHistory;
