import React from 'react'
import { MovieCard } from './MovieCard'
import { useRef } from 'react';

export const MovieList = ({title, movies}) => {
  const scrollRef = useRef(null);

   const scrollLeft = () => {
     scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
   };

   const scrollRight = () => {
     scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
   };
  
  return (
    movies && (
      <div className="py-4 relative">
        {/* Title */}
        <h1 className="text-2xl font-semibold mb-5 ml-3">{title}</h1>

        {/* Scrollable Container with Buttons */}
        <div className="relative">
          {/* Left Scroll Button */}
          <button
            className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-black bg-opacity-50 text-white p-4 rounded-full hover:bg-opacity-75 "
            onClick={scrollLeft}
          >
            ◀
          </button>

          {/* Scrollable Movie List */}
          <div
            ref={scrollRef}
            className="flex overflow-x-scroll scrollbar-hide space-x-4 px-4"
          >
            {movies.map((movie, index) => (
              <MovieCard key={index} moviePoster={movie?.poster_path} />
            ))}
          </div>

          {/* Right Scroll Button */}
          <button
            className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 bg-black bg-opacity-50 text-white p-4 rounded-full hover:bg-opacity-75"
            onClick={scrollRight}
          >
            ▶
          </button>
        </div>
      </div>
    )
  );
}
