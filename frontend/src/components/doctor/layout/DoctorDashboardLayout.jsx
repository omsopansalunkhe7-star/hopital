import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const DoctorDashboardLayout = () => {
  const navigation = [
    { name: 'Dashboard', href: '/doctor/dashboard' },
    { name: 'Appointments', href: '/doctor/appointments' },
    { name: 'Patients', href: '/doctor/patients' },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-64 bg-white shadow-md">
        <div className="p-4">
          <h2 className="text-xl font-bold">Doctor's Panel</h2>
        </div>
        <nav className="mt-5">
          <ul>
            {navigation.map((item) => (
              <li key={item.name}>
                <NavLink
                  to={item.href}
                  className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200"
                  activeClassName="bg-gray-200"
                >
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="flex-1 p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default DoctorDashboardLayout;