import React from 'react';

const HospitalAppointments = () => {
  const appointments = [
    { id: 1, patient: 'John Doe', doctor: 'Dr. Smith', date: '2024-02-28', time: '10:00 AM', status: 'Confirmed' },
    { id: 2, patient: 'Jane Smith', doctor: 'Dr. Johnson', date: '2024-02-28', time: '11:00 AM', status: 'Confirmed' },
    { id: 3, patient: 'Mike Johnson', doctor: 'Dr. Chen', date: '2024-02-28', time: '2:00 PM', status: 'Pending' },
    { id: 4, patient: 'Sarah Williams', doctor: 'Dr. Rodriguez', date: '2024-03-01', time: '9:00 AM', status: 'Confirmed' },
    { id: 5, patient: 'David Brown', doctor: 'Dr. Wilson', date: '2024-03-01', time: '3:00 PM', status: 'Confirmed' },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Confirmed':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Hospital Appointments</h1>
        <p className="text-gray-600 mt-2">Manage all hospital appointments</p>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b-2 border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Patient Name</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Doctor</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Date</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Time</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {appointments.map((apt) => (
              <tr key={apt.id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4 text-gray-800 font-semibold">{apt.patient}</td>
                <td className="px-6 py-4 text-gray-600">{apt.doctor}</td>
                <td className="px-6 py-4 text-gray-600">📅 {apt.date}</td>
                <td className="px-6 py-4 text-gray-600">⏰ {apt.time}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(apt.status)}`}>
                    {apt.status}
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

export default HospitalAppointments;
