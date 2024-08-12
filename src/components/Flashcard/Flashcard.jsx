/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import ReactCardFlip from 'react-card-flip';

const Flashcard = ({card}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  console.log("card ", card);

  const handleClick = (e) => {
    e.preventDefault();
    setIsFlipped(prevState => !prevState);
  };

useEffect(()=>{
    setIsFlipped(false);
},[card]);
return (
    <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical">
      {/* Front of the card */}
      <div
        onClick={handleClick}
        className="w-64 h-96 bg-gradient-to-br from-blue-400 to-purple-500 shadow-lg rounded-lg flex flex-col items-center justify-center cursor-pointer transform transition duration-300 hover:scale-105"
      >
        <div className="text-white text-2xl font-bold mb-4">
          {card?.title}
        </div>
        <p className="text-white text-sm">Click to flip</p>
      </div>

      {/* Back of the card */}
      <div
        onClick={handleClick}
        className="w-64 h-96 bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg rounded-lg flex flex-col items-center justify-center cursor-pointer transform transition duration-300 hover:scale-105"
      >
        <div className="text-white text-lg px-4 text-center">
          {card?.contents}
        </div>
        <p className="text-white text-sm mt-4">Click to flip back</p>
      </div>
    </ReactCardFlip>
  );
};

export default Flashcard;