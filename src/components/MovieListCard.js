


import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const MovieListCard = ({ list }) => {

  const navigate = useNavigate();
  const handleDelete = async () => {
    
    try {
      // Make a DELETE request to the backend to delete the list
      await axios.delete(`https://movielibrarybackend.onrender.com/api/movies/lists/${list._id}`, {
        headers: {
          'x-auth-token': localStorage.getItem('token'),
        },
      });
      navigate("/")
      // Call the onDelete function to update the UI
      // onDelete(list._id);
    } catch (error) {
      console.error('Failed to delete list:', error);
    }
  };

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{list.name}</div>
        <p className="text-gray-700 text-base">{list.isPublic ? 'Public' : 'Private'}</p>
        <Link to={`/movie-lists/${list._id}`} className="text-blue-500 hover:text-blue-700 mt-4 inline-block">
          View List
        </Link>
        &nbsp; &nbsp; &nbsp;
        <button  onClick={handleDelete} className="text-red-500 hover:text-red-700 mt-2 inline-block">
          Delete List
        </button>
      </div>
    </div>
  );
};

export default MovieListCard;
