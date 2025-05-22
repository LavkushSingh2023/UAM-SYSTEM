import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signup } from '../services/api';
import toast from 'react-hot-toast';

const Signup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const { username, email, password } = form;
    if (!username || !email || !password) {
      toast.error('Please fill all fields');
      return;
    }
    if (password.length < 8) {
      toast.error('Password must be at least 8 characters');
      return;
    }
    setLoading(true);
    try {
      await signup({ username, email, password });
      toast.success('Signup successful! Please login.');
      navigate('/login');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 text-black">
      <form onSubmit={handleSubmit} className="p-6 bg-white rounded shadow-md w-full max-w-sm">
        <h2 className="text-xl font-bold mb-4">Signup</h2>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          className="w-full mb-2 p-2 border rounded"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full mb-2 p-2 border rounded"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password (min 8 chars)"
          value={form.password}
          onChange={handleChange}
          className="w-full mb-2 p-2 border rounded"
          required
          minLength="8"
        />
        <button
          type="submit"
          disabled={loading}
          className={`w-full mt-4 p-2 bg-blue-500 text-white rounded ${loading ? 'opacity-50' : ''}`}
        >
          {loading ? 'Signing up...' : 'Signup'}
        </button>
        <p className="mt-4 text-center">
          Already have an account? <a href="/login" className="text-blue-500">Login</a>
        </p>
      </form>
    </div>
  );
};

export default Signup;
