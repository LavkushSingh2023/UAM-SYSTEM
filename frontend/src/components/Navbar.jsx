import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getUserRole, logout } from '../utils/auth';

const Navbar = () => {
 const location = useLocation();          
 const navigate = useNavigate();         
  const role = getUserRole();  

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-green-400 p-4 text-white font-bold flex justify-between">
      <div className="flex space-x-4">
        {role === 'Admin' && (
          <Link to="/create-software" className="hover:underline">Create Software</Link>
        )}
        {role === 'Employee' && (
          <Link to="/request-access" className="hover:underline">Request Access</Link>
        )}
        {role === 'Manager' && (
          <Link to="/pending-requests" className="hover:underline">Pending Requests</Link>
        )}
      </div>
      {role && (
        <button onClick={handleLogout} className="hover:underline">
          Logout
        </button>
      )}
    </nav>
  );
};

export default Navbar;
