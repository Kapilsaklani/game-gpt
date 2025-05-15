import React from "react";

export default function GameCard({ game, onShowMore, onAddToWishlist, onNext, onShowDetails }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 flex flex-col items-center w-60 m-2">
      <div className="w-40 h-40 mb-2 flex items-center justify-center bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden">
        <img
          src={game.image}
          alt={game.title}
          className="w-full h-full object-cover"
          onError={e => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/160?text=No+Image'; }}
        />
      </div>
      <h3 className="text-lg font-semibold text-center mb-1 text-gray-900 dark:text-blue-100" style={{textShadow:'0 1px 4px rgba(0,0,0,0.25)'}}>{game.title}</h3>
      <div className="flex items-center mb-2">
        <span className="text-yellow-400 mr-1 text-lg" style={{textShadow:'0 1px 2px #222'}}>★</span>
        <span className="font-bold text-gray-800 dark:text-white text-base">{game.rating}</span>
      </div>
      <div className="flex gap-2 mt-2">
        <button
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-semibold mt-2 shadow"
          onClick={() => {
            // Add to wishlist in localStorage
            const WISHLIST_KEY = "wishlist_games";
            let wishlist = [];
            try {
              wishlist = JSON.parse(localStorage.getItem(WISHLIST_KEY)) || [];
            } catch (e) {}
            if (!wishlist.find(g => g.id === game.id)) {
              wishlist.push(game);
              localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
              alert("Added to wishlist!");
            } else {
              alert("Already in wishlist");
            }
            if (onAddToWishlist) onAddToWishlist(game);
          }}
        >
          Add to Wishlist
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold mt-2 shadow"
          onClick={() => onShowDetails && onShowDetails(game)}
          type="button"
        >
          Show Details
        </button>
      </div>
    </div>
  );
}
