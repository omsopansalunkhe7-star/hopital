import React from 'react';

const Appointments = () => {
  // Mock data for appointments
  const appointments = [
    {
      id: 1,
      doctor: 'Dr. Sarah Johnson',
      specialty: 'General Practitioner',
      date: '2024-02-28',
      time: '10:00 AM',
      status: 'Confirmed',
      type: 'Check-up',
    },
    {
      id: 2,
      doctor: 'Dr. Michael Chen',
      specialty: 'Cardiologist',
      date: '2024-03-05',
      time: '2:30 PM',
      status: 'Pending',
      type: 'Consultation',
    },
    {
      id: 3,
      doctor: 'Dr. Emily Rodriguez',
      specialty: 'Dermatologist',
      date: '2024-03-10',
      time: '11:00 AM',
      status: 'Confirmed',
      type: 'Skin Consultation',
    },
    {
      id: 4,
      doctor: 'Dr. James Wilson',
      specialty: 'Orthopedist',
      date: '2024-03-15',
      time: '3:00 PM',
      status: 'Confirmed',
      type: 'Follow-up',
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Confirmed':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      case 'Completed':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">My Appointments</h1>
        <p className="text-gray-600 mt-2">View and manage your scheduled appointments</p>
      </div>

      {appointments.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <p className="text-gray-600 text-lg">No appointments scheduled yet.</p>
          <p className="text-gray-500 mt-2">Book an appointment to get started.</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b-2 border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Doctor Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Specialty</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Date</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Time</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Type</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {appointments.map((apt) => (
                <tr key={apt.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 text-gray-800 font-semibold">{apt.doctor}</td>
                  <td className="px-6 py-4 text-gray-600">{apt.specialty}</td>
                  <td className="px-6 py-4 text-gray-600">📅 {apt.date}</td>
                  <td className="px-6 py-4 text-gray-600">⏰ {apt.time}</td>
                  <td className="px-6 py-4 text-gray-600">{apt.type}</td>
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
      )}
    </div>
  );
};

export default Appointments;