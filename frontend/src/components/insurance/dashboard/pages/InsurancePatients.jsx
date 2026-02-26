import React from 'react';

const InsurancePatients = () => {
  const patients = [
    { id: 1, name: 'John Doe', age: 45, status: 'Active', policyNumber: 'POL-2020-001' },
    { id: 2, name: 'Jane Smith', age: 32, status: 'Active', policyNumber: 'POL-2021-045' },
    { id: 3, name: 'Mike Johnson', age: 58, status: 'Inactive', policyNumber: 'POL-2019-023' },
    { id: 4, name: 'Sarah Williams', age: 28, status: 'Active', policyNumber: 'POL-2022-056' },
    { id: 5, name: 'David Brown', age: 65, status: 'Active', policyNumber: 'POL-2018-012' },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Inactive':
        return 'bg-gray-100 text-gray-800';
      case 'Expired':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Insured Patients</h1>
        <p className="text-gray-600 mt-2">View and manage insured patient records</p>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b-2 border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Patient Name</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Age</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Policy Number</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {patients.map((patient) => (
              <tr key={patient.id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4 text-gray-800 font-semibold">{patient.name}</td>
                <td className="px-6 py-4 text-gray-600">{patient.age} years</td>
                <td className="px-6 py-4 text-gray-600">{patient.policyNumber}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(patient.status)}`}>
                    {patient.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InsurancePatients;
