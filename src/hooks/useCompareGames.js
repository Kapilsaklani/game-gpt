import { useState } from "react";
import { fetchGamesComparison } from "../api/gameCompare";

export default function useCompareGames() {
  const [loading, setLoading] = useState(false);
  const [games, setGames] = useState([]);
  const [error, setError] = useState(null);

  // Accepts array of game names
  async function compareGames(gameNames) {
    setLoading(true);
    setError(null);
    try {
      const results = await fetchGamesComparison(gameNames);
      setGames(results);
    } catch (e) {
      setError("Failed to fetch game comparison.");
      setGames([]);
    } finally {
      setLoading(false);
    }
  }

  return { games, loading, error, compareGames };
}
