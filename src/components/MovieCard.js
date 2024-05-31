

// export default MovieCard;
import React from 'react';

const MovieCard = ({ movie, showAddButton, addMovieToList }) => {
  // console.log(movie.Year);

  return (
    <div className="p-4 border rounded-md shadow-md">
      <h2 className="text-xl font-bold">{movie.Title}</h2>
      <img src={movie.Poster} alt={movie.Title} className="w-full h-auto" />
      <p>Year: {movie.Year}</p>
      {showAddButton && (
        <button
          className="w-full bg-green-500 text-white py-2 rounded-md mt-4"
          onClick={() => addMovieToList(movie)}
        >
          Add to List
        </button>
      )}
    </div>
  );
};

export default MovieCard;
