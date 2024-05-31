

import React, { useState, useEffect } from "react";
import axios from "axios";
import MovieCard from "../components/MovieCard";
import MovieList from "../components/MovieList";
import MovieListPublic from "../components/MovieListPublic";

const Home = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [lists, setLists] = useState([]);
  const [publicLists, setPublicLists] = useState([]);
  const [selectedList, setSelectedList] = useState("");
  const [error, setError] = useState("");
  const isLoggedIn = !!localStorage.getItem("token"); // Check if user is logged in
  // console.log(movies);
  console.log("public list" , publicLists);

  const onChange = (e) => setQuery(e.target.value);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(
        `https://movielibrarybackend.onrender.com/api/movies/search?query=${query}`
      );
      setMovies(res.data.Search);
    } catch (error) {
      console.error(error.response.data);
    }
  };

  const fetchLists = async () => {
    try {
      const res = await axios.get("https://movielibrarybackend.onrender.com/api/movies/lists", {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      });
      setLists(res.data);
    } catch (error) {
      console.error(error.response.data);
    }
  };

  useEffect(() => {
    if(isLoggedIn){
      fetchLists();
    }
    
  }, [isLoggedIn]);

  useEffect(() => {
    const fetchPublicLists = async () => {
      try {
        const res = await axios.get(
          "https://movielibrarybackend.onrender.com/api/movies/public-lists"
        );
        setPublicLists(res.data);
      } catch (error) {
        console.error(error.response.data);
      }
    };

    fetchPublicLists();
  }, []);

  const addMovieToList = async (movie) => {
    if (!selectedList) {
      setError("Please select a list to add the movie to.");
      return;
    }
    try {
      const res = await axios.put(
        `https://movielibrarybackend.onrender.com/api/movies/lists/${selectedList}`,
        { movie },
        {
          headers: {
            "x-auth-token": localStorage.getItem("token"),
          },
        }
      );
      setLists(
        lists.map((list) => (list._id === res.data._id ? res.data : list))
      );
      setError("");
    } catch (error) {
      console.error(error.response.data);
      if (error.response.data.msg === "Movie already exists in the list") {
        setError("This movie is already in the selected list.");
      } else {
        setError("Failed to add movie to the list.");
      }
    }
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold text-center mt-10">Search Movies</h1>
      <form className="max-w-lg mx-auto mt-10" onSubmit={onSubmit}>
        <div className="mb-4">
          <input
            type="text"
            value={query}
            onChange={onChange}
            className="w-full px-4 py-2 border rounded-md"
            placeholder="Search for movies..."
            required
          />
        </div>
        <button
          className="w-full bg-blue-500 text-white py-2 rounded-md"
          type="submit"
        >
          Search
        </button>
      </form>
      <div className="mt-10">
        {isLoggedIn && ( // Render only if user is logged in
          <>
            <label className="block text-gray-700">Select List</label>
            <select
              className="w-full px-4 py-2 border rounded-md mb-4"
              value={selectedList}
              onChange={(e) => setSelectedList(e.target.value)}
            >
              <option value="">Choose a list</option>
              {lists.map((list) => (
                <option key={list._id} value={list._id}>
                  {list.name}
                </option>
              ))}
            </select>
          </>
        )}
        {error && <div className="text-red-500 mt-4 text-center">{error}</div>}
      </div>
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {movies &&
          movies.map((movie) => (
            <MovieCard
              key={movie.imdbID}
              movie={movie}
              showAddButton={isLoggedIn}
              addMovieToList={addMovieToList}
            />
          ))}
      </div>
      <div className="mt-10">
        <h2 className="text-2xl font-bold">
          {isLoggedIn ? "Your movie lists" : "Public movie lists"}
        </h2>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {isLoggedIn
            ? lists.map((list) => <MovieList key={list._id} list={list} />)
            : publicLists.map((list) => (
                <MovieListPublic key={list._id} list={list} />
              ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
