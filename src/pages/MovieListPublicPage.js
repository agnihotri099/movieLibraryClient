import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import MovieCard from '../components/MovieCard';

const MovieListPublicPage = () => {
  const { id } = useParams();
  const [publiclists, setPublicLists] = useState(null);
  const [error, setError] = useState('');
//   console.log(list);
  



  useEffect(() => {
    const fetchPublicLists = async () => {
      try {
        const res = await axios.get(
          `https://movielibrarybackend.onrender.com/api/movies/listsPublic/${id}`
        );
        setPublicLists(res.data);
      } catch (error) {
        console.error(error.response.data);
      }
    };

    fetchPublicLists();
  }, [id]);

  return (
    <div className="container mx-auto">
      {error && <div className="text-red-500 mt-4 text-center">{error}</div>}
      {!publiclists && <div className="text-center mt-4">Loading...</div>}
      {publiclists && (
        <>
          <h1 className="text-3xl font-bold text-center mt-10">{publiclists.name}</h1>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {publiclists.movies.map((movie) => (
              <MovieCard key={movie.imdbID} movie={movie} showAddButton={false} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default MovieListPublicPage;
