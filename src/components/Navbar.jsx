import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, LogIn, UserPlus, LogOut, User } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { totalItems } = useCart();
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 glass py-4 px-6 md:px-12 flex justify-between items-center border-b-blue-500/30">
      <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 via-slate-400 to-pink-500 flex items-center justify-center text-white font-bold text-xl shadow-[0_0_15px_rgba(59,130,246,0.5)]">
          N
        </div>
        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-slate-300 to-pink-400 hidden sm:block">
          Naputriz Gacha Shop
        </span>
      </div>

      <div className="flex items-center gap-6">
        <Link to="/cart" className="relative text-slate-300 hover:text-blue-400 transition-colors group">
          <ShoppingCart className="w-6 h-6" />
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-[0_0_10px_rgba(236,72,153,0.8)] group-hover:scale-110 transition-transform">
              {totalItems}
            </span>
          )}
        </Link>
        <div className="h-6 w-px bg-slate-700 hidden sm:block"></div>

        {isAuthenticated ? (
          <>
            <div className="hidden sm:flex items-center gap-2 text-sm text-slate-300">
              <User className="w-4 h-4 text-blue-400" />
              <span className="font-semibold">{user?.name || user?.username}</span>
            </div>
            <button
              onClick={handleLogout}
              className="hidden sm:flex items-center gap-2 px-4 py-2 bg-slate-800 border border-red-500/50 rounded-full text-sm font-semibold text-red-400 hover:bg-red-500 hover:text-white transition-all"
            >
              <LogOut className="w-4 h-4" /> Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hidden sm:flex items-center gap-2 text-sm font-semibold text-slate-300 hover:text-blue-400 transition-colors">
              <LogIn className="w-4 h-4" /> Login
            </Link>
            <Link to="/register" className="hidden sm:flex items-center gap-2 px-4 py-2 bg-slate-800 border border-pink-500/50 rounded-full text-sm font-semibold text-pink-400 hover:bg-pink-500 hover:text-white transition-all shadow-[0_0_10px_rgba(236,72,153,0.2)] hover:shadow-[0_0_20px_rgba(236,72,153,0.5)]">
              <UserPlus className="w-4 h-4" /> Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
