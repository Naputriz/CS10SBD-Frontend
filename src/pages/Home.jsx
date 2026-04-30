import React, { useState, useEffect } from 'react';
import ItemCard from '../components/ItemCard';
import { api } from '../api';


import hsrCards from '../assets/AmphoreusSagaOfHeroesCards.webp';
import hsrPlush from '../assets/SparxiePlush.webp';
import hsrFigure from '../assets/SamActionFigure.webp';
import endfieldMat from '../assets/BulletboundJianghuTableMat.jpg';
import endfieldKeychain from '../assets/YvonneKeychain.jpg';
import endfieldPoster from '../assets/ZhuangFangyiPoster.png';
import umaFigure1 from '../assets/OguriCapFigure.jpg.webp';
import umaFigure2 from '../assets/OrfevreFigure.jpg.webp';
import umaFigure3 from '../assets/TamamoCrossFigure.webp';


const itemMeta = {
  'Amphoreus Saga of Heroes Cards': { image: hsrCards, game: 'HSR' },
  'Sparxie Plush': { image: hsrPlush, game: 'HSR' },
  'SAM Action Figure': { image: hsrFigure, game: 'HSR' },
  'Oguri Cap Figure': { image: umaFigure1, game: 'Uma' },
  'Orfevre Figure': { image: umaFigure2, game: 'Uma' },
  'Tamamo Cross Figure': { image: umaFigure3, game: 'Uma' },
  'Bulletbound Jianghu Table Mat': { image: endfieldMat, game: 'Endfield' },
  'Yvonne Keychain': { image: endfieldKeychain, game: 'Endfield' },
  'Zhuang Fangyi Poster': { image: endfieldPoster, game: 'Endfield' },
};

export default function Home() {
  const [filter, setFilter] = useState('All');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const data = await api.getItems();

        const enriched = data.payload.map((item) => {
          const meta = itemMeta[item.name] || {};
          return {
            ...item,
            image: meta.image || null,
            game: meta.game || 'Other',
            desc: `Stock: ${item.stock}`,
          };
        });
        setItems(enriched);
      } catch (err) {
        console.error('Failed to fetch items from backend, using fallback:', err);

        setItems([
          { id: 1, name: "Amphoreus Saga of Heroes Cards", price: 150000, desc: "Official HSR Collectible Cards", game: "HSR", image: hsrCards },
          { id: 2, name: "Sparxie Plush", price: 350000, desc: "Cute and soft Sparxie plushie", game: "HSR", image: hsrPlush },
          { id: 3, name: "SAM Action Figure", price: 1200000, desc: "Highly detailed poseable figure", game: "HSR", image: hsrFigure },
          { id: 4, name: "Oguri Cap Figure", price: 850000, desc: "1/7 Scale Figure of Oguri Cap", game: "Uma", image: umaFigure1 },
          { id: 5, name: "Orfevre Figure", price: 900000, desc: "1/7 Scale Figure of Orfevre", game: "Uma", image: umaFigure2 },
          { id: 6, name: "Tamamo Cross Figure", price: 850000, desc: "1/7 Scale Figure of Tamamo Cross", game: "Uma", image: umaFigure3 },
          { id: 7, name: "Bulletbound Jianghu Table Mat", price: 250000, desc: "High quality desk mat", game: "Endfield", image: endfieldMat },
          { id: 8, name: "Yvonne Keychain", price: 85000, desc: "Acrylic keychain of Yvonne", game: "Endfield", image: endfieldKeychain },
          { id: 9, name: "Zhuang Fangyi Poster", price: 120000, desc: "High quality official poster", game: "Endfield", image: endfieldPoster },
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

  const filteredItems = filter === 'All'
    ? items
    : items.filter(item => item.game === filter);

  return (
    <div className="min-h-screen pt-24 pb-12 px-6 max-w-7xl mx-auto">

      <div className="fixed top-20 left-10 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px] -z-10 pointer-events-none"></div>
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-slate-500/10 rounded-full blur-[100px] -z-10 pointer-events-none"></div>
      <div className="fixed bottom-20 right-10 w-[400px] h-[400px] bg-pink-500/10 rounded-full blur-[100px] -z-10 pointer-events-none"></div>

      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-black mb-4">
          Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-slate-300 to-pink-500">Naputriz Gacha Shop</span>
        </h1>
      </div>


      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {['All', 'HSR', 'Uma', 'Endfield'].map((game) => (
          <button
            key={game}
            onClick={() => setFilter(game)}
            className={`px-6 py-2 rounded-full font-bold transition-all ${filter === game
              ? 'bg-slate-100 text-slate-900 shadow-[0_0_15px_rgba(255,255,255,0.3)]'
              : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-200'
              }`}
          >
            {game === 'HSR' ? 'Honkai: Star Rail' : game === 'Uma' ? 'Uma Musume' : game}
          </button>
        ))}
      </div>


      {loading ? (
        <div className="text-center text-slate-400 py-16">Loading items...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredItems.map(item => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
