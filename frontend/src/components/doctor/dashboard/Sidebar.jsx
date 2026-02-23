import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="w-64 bg-indigo-800 text-white h-screen">
      <div className="p-4">
        <h2 className="text-2xl font-bold">E-Health</h2>
      </div>
      <nav>
        <ul>
          <li className="p-4 hover:bg-indigo-700"><Link to="/doctor/dashboard">Dashboard</Link></li>
          <li className="p-4 hover:bg-indigo-700"><Link to="/doctor/profile">My Profile</Link></li>
          <li className="p-4 hover:bg-indigo-700"><Link to="/doctor/appointments">Appointments</Link></li>
          <li className="p-4 hover:bg-indigo-700"><Link to="/doctor/patients">Patients</Link></li>
          <li className="p-4 hover:bg-indigo-700"><Link to="/doctor/prescriptions">Prescriptions</Link></li>
          <li className="p-4 hover:bg-indigo-700"><Link to="/doctor/records">Medical Records</Link></li>
          <li className="p-4 hover:bg-indigo-700"><Link to="/logout">Logout</Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;