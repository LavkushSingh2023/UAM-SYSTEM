import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/api';
import toast from 'react-hot-toast';
import {jwtDecode} from 'jwt-decode';

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const { username, password } = form;
    if (!username || !password) {
      toast.error('Please fill all fields');
      return;
    }
    setLoading(true);
    try {
      const res = await login({ username, password });
      const token = res.data.token;
      localStorage.setItem('token', token);          
      const { role } = jwtDecode(token);            
      toast.success('Login successful!');
      if (role === 'Admin') navigate('/create-software');
      else if (role === 'Employee') navigate('/request-access');
      else if (role === 'Manager') navigate('/pending-requests');
      else navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 text-black">
      <form onSubmit={handleSubmit} className="p-6 bg-white rounded shadow-md w-full max-w-sm">
        <h2 className="text-xl font-bold mb-4">Login</h2>
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
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full mb-2 p-2 border rounded"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className={`w-full mt-4 p-2 bg-blue-500 text-white rounded ${loading ? 'opacity-50' : ''}`}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
        <p className="mt-4 text-center">
          Don't have an account? <a href="/signup" className="text-blue-500">Sign up</a>
        </p>
      </form>
    </div>
  );
};

export default Login;
