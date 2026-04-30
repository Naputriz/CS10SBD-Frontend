import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function ItemCard({ item }) {
  const { addToCart } = useCart();


  let colorTheme = "border-slate-600 shadow-slate-500/20";
  let textColor = "text-blue-400";
  let badgeColor = "bg-slate-700 text-slate-300";
  
  if (item.game === 'HSR') {
    colorTheme = "border-blue-500/50 shadow-blue-500/20 hover:border-blue-400";
    textColor = "text-blue-400";
    badgeColor = "bg-blue-500/20 text-blue-300 border border-blue-500/50";
  } else if (item.game === 'Uma') {
    colorTheme = "border-pink-500/50 shadow-pink-500/20 hover:border-pink-400";
    textColor = "text-pink-400";
    badgeColor = "bg-pink-500/20 text-pink-300 border border-pink-500/50";
  } else if (item.game === 'Endfield') {
    colorTheme = "border-slate-400/50 shadow-slate-400/20 hover:border-slate-300";
    textColor = "text-slate-300";
    badgeColor = "bg-slate-500/20 text-slate-200 border border-slate-500/50";
  }

  return (
    <div className={`glass-card rounded-2xl overflow-hidden flex flex-col h-full border-2 ${colorTheme} transition-all duration-300 hover:-translate-y-2`}>
      <div className="relative aspect-square overflow-hidden bg-slate-900 flex items-center justify-center p-4">
        {item.image ? (
          <img src={item.image} alt={item.name} className="w-full h-full object-contain rounded-xl" />
        ) : (
          <div className={`w-3/4 h-3/4 rounded-xl border border-dashed ${colorTheme} flex items-center justify-center bg-slate-800/50`}>
            <span className={`text-4xl font-black opacity-20 ${textColor}`}>{item.game}</span>
          </div>
        )}
        <div className="absolute top-3 left-3">
          <span className={`text-xs font-bold px-2 py-1 rounded-full backdrop-blur-md ${badgeColor}`}>
            {item.game}
          </span>
        </div>
      </div>
      
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-slate-100 mb-1">{item.name}</h3>
        <p className="text-sm text-slate-400 mb-4 line-clamp-2">{item.desc}</p>
        
        <div className="mt-auto flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xs text-slate-500">Price</span>
            <span className={`text-lg font-bold ${textColor}`}>Rp {item.price.toLocaleString('id-ID')}</span>
          </div>
          
          <button 
            onClick={() => addToCart(item)}
            className="w-10 h-10 rounded-full bg-slate-700 hover:bg-slate-600 flex items-center justify-center text-white transition-colors hover:scale-110 active:scale-95 shadow-lg"
            title="Add to Cart"
          >
            <ShoppingCart className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
