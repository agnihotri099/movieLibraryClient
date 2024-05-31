import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const { email, password } = formData;
  const navigate = useNavigate();

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://movielibrarybackend.onrender.com/api/auth/login', formData);
      localStorage.setItem('token', res.data.token);
      navigate('/');
    } catch (error) {
      if (error.response.status === 400 || error.response.status === 401) {
        setError(error.response.data.msg);
      } else {
        console.error(error.response.data);
      }
    }
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold text-center mt-10">Login</h1>
      {error && <div className="text-red-500 mt-4 text-center">{error}</div>}
      <form className="max-w-lg mx-auto mt-10" onSubmit={onSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={onChange}
            className="w-full px-4 py-2 border rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={onChange}
            className="w-full px-4 py-2 border rounded-md"
            required
          />
        </div>
        <button className="w-full bg-blue-500 text-white py-2 rounded-md" type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
