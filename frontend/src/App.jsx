import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Signup from './pages/Signup';
import CreateSoftware from './pages/CreateSoftware';
import RequestAccess from './pages/RequestAccess';
import PendingRequests from './pages/PendingRequests';

function App() {
  return (
    <Router>
      <Navbar />
      <Toaster position="top-right" />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route 
          path="/create-software" 
          element={
            <ProtectedRoute>
              <CreateSoftware />
            </ProtectedRoute>
          }
        />
        <Route 
          path="/request-access" 
          element={
            <ProtectedRoute>
              <RequestAccess />
            </ProtectedRoute>
          }
        />
        <Route 
          path="/pending-requests" 
          element={
            <ProtectedRoute>
              <PendingRequests />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
