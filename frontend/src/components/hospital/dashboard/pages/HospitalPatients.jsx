import React from 'react';

const HospitalPatients = () => {
  const patients = [
    { id: 1, name: 'John Doe', age: 45, status: 'Active', admissionDate: '2024-02-01' },
    { id: 2, name: 'Jane Smith', age: 32, status: 'Active', admissionDate: '2024-02-15' },
    { id: 3, name: 'Mike Johnson', age: 58, status: 'Discharged', admissionDate: '2024-01-20' },
    { id: 4, name: 'Sarah Williams', age: 28, status: 'Active', admissionDate: '2024-02-20' },
    { id: 5, name: 'David Brown', age: 65, status: 'Active', admissionDate: '2024-02-10' },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Discharged':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Hospital Patients</h1>
        <p className="text-gray-600 mt-2">View and manage patient records</p>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b-2 border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Patient Name</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Age</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Admission Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {patients.map((patient) => (
              <tr key={patient.id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4 text-gray-800 font-semibold">{patient.name}</td>
                <td className="px-6 py-4 text-gray-600">{patient.age} years</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(patient.status)}`}>
                    {patient.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-600">📅 {patient.admissionDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HospitalPatients;
