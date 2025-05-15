import React, { useState } from "react";

const FEEDBACK_KEY = "gamebot_feedback_ratings";

export default function FeedbackLoop() {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [feedbacks, setFeedbacks] = useState([]);

  // Load feedbacks from localStorage
  React.useEffect(() => {
    let ratings = [];
    try {
      ratings = JSON.parse(localStorage.getItem(FEEDBACK_KEY)) || [];
    } catch (e) {}
    setFeedbacks(ratings);
  }, [submitted]);

  function handleRate(star) {
    setRating(star);
  }

  function handleSubmit() {
    let ratings = [];
    try {
      ratings = JSON.parse(localStorage.getItem(FEEDBACK_KEY)) || [];
    } catch (e) {}
    ratings.push({ rating, comment, date: new Date().toISOString() });
    localStorage.setItem(FEEDBACK_KEY, JSON.stringify(ratings));
    setFeedbacks(ratings);
    setSubmitted(true);
  }

  // Calculate average rating
  const avgRating = feedbacks.length ? (feedbacks.reduce((sum, f) => sum + (f.rating || 0), 0) / feedbacks.length).toFixed(2) : null;

  return (
    <div className="flex flex-col items-center py-8 mt-12 border-t border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-[#181b2a] rounded-lg">
      <h3 className="text-lg font-bold mb-2 text-blue-700 dark:text-blue-300">How helpful were these recommendations?</h3>

      <div className="flex gap-1 mb-2">
        {[1,2,3,4,5].map(star => (
          <button
            key={star}
            className={`text-3xl transition-colors ${star <= rating ? 'text-yellow-400' : 'text-gray-400'}`}
            onClick={() => handleRate(star)}
            aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
            disabled={submitted}
            type="button"
          >
            ★
          </button>
        ))}
      </div>
      <textarea
        className="w-full max-w-md min-h-[60px] rounded border border-blue-200 dark:border-blue-700 px-3 py-2 mb-2 text-gray-800 dark:text-blue-100 bg-white dark:bg-[#23263a]"
        placeholder="Any comments or suggestions? (optional)"
        value={comment}
        onChange={e => setComment(e.target.value)}
        disabled={submitted}
      />
      <button
        className="mt-2 px-6 py-2 bg-blue-700 hover:bg-blue-900 text-white font-bold rounded shadow disabled:opacity-50"
        onClick={handleSubmit}
        disabled={submitted || rating === 0}
        type="button"
      >
        {submitted ? "Thank you!" : "Submit Feedback"}
      </button>
      {submitted && (
        <div className="mt-2 text-green-600 dark:text-green-400 font-semibold">Your feedback helps improve recommendations!</div>
      )}

    </div>
  );
}

