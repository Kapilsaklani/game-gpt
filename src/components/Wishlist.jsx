import React, { useState, useEffect } from "react";

const WISHLIST_KEY = "wishlist_games";

export default function Wishlist() {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    // Load wishlist from localStorage
    const stored = localStorage.getItem(WISHLIST_KEY);
    if (stored) setWishlist(JSON.parse(stored));
  }, []);

  const removeFromWishlist = (id) => {
    const updated = wishlist.filter(game => game.id !== id);
    setWishlist(updated);
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(updated));
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-blue-700 dark:text-blue-300">My Wishlist</h2>
      {wishlist.length === 0 ? (
        <div className="text-gray-500 dark:text-gray-300">No games wishlisted yet.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {wishlist.map(game => (
            <div key={game.id} className="bg-white dark:bg-gray-800 rounded-xl shadow p-4 flex flex-col items-center">
              <img src={game.image} alt={game.title} className="w-24 h-24 object-cover rounded mb-2" />
              <h3 className="text-lg font-semibold mb-1 text-center text-gray-900 dark:text-blue-100" style={{textShadow:'0 1px 4px rgba(0,0,0,0.25)'}}> {game.title} </h3>
              <div className="flex items-center mb-2">
                <span className="text-yellow-400 mr-1 text-lg" style={{textShadow:'0 1px 2px #222'}}>★</span>
                <span className="font-bold text-gray-800 dark:text-white text-base">{game.rating}</span>
              </div>
              <button
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm mt-2 shadow"
                onClick={() => removeFromWishlist(game.id)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
