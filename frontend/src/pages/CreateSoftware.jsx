import React, { useState } from 'react';
import { createSoftware } from '../services/api';
import toast from 'react-hot-toast';

const CreateSoftware = () => {
  const [form, setForm] = useState({ name: '', description: '', accessLevels: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const { name, description } = form;
    if (!name || !description) {
      toast.error('Please fill all fields');
      return;
    }
    setLoading(true);
    try {
      await createSoftware({
        name,
        description,
        accessLevels: form.accessLevels
          .split(",")
          .map(s => s.trim())
          .filter(Boolean)
      });
      toast.success('Software created');
      setForm({ name: '', description: '' }); 
    } catch (err) {
      toast.error(err.response?.data?.message || 'Creation failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-100 text-black flex-col flex justify-center items-center min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Create Software</h2>
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-md max-w-md">
        <input
          type="text"
          name="name"
          placeholder="Software Name"
          value={form.name}
          onChange={handleChange}
          className="w-full mb-2 p-2 border rounded"
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="w-full mb-2 p-2 border rounded"
          required
        />
        <input
            name="accessLevels"
            placeholder="Access Levels (comma-separated)"
            value={form.accessLevels}
            onChange={e => setForm({ ...form, accessLevels: e.target.value })}
            className="w-full mb-2 p-2 border rounded"
        />
        <button
          type="submit"
          disabled={loading}
          className={`mt-2 p-2 bg-green-500 text-white rounded ${loading ? 'opacity-50' : ''}`}
        >
          {loading ? 'Creating...' : 'Create'}
        </button>
      </form>
    </div>
  );
};

export default CreateSoftware;
