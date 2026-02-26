import React from 'react';
import { motion } from 'framer-motion';

const DoctorAppointments = () => {
  const appointments = [
    {
      id: 1,
      patientName: 'John Doe',
      date: '2024-02-28',
      time: '10:00 AM',
      status: 'Pending',
      type: 'Check-up'
    },
    {
      id: 2,
      patientName: 'Jane Smith',
      date: '2024-02-28',
      time: '11:00 AM',
      status: 'Confirmed',
      type: 'Follow-up'
    },
    {
      id: 3,
      patientName: 'Sam Wilson',
      date: '2024-02-28',
      time: '12:00 PM',
      status: 'Completed',
      type: 'Consultation'
    },
    {
      id: 4,
      patientName: 'Mike Johnson',
      date: '2024-02-28',
      time: '2:00 PM',
      status: 'Pending',
      type: 'Check-up'
    },
  ];

  const handleApprove = (appointmentId) => {
    console.log('Appointment approved:', appointmentId);
  };

  const handleCancel = (appointmentId) => {
    console.log('Appointment cancelled:', appointmentId);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Appointments</h1>
        <p className="text-gray-600 mt-2">Manage and review patient appointments</p>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b-2 border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Patient Name</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Date</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Time</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Type</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {appointments.map((apt, idx) => (
              <motion.tr
                key={apt.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="hover:bg-gray-50 transition"
              >
                <td className="px-6 py-4 text-gray-800 font-semibold">{apt.patientName}</td>
                <td className="px-6 py-4 text-gray-600">📅 {apt.date}</td>
                <td className="px-6 py-4 text-gray-600">⏰ {apt.time}</td>
                <td className="px-6 py-4 text-gray-600">{apt.type}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    apt.status === 'Confirmed'
                      ? 'bg-green-100 text-green-800'
                      : apt.status === 'Completed'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {apt.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    {apt.status === 'Pending' && (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleApprove(apt.id)}
                        className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700 transition"
                      >
                        ✓ Approve
                      </motion.button>
                    )}
                    {apt.status !== 'Completed' && (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleCancel(apt.id)}
                        className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700 transition"
                      >
                        ✕ Cancel
                      </motion.button>
                    )}
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DoctorAppointments;