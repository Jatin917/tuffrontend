import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Flashcard from '../Flashcard/Flashcard';

const Home = () => {
  const [cards, setCards] = useState([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await axios.get("https://tufbackend-dulp.onrender.com/cards");
      setCards(res.data);
    } catch (error) {
      console.error("Error fetching cards:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleNext = () => setIndex(prev => (prev === cards.length - 1 ? 0 : prev + 1));
  const handlePrevious = () => setIndex(prev => (prev === 0 ? cards.length - 1 : prev - 1));

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold text-blue-800 mb-8">Flashcard Study</h1>

      {loading ? (
        <div className="text-xl text-blue-600">Loading cards...</div>
      ) : cards.length > 0 ? (
        <>
          <div className="w-full max-w-2xl mb-8">
            <Flashcard card={cards[index]} />
          </div>

          <div className="flex gap-4">
            <button
              className="px-6 py-2 rounded-full bg-blue-600 text-white font-semibold shadow-lg hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105"
              onClick={handlePrevious}
            >
              Previous
            </button>
            <button
              className="px-6 py-2 rounded-full bg-purple-600 text-white font-semibold shadow-lg hover:bg-purple-700 transition duration-300 ease-in-out transform hover:scale-105"
              onClick={handleNext}
            >
              Next
            </button>
            <button
  className="px-6 py-2 rounded-full bg-blue-600 text-white font-semibold shadow-lg hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105"
  onClick={() => window.location.href = '/admin'}
>
  Go to Admin
</button>
          </div>

          <div className="mt-4 text-blue-800">
            Card {index + 1} of {cards.length}
          </div>
        </>
      ) : (
        <div className="text-xl text-red-600">No cards available.</div>
      )}
    </div>
  );
};

export default Home;