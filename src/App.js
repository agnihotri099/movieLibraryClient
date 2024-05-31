import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import MovieList from './pages/MovieList';
import MovieListDetails from './pages/MovieListDetails';
import Dashboard from './pages/Dashboard';
import MovieListPublicPage from './pages/MovieListPublicPage';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check if the user is logged in
  useEffect(() => {
    const token = localStorage.getItem('token');
    if(token){
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/movie-lists-public/:id" element={<MovieListPublicPage/>} />
        {/* Protected routes */}
        {isLoggedIn ? (
          <>
            <Route path="/movie-lists" element={<MovieList />} />
            <Route path="/movie-lists/:id" element={<MovieListDetails />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </>
        ) : (
          <Route path="*" element={<Navigate to="/" />} />
        )}
      </Routes>
    </Router>
  );
};

export default App;
