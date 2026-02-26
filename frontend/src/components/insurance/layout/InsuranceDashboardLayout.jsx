import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';

const InsuranceDashboardLayout = () => {
  const navigate = useNavigate();
  const companyName = localStorage.getItem('name') || 'Insurance Company';

  const navigation = [
    { name: 'Dashboard', href: '/insurance/dashboard' },
    { name: 'Claims', href: '/insurance/claims' },
    { name: 'Patients', href: '/insurance/patients' },
    { name: 'Profile', href: '/insurance/profile' },
    { name: 'Documents', href: '/insurance/documents' },
  ];

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-6 border-b-2 border-indigo-500">
          <h2 className="text-2xl font-bold text-indigo-600">Insurance Portal</h2>
          <p className="text-sm text-gray-600 mt-2">{companyName}</p>
        </div>
        <nav className="mt-5">
          <ul className="space-y-2 px-4">
            {navigation.map((item) => (
              <li key={item.name}>
                <NavLink
                  to={item.href}
                  className={({ isActive }) =>
                    `flex items-center px-4 py-3 rounded-lg transition ${
                      isActive
                        ? 'bg-indigo-500 text-white font-semibold'
                        : 'text-gray-700 hover:bg-indigo-100'
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <div className="absolute bottom-6 left-4 right-4">
          <button
            onClick={handleLogout}
            className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default InsuranceDashboardLayout;
