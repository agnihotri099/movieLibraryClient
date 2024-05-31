import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const { name, email, password } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://movielibrarybackend.onrender.com/api/auth/register', formData);
      console.log(res.data);
      navigate('/login');
    } catch (error) {
      if (error.response.status === 400) {
        setError(error.response.data.msg); // Set error message for validation errors
      } else {
        console.error(error.response.data);
      }
    }
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold text-center mt-10">Register</h1>
      {error && <div className="text-red-500 mt-4 flex justify-center">{error}</div>} {/* Display error message */}
      <form className="max-w-lg mx-auto mt-10" onSubmit={onSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
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
        <button className="w-full bg-blue-500 text-white py-2 rounded-md" type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
