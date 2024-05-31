import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Authentication token not found');
        }
        const res = await axios.get('https://movielibrarybackend.onrender.com/api/auth/profile', {
          headers: {
            'x-auth-token': token,
          },
        });
        setUserData(res.data);
      } catch (error) {
        console.error(error.message);
        setError('Failed to fetch user data');
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold text-center mt-10">Dashboard</h1>
      {error && <div className="text-red-500 mt-4 text-center">{error}</div>}
      {userData && (
        <div className="mt-8 p-8 bg-white shadow-md rounded-lg">
          <div className="flex flex-col items-center">
            {userData.profilePicture && (
              <img src={userData.profilePicture} alt="Profile" className="rounded-full w-24 h-24 mb-4" />
            )}
            <p className="text-lg font-semibold">{userData.name}</p>
            <p className="text-gray-600 font-semibold">{userData.email}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
