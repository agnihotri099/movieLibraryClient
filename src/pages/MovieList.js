import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MovieListCard from '../components/MovieListCard';

const MovieList = () => {
  const [name, setName] = useState('');
  const [isPublic, setIsPublic] = useState(false);
  const [movieLists, setMovieLists] = useState([]);

  useEffect(() => {
    const fetchLists = async () => {
      try {
        const res = await axios.get('https://movielibrarybackend.onrender.com/api/movies/lists', {
          headers: {
            'x-auth-token': localStorage.getItem('token'),
          },
        });
        setMovieLists(res.data);
      } catch (error) {
        console.error(error.response.data);
      }
    };

    fetchLists();
  }, []);

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setIsPublic(checked);
    } else {
      setName(value);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const newList = {
      name,
      isPublic,
      movies: [],
    };

    try {
      const res = await axios.post('https://movielibrarybackend.onrender.com/api/movies/lists', newList, {
        headers: {
          'x-auth-token': localStorage.getItem('token'),
        },
      });
      setMovieLists([...movieLists, res.data]);
      setName('');
      setIsPublic(false);
    } catch (error) {
      console.error(error.response.data);
    }
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold text-center mt-10">My Movie Lists</h1>
      <form className="max-w-lg mx-auto mt-10" onSubmit={onSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">List Name</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={onChange}
            className="w-full px-4 py-2 border rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              name="isPublic"
              checked={isPublic}
              onChange={onChange}
              className="form-checkbox"
            />
            <span className="ml-2">Public</span>
          </label>
        </div>
        <button className="w-full bg-blue-500 text-white py-2 rounded-md" type="submit">Create List</button>
      </form>
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {movieLists.map((list) => (
          <MovieListCard key={list._id} list={list} />
        ))}
      </div>
    </div>
  );
};

export default MovieList;
