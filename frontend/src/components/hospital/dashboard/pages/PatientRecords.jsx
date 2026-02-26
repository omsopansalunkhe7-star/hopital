import React from 'react';
import { motion } from 'framer-motion';

const PatientRecords = () => {
  const patients = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      age: 45,
      blood: 'O+',
      phone: '555-0123',
      medicalHistory: 'Hypertension, Diabetes',
      lastVisit: '2024-02-20',
      status: 'Active',
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      age: 32,
      blood: 'B+',
      phone: '555-0456',
      medicalHistory: 'Asthma',
      lastVisit: '2024-02-25',
      status: 'Active',
    },
    {
      id: 3,
      name: 'Mike Johnson',
      email: 'mike@example.com',
      age: 58,
      blood: 'A+',
      phone: '555-0789',
      medicalHistory: 'Heart Disease',
      lastVisit: '2024-02-10',
      status: 'Active',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Patient Records</h1>
        <p className="text-gray-600 mt-2">Manage and view patient medical records</p>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b-2 border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Patient Name</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Email</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Age</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Blood Type</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Medical History</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Last Visit</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {patients.map((patient, idx) => (
              <motion.tr
                key={patient.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="hover:bg-gray-50 transition"
              >
                <td className="px-6 py-4 text-gray-800 font-semibold">{patient.name}</td>
                <td className="px-6 py-4 text-gray-600">{patient.email}</td>
                <td className="px-6 py-4 text-gray-600">{patient.age}</td>
                <td className="px-6 py-4 text-gray-600">{patient.blood}</td>
                <td className="px-6 py-4 text-gray-600">{patient.medicalHistory}</td>
                <td className="px-6 py-4 text-gray-600">📅 {patient.lastVisit}</td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                    {patient.status}
                  </span>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PatientRecords;
