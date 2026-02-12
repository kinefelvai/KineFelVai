
import React, { useState, useEffect } from 'react';
import { storage } from '../store';
import { Order, Game, OrderStatus, User } from '../types';
import { 
  BarChart3, 
  Package, 
  ShoppingCart, 
  Users, 
  LogOut, 
  CheckCircle, 
  XCircle, 
  Clock,
  ArrowRight,
  TrendingUp,
  Search,
  Mail,
  ExternalLink
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';

interface AdminProps {
  onLogout: () => void;
}

const Admin: React.FC<AdminProps> = ({ onLogout }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [games, setGames] = useState<Game[]>([]);
  const [registeredUsers, setRegisteredUsers] = useState<User[]>([]);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'orders' | 'products' | 'users'>('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [userSearchTerm, setUserSearchTerm] = useState('');

  useEffect(() => {
    setOrders(storage.getOrders());
    setGames(storage.getGames());
    setRegisteredUsers(storage.getRegisteredUsers());
  }, []);

  const handleStatusUpdate = (orderId: string, status: OrderStatus) => {
    storage.updateOrderStatus(orderId, status);
    setOrders(storage.getOrders());
  };

  const filteredOrders = orders.filter(o => 
    o.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
    o.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    o.gameName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    o.userEmail.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredUsers = registeredUsers.filter(u => 
    u.name.toLowerCase().includes(userSearchTerm.toLowerCase()) ||
    u.email.toLowerCase().includes(userSearchTerm.toLowerCase())
  );

  const stats = {
    totalRevenue: orders.filter(o => o.status === 'Completed').reduce((acc, curr) => acc + curr.amount, 0),
    totalOrders: orders.length,
    pendingOrders: orders.filter(o => o.status === 'Pending').length,
    completedOrders: orders.filter(o => o.status === 'Completed').length,
    totalUsers: registeredUsers.length,
  };

  const chartData = [
    { name: 'Pending', value: stats.pendingOrders, color: '#94a3b8' },
    { name: 'Completed', value: stats.completedOrders, color: '#22d3ee' },
    { name: 'Cancelled', value: orders.filter(o => o.status === 'Cancelled').length, color: '#ef4444' },
  ];

  return (
    <div className="min-h-screen bg-slate-950 flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-slate-800 p-6 space-y-8 sticky top-0 h-screen overflow-y-auto">
        <div className="flex items-center gap-2 mb-10">
          <div className="w-8 h-8 bg-cyan-500 rounded flex items-center justify-center font-gaming text-lg font-bold text-slate-950">
            KFV
          </div>
          <span className="font-gaming text-xl font-bold">ADMIN PANEL</span>
        </div>

        <nav className="space-y-2">
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'dashboard' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:bg-slate-900'}`}
          >
            <BarChart3 size={20} />
            Dashboard
          </button>
          <button 
            onClick={() => setActiveTab('orders')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'orders' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:bg-slate-900'}`}
          >
            <ShoppingCart size={20} />
            Orders
          </button>
          <button 
            onClick={() => setActiveTab('users')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'users' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:bg-slate-900'}`}
          >
            <Users size={20} />
            Users
          </button>
          <button 
            onClick={() => setActiveTab('products')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'products' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:bg-slate-900'}`}
          >
            <Package size={20} />
            Products
          </button>
        </nav>

        <div className="pt-20">
          <button 
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-all mt-auto"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            <header className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-gaming font-bold">DASHBOARD OVERVIEW</h1>
                <p className="text-slate-500">Managing all KFV traffic and orders.</p>
              </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-cyan-500/10 text-cyan-400 rounded-xl">
                    <TrendingUp size={24} />
                  </div>
                </div>
                <p className="text-slate-500 text-xs uppercase font-bold tracking-widest mb-1">Total Revenue</p>
                <h3 className="text-2xl font-bold">৳ {stats.totalRevenue.toLocaleString()}</h3>
              </div>

              <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-purple-500/10 text-purple-400 rounded-xl">
                    <ShoppingCart size={24} />
                  </div>
                </div>
                <p className="text-slate-500 text-xs uppercase font-bold tracking-widest mb-1">Total Orders</p>
                <h3 className="text-2xl font-bold">{stats.totalOrders}</h3>
              </div>

              <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-blue-500/10 text-blue-400 rounded-xl">
                    <Users size={24} />
                  </div>
                </div>
                <p className="text-slate-500 text-xs uppercase font-bold tracking-widest mb-1">Total Users</p>
                <h3 className="text-2xl font-bold">{stats.totalUsers}</h3>
              </div>

              <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-yellow-500/10 text-yellow-400 rounded-xl">
                    <Clock size={24} />
                  </div>
                </div>
                <p className="text-slate-500 text-xs uppercase font-bold tracking-widest mb-1">Pending Orders</p>
                <h3 className="text-2xl font-bold text-yellow-400">{stats.pendingOrders}</h3>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800">
                <h3 className="font-gaming text-lg font-bold mb-6">ORDER ANALYTICS</h3>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                      <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                      <Tooltip 
                        contentStyle={{backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '12px'}} 
                        itemStyle={{color: '#f8fafc'}}
                      />
                      <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                        {chartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-gaming text-lg font-bold">RECENT ORDERS</h3>
                  <button onClick={() => setActiveTab('orders')} className="text-cyan-400 text-xs font-bold flex items-center gap-1 hover:underline">
                    VIEW ALL <ArrowRight size={14} />
                  </button>
                </div>
                <div className="space-y-4">
                  {orders.slice(0, 5).map(order => (
                    <div key={order.id} className="flex items-center justify-between p-4 bg-slate-950 rounded-xl border border-slate-800">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-slate-800 rounded flex items-center justify-center font-bold text-xs">
                          {order.gameName.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-white">{order.customerName}</p>
                          <p className="text-[10px] text-slate-500">{order.userEmail}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-cyan-400">৳ {order.amount}</p>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                          order.status === 'Completed' ? 'bg-green-500/10 text-green-500' : 
                          order.status === 'Cancelled' ? 'bg-red-500/10 text-red-500' : 'bg-yellow-500/10 text-yellow-500'
                        }`}>
                          {order.status}
                        </span>
                      </div>
                    </div>
                  ))}
                  {orders.length === 0 && (
                    <div className="py-20 text-center text-slate-500 text-sm">No orders yet.</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="space-y-6">
            <header className="flex justify-between items-center">
              <h1 className="text-3xl font-gaming font-bold">MANAGE ORDERS</h1>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                <input 
                  type="text" 
                  placeholder="Search by ID, User, or Email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-cyan-500 w-80"
                />
              </div>
            </header>

            <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-x-auto">
              <table className="w-full text-left min-w-[1000px]">
                <thead>
                  <tr className="bg-slate-800/50 text-slate-400 text-xs font-bold uppercase tracking-widest">
                    <th className="px-6 py-4">Order ID</th>
                    <th className="px-6 py-4">Game / Product</th>
                    <th className="px-6 py-4">Customer</th>
                    <th className="px-6 py-4">User Details</th>
                    <th className="px-6 py-4">Payment</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {filteredOrders.map(order => (
                    <tr key={order.id} className="hover:bg-slate-800/20 transition-colors">
                      <td className="px-6 py-4">
                        <p className="text-xs font-bold text-white mb-1">{order.id}</p>
                        <p className="text-[10px] text-slate-500">{new Date(order.createdAt).toLocaleString()}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm font-bold text-white">{order.gameName}</p>
                        <p className="text-xs text-cyan-400">{order.productName}</p>
                        <p className="text-[10px] text-slate-500">৳ {order.amount}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm font-bold text-white">{order.customerName}</p>
                        <div className="flex items-center gap-1 text-[10px] text-slate-500">
                          <Mail size={10} /> {order.userEmail}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-xs text-slate-400">Game ID: {order.userId}</p>
                        {order.zoneId && <p className="text-xs text-slate-400">Zone: {order.zoneId}</p>}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-bold text-white uppercase">{order.paymentMethod}</span>
                        </div>
                        <p className="text-[10px] text-slate-400">No: {order.paymentNumber}</p>
                        <p className="text-[10px] bg-slate-950 px-2 py-0.5 rounded border border-slate-800 text-slate-500 inline-block mt-1">
                          TXID: {order.transactionId}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                          order.status === 'Completed' ? 'bg-green-500/10 text-green-500' : 
                          order.status === 'Cancelled' ? 'bg-red-500/10 text-red-500' : 'bg-yellow-500/10 text-yellow-500'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-center gap-2">
                          <button 
                            disabled={order.status !== 'Pending'}
                            onClick={() => handleStatusUpdate(order.id, 'Completed')}
                            className="p-2 bg-green-500/10 text-green-500 rounded-lg hover:bg-green-500 hover:text-white transition-all disabled:opacity-20"
                            title="Deliver Order"
                          >
                            <CheckCircle size={18} />
                          </button>
                          <button 
                            disabled={order.status !== 'Pending'}
                            onClick={() => handleStatusUpdate(order.id, 'Cancelled')}
                            className="p-2 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-all disabled:opacity-20"
                            title="Cancel Order"
                          >
                            <XCircle size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="space-y-6">
            <header className="flex justify-between items-center">
              <h1 className="text-3xl font-gaming font-bold">REGISTERED USERS</h1>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                <input 
                  type="text" 
                  placeholder="Search users..."
                  value={userSearchTerm}
                  onChange={(e) => setUserSearchTerm(e.target.value)}
                  className="bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-cyan-500 w-64"
                />
              </div>
            </header>

            <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-800/50 text-slate-400 text-xs font-bold uppercase tracking-widest">
                    <th className="px-6 py-4">User</th>
                    <th className="px-6 py-4">Email</th>
                    <th className="px-6 py-4">Total Orders</th>
                    <th className="px-6 py-4">Spent</th>
                    <th className="px-6 py-4 text-center">History</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {filteredUsers.map(user => {
                    const userOrders = orders.filter(o => o.userEmail === user.email);
                    const spent = userOrders.filter(o => o.status === 'Completed').reduce((acc, curr) => acc + curr.amount, 0);
                    
                    return (
                      <tr key={user.email} className="hover:bg-slate-800/20 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <img src={user.picture} className="w-8 h-8 rounded-full border border-slate-700" alt="" />
                            <span className="text-sm font-bold text-white">{user.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-400">{user.email}</td>
                        <td className="px-6 py-4 text-sm text-white font-bold">{userOrders.length}</td>
                        <td className="px-6 py-4 text-sm text-cyan-400 font-bold">৳ {spent}</td>
                        <td className="px-6 py-4">
                          <div className="flex justify-center">
                            <button 
                              onClick={() => {
                                setActiveTab('orders');
                                setSearchTerm(user.email);
                              }}
                              className="p-2 bg-slate-800 text-slate-400 rounded-lg hover:text-cyan-400 hover:bg-slate-700 transition-all flex items-center gap-2 text-xs font-bold"
                            >
                              <ExternalLink size={14} /> VIEW
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                  {filteredUsers.length === 0 && (
                    <tr>
                      <td colSpan={5} className="px-6 py-20 text-center text-slate-500">No users found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'products' && (
          <div className="space-y-6">
            <header className="flex justify-between items-center">
              <h1 className="text-3xl font-gaming font-bold">GAME PRODUCTS</h1>
              <button className="px-4 py-2 bg-cyan-500 text-slate-950 font-bold rounded-lg text-sm hover:bg-cyan-400 transition-all">
                ADD NEW GAME
              </button>
            </header>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {games.map(game => (
                <div key={game.id} className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden group">
                  <div className="relative h-32">
                    <img src={game.banner} className="w-full h-full object-cover opacity-50" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900" />
                    <div className="absolute bottom-4 left-4 flex items-center gap-3">
                      <img src={game.image} className="w-12 h-12 rounded-lg object-cover border border-slate-700" />
                      <div>
                        <h3 className="font-gaming font-bold">{game.name}</h3>
                        <p className="text-[10px] text-slate-500 uppercase">{game.category}</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 space-y-4">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-500">Variants:</span>
                      <span className="text-white font-bold">{game.products.length} Items</span>
                    </div>
                    <div className="flex gap-2">
                      <button className="flex-1 py-2 bg-slate-800 text-white rounded-lg text-xs font-bold hover:bg-slate-700 transition-all">EDIT</button>
                      <button className="flex-1 py-2 bg-red-500/10 text-red-500 rounded-lg text-xs font-bold hover:bg-red-500 hover:text-white transition-all">DELETE</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Admin;
