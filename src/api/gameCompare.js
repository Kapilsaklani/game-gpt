// Fetch basic info for multiple games from RAWG API
export async function fetchGamesComparison(gameNames) {
  const apiKey = "82f9e3d47f5a4fc58029006cc7b43b8d"; // Replace with your RAWG API key
  const results = await Promise.all(
    gameNames.map(async (name) => {
      // 1. Search for the game to get the ID
      const resp = await fetch(
        `https://api.rawg.io/api/games?key=${apiKey}&search=${encodeURIComponent(name)}&page_size=1`
      );
      if (!resp.ok) return null;
      const data = await resp.json();
      const game = data.results?.[0];
      if (!game) return null;

      // 2. Fetch full details using the ID
      const detailsResp = await fetch(
        `https://api.rawg.io/api/games/${game.id}?key=${apiKey}`
      );
      if (!detailsResp.ok) return null;
      const details = await detailsResp.json();

      return {
        id: game.id,
        name: game.name,
        background_image: game.background_image,
        rating: game.rating,
        released: game.released,
        platforms: game.platforms?.map(p => p.platform.name),
        price: null,
        description: details.description_raw || details.description || "No description available."
      };
    })
  );
  return results.filter(Boolean);
}
