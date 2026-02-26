import React from 'react';

const HospitalDoctors = () => {
  const doctors = [
    { id: 1, name: 'Dr. John Smith', degree: 'MBBS, MD', department: 'Cardiology', patients: 45 },
    { id: 2, name: 'Dr. Sarah Johnson', degree: 'MBBS', department: 'General Medicine', patients: 38 },
    { id: 3, name: 'Dr. Michael Chen', degree: 'MBBS, MS', department: 'Surgery', patients: 42 },
    { id: 4, name: 'Dr. Emily Rodriguez', degree: 'MBBS', department: 'Dermatology', patients: 35 },
    { id: 5, name: 'Dr. James Wilson', degree: 'MBBS, DM', department: 'Neurology', patients: 28 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Hospital Doctors</h1>
        <p className="text-gray-600 mt-2">Manage hospital doctors and their information</p>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b-2 border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Doctor Name</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Degree</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Department</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Patients</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {doctors.map((doctor) => (
              <tr key={doctor.id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4 text-gray-800 font-semibold">{doctor.name}</td>
                <td className="px-6 py-4 text-gray-600">{doctor.degree}</td>
                <td className="px-6 py-4 text-gray-600">{doctor.department}</td>
                <td className="px-6 py-4 text-gray-600">{doctor.patients}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HospitalDoctors;
