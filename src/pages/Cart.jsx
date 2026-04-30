import React from 'react';
import { useCart } from '../context/CartContext';
import { Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, totalPrice } = useCart();

  if (cart.length === 0) {
    return (
      <div className="min-h-screen pt-32 px-6 flex flex-col items-center">
        <div className="glass p-12 rounded-3xl text-center max-w-lg w-full relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-slate-400 to-pink-500"></div>
          <h2 className="text-3xl font-bold mb-4 text-slate-100">Your Cart is Empty</h2>
          <Link to="/" className="px-8 py-3 rounded-full bg-blue-500 text-white font-bold hover:bg-blue-400 transition-colors inline-flex items-center gap-2">
            Start Shopping <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 pb-12 px-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-slate-100">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item) => (
            <div key={item.id} className="glass p-4 rounded-2xl flex flex-col sm:flex-row items-center gap-6 border border-slate-700/50">
              <div className="w-24 h-24 rounded-xl bg-slate-800 flex items-center justify-center border border-slate-700 shrink-0 overflow-hidden">
                {item.image ? (
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity" />
                ) : (
                  <span className="font-bold text-slate-500">{item.game}</span>
                )}
              </div>

              <div className="flex-grow text-center sm:text-left">
                <h3 className="font-bold text-lg text-slate-200">{item.name}</h3>
                <p className="text-blue-400 font-semibold mb-2">Rp {item.price.toLocaleString('id-ID')}</p>
              </div>

              <div className="flex items-center gap-3 bg-slate-800 rounded-full border border-slate-700 p-1 shrink-0">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="w-8 h-8 rounded-full bg-slate-700 hover:bg-slate-600 flex items-center justify-center text-slate-300 transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-6 text-center font-bold">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="w-8 h-8 rounded-full bg-slate-700 hover:bg-slate-600 flex items-center justify-center text-slate-300 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <button
                onClick={() => removeFromCart(item.id)}
                className="w-10 h-10 rounded-full bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white flex items-center justify-center transition-colors shrink-0"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>

        <div className="lg:col-span-1">
          <div className="glass p-6 rounded-3xl border border-slate-700/50 sticky top-28">
            <h3 className="text-xl font-bold mb-6 text-slate-200">Order Summary</h3>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-slate-400">
                <span>Subtotal</span>
                <span>Rp {totalPrice.toLocaleString('id-ID')}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Tax (11%)</span>
                <span>Rp {(totalPrice * 0.11).toLocaleString('id-ID')}</span>
              </div>
              <div className="h-px w-full bg-slate-700 my-4"></div>
              <div className="flex justify-between text-xl font-bold text-slate-100">
                <span>Total</span>
                <span className="text-pink-400">Rp {(totalPrice * 1.11).toLocaleString('id-ID')}</span>
              </div>
            </div>

            <button className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-500 via-slate-500 to-pink-500 text-white font-bold text-lg hover:opacity-90 transition-opacity shadow-[0_0_20px_rgba(59,130,246,0.3)]">
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
