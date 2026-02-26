import React from 'react';
import { motion } from 'framer-motion';
import AnimatedCard from '../../../common/AnimatedCard';

const DoctorDashboard = () => {
  const doctorName = localStorage.getItem('name') || 'Dr. Smith';
  const doctorEmail = localStorage.getItem('email') || 'doctor@example.com';

  // Mock data
  const stats = [
    { label: 'Total Patients', value: 45, color: 'indigo' },
    { label: "Today's Appointments", value: 8, color: 'green' },
    { label: 'Pending Consultations', value: 3, color: 'yellow' },
    { label: 'Completed Today', value: 5, color: 'blue' },
  ];

  const appointments = [
    {
      id: 1,
      patientName: 'John Doe',
      time: '10:00 AM',
      status: 'Confirmed',
      type: 'Check-up',
    },
    {
      id: 2,
      patientName: 'Jane Smith',
      time: '11:00 AM',
      status: 'Confirmed',
      type: 'Follow-up',
    },
    {
      id: 3,
      patientName: 'Mike Johnson',
      time: '2:00 PM',
      status: 'Pending',
      type: 'Consultation',
    },
  ];

  const colorMap = {
    indigo: 'bg-indigo-500',
    green: 'bg-green-500',
    yellow: 'bg-yellow-500',
    blue: 'bg-blue-500',
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-indigo-800 text-white p-6 rounded-lg">
        <h1 className="text-3xl font-bold mb-2">Welcome, Dr. {doctorName}! 👋</h1>
        <p className="text-indigo-100">{doctorEmail}</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <AnimatedCard key={index} delay={index * 0.1} className="p-6">
            <div className={`${colorMap[stat.color]} text-white rounded-full w-12 h-12 flex items-center justify-center mb-4`}>
              <span className="text-xl font-bold">{stat.value}</span>
            </div>
            <p className="text-gray-600 text-sm font-medium">{stat.label}</p>
            <p className="text-2xl font-bold text-gray-800 mt-2">{stat.value}</p>
          </AnimatedCard>
        ))}
      </div>

      {/* Today's Appointments */}
      <AnimatedCard delay={0.4} className="p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Today's Appointments</h2>
        <div className="space-y-4">
          {appointments.map((apt, idx) => (
            <motion.div
              key={apt.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.5 + idx * 0.1 }}
              whileHover={{ backgroundColor: '#f9fafb' }}
              className="border border-gray-200 rounded-lg p-4 transition"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-gray-800">{apt.patientName}</h3>
                  <p className="text-sm text-gray-600">{apt.type}</p>
                  <p className="text-sm text-gray-500 mt-2">⏰ {apt.time}</p>
                </div>
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    apt.status === 'Confirmed'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  {apt.status}
                </motion.span>
              </div>
            </motion.div>
          ))}
        </div>
      </AnimatedCard>
    </div>
  );
};

export default DoctorDashboard;
