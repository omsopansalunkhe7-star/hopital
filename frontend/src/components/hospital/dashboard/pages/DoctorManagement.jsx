import React from 'react';
import { motion } from 'framer-motion';

const DoctorManagement = () => {
  const doctors = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      degree: 'MBBS, MD',
      specialization: 'General Practitioner',
      phone: '555-0123',
      patients: 45,
      status: 'Active',
    },
    {
      id: 2,
      name: 'Dr. Michael Chen',
      degree: 'MBBS, DM',
      specialization: 'Cardiologist',
      phone: '555-0456',
      patients: 32,
      status: 'Active',
    },
    {
      id: 3,
      name: 'Dr. Emily Rodriguez',
      degree: 'MBBS, MS',
      specialization: 'Dermatologist',
      phone: '555-0789',
      patients: 28,
      status: 'Active',
    },
    {
      id: 4,
      name: 'Dr. James Wilson',
      degree: 'MBBS',
      specialization: 'Orthopedist',
      phone: '555-1011',
      patients: 40,
      status: 'On Leave',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Doctor Management</h1>
          <p className="text-gray-600 mt-2">Manage hospital doctors and their information</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
        >
          ➕ Add Doctor
        </motion.button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {doctors.map((doctor, idx) => (
          <motion.div
            key={doctor.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-bold text-gray-800">{doctor.name}</h3>
                <p className="text-sm text-gray-600">{doctor.degree}</p>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  doctor.status === 'Active'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}
              >
                {doctor.status}
              </span>
            </div>

            <div className="space-y-2 border-t pt-4">
              <div>
                <p className="text-sm text-gray-600">Specialization</p>
                <p className="font-semibold text-gray-800">{doctor.specialization}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Phone</p>
                <p className="font-semibold text-gray-800">{doctor.phone}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Active Patients</p>
                <p className="font-semibold text-gray-800">{doctor.patients}</p>
              </div>
            </div>

            <div className="flex gap-2 mt-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="flex-1 px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                ✏️ Edit
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="flex-1 px-3 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
              >
                🗑️ Remove
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default DoctorManagement;
