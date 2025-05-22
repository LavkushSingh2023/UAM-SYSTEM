import React, { useEffect, useState } from 'react';
import api, { updateRequest } from '../services/api';
import toast from 'react-hot-toast';

const PendingRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loadingIds, setLoadingIds] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await api.get('/requests'); 
        setRequests(res.data);
      } catch (err) {
        toast.error('Failed to load requests');
      }
    };
    fetchRequests();
  }, []);

  const handleApprove = async (id) => {
    setLoadingIds(prev => [...prev, id]);
    try {
      await updateRequest(id, { status: 'Approved' });
      toast.success('Request approved');
      setRequests(prev => prev.filter(r => r.id !== id));
    } catch (err) {
      toast.error(err.response?.data?.message || 'Approval failed');
    } finally {
      setLoadingIds(prev => prev.filter(i => i !== id));
    }
  };

  const handleReject = async (id) => {
    setLoadingIds(prev => [...prev, id]);
    try {
      await updateRequest(id, { status: 'Rejected' });
      toast.success('Request rejected');
      setRequests(prev => prev.filter(r => r.id !== id));
    } catch (err) {
      toast.error(err.response?.data?.message || 'Rejection failed');
    } finally {
      setLoadingIds(prev => prev.filter(i => i !== id));
    }
  };

  return (
    <div className="p-6 bg-gray-100 text-black flex-col flex justify-center items-center min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Pending Requests</h2>
      <ul>
        {requests.length ? requests.map(req => (
          <li key={req.id} className="mb-2 p-4 bg-white rounded shadow">
            <p className="font-bold">Request ID: {req.id}</p>
            <p>{req.text}</p>
            <button
              onClick={() => handleApprove(req.id)}
              disabled={loadingIds.includes(req.id)}
              className={`mt-2 p-2 bg-green-500 text-white rounded ${
                loadingIds.includes(req.id) ? 'opacity-50' : ''
              }`}
            >
              {loadingIds.includes(req.id) ? 'Approving...' : 'Approve'}
            </button>
            <button
              onClick={() => handleReject(req.id)}
              disabled={loadingIds.includes(req.id)}
              className={`ml-4 mt-2 p-2 bg-red-500 text-white rounded ${
                loadingIds.includes(req.id) ? 'opacity-50' : ''
              }`}
            >
              {loadingIds.includes(req.id) ? 'Rejecting...' : 'Reject'}
            </button>
          </li>
        )): "No request exist!"}
      </ul>
    </div>
  );
};

export default PendingRequests;
