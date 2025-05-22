import React, { useState } from 'react';
import { createRequest } from '../services/api';
import toast from 'react-hot-toast';

const RequestAccess = () => {
  const [softwareId,  setSoftwareId]  = useState('');
  const [accessType,  setAccessType]  = useState('Read');
  const [reason,      setReason]      = useState('');
  const [loading,     setLoading]     = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    if (!softwareId || !reason) {
      toast.error('Please enter Software ID and reason');
      return;
    }
    setLoading(true);
    try {
      await createRequest({
        softwareId: Number(softwareId),
        accessType,
        reason
      });
      toast.success('Request submitted');
      setSoftwareId('');
      setAccessType('Read');
      setReason('');
    } catch (err) {
      toast.error(err.response?.data?.error || 'Request failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-black">
      <h2 className="text-2xl font-bold mb-4">Request Access</h2>
      <form onSubmit={handleSubmit}
            className="bg-white p-6 rounded shadow-md w-full max-w-md">
        
        <label className="block mb-1 font-medium">Software ID</label>
        <input
          type="number"
          value={softwareId}
          onChange={e => setSoftwareId(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
          placeholder="Enter software ID"
          required
        />

        <label className="block mb-1 font-medium">Access Type</label>
        <select
          value={accessType}
          onChange={e => setAccessType(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
        >
          <option value="Read">Read</option>
          <option value="Write">Write</option>
          <option value="Admin">Admin</option>
        </select>

        <label className="block mb-1 font-medium">Reason</label>
        <textarea
          value={reason}
          onChange={e => setReason(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
          placeholder="Why do you need access?"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className={`w-full p-2 bg-blue-500 text-white rounded ${
            loading ? 'opacity-50' : ''
          }`}
        >
          {loading ? 'Submitting...' : 'Submit Request'}
        </button>
      </form>
    </div>
  );
};

export default RequestAccess;
