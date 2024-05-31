
import React from 'react';

const MovieList = ({ list }) => (
  <div className="p-4 border rounded-md shadow-md">
    <h2 className="text-xl font-bold">{list.name}</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
      {list.movies.map((movie) => (
        <div key={movie.imdbID} className="flex flex-col items-center">
          <img src={movie.Poster} alt={movie.Title} className="w-full h-auto mb-2" />
          <div>
            <p className="font-bold">{movie.Title}</p>
            <p className="text-sm text-gray-600">{movie.Year}</p>
          </div>
        </div>
      ))}
    </div>
   
  </div>
);

export default MovieList;
