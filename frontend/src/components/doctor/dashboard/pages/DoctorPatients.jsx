import React from 'react';

const DoctorPatients = () => {
  // Mock data for patients
  const patients = [
    {
      id: 1,
      name: 'John Doe',
      age: 45,
      status: 'Active',
      lastVisit: '2024-02-20',
    },
    {
      id: 2,
      name: 'Jane Smith',
      age: 32,
      status: 'Active',
      lastVisit: '2024-02-25',
    },
    {
      id: 3,
      name: 'Mike Johnson',
      age: 58,
      status: 'Follow-up',
      lastVisit: '2024-02-10',
    },
    {
      id: 4,
      name: 'Sarah Williams',
      age: 28,
      status: 'Active',
      lastVisit: '2024-02-22',
    },
    {
      id: 5,
      name: 'David Brown',
      age: 65,
      status: 'Follow-up',
      lastVisit: '2024-01-28',
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Follow-up':
        return 'bg-yellow-100 text-yellow-800';
      case 'Inactive':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">My Patients</h1>
        <p className="text-gray-600 mt-2">View and manage your patient list</p>
      </div>

      {patients.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <p className="text-gray-600 text-lg">No patients assigned yet.</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b-2 border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Patient Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Age</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Last Visit</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Action</th>
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
                  <td className="px-6 py-4 text-gray-600">📅 {patient.lastVisit}</td>
                  <td className="px-6 py-4">
                    <button className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-1 px-4 rounded transition">
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DoctorPatients;
