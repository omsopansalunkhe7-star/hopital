import React from 'react';
import { motion } from 'framer-motion';
import AnimatedCard from './common/AnimatedCard';

const AdminDashboard = () => {
  const stats = [
    { label: 'Total Patients', value: 1250, color: 'indigo' },
    { label: 'Total Doctors', value: 85, color: 'green' },
    { label: 'Appointments Today', value: 45, color: 'yellow' },
    { label: 'Pending Records', value: 12, color: 'red' },
  ];

  const recentActivities = [
    { id: 1, action: 'New Patient Registered', user: 'John Doe', time: '2 hours ago' },
    { id: 2, action: 'Appointment Booked', user: 'Jane Smith', time: '1 hour ago' },
    { id: 3, action: 'Lab Report Uploaded', user: 'Dr. Sarah Johnson', time: '30 minutes ago' },
    { id: 4, action: 'Prescription Issued', user: 'Dr. Michael Chen', time: '15 minutes ago' },
  ];

  const colorMap = {
    indigo: 'bg-indigo-500',
    green: 'bg-green-500',
    yellow: 'bg-yellow-500',
    red: 'bg-red-500',
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
        <p className="text-gray-600 mt-2">Manage system, doctors, and patients</p>
      </div>

      {/* Stats */}
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

      {/* Recent Activities */}
      <AnimatedCard delay={0.4} className="p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Recent System Activities</h2>
        <div className="space-y-3">
          {recentActivities.map((activity, idx) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + idx * 0.1 }}
              className="flex items-center justify-between border-b pb-3 hover:bg-gray-50 p-3 rounded transition"
            >
              <div>
                <p className="font-semibold text-gray-800">{activity.action}</p>
                <p className="text-sm text-gray-600">by {activity.user}</p>
              </div>
              <span className="text-xs text-gray-500">{activity.time}</span>
            </motion.div>
          ))}
        </div>
      </AnimatedCard>

      {/* Quick Actions */}
      <AnimatedCard delay={0.5} className="p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            👥 Manage Patients
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            👨‍⚕️ Manage Doctors
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
          >
            📊 Generate Reports
          </motion.button>
        </div>
      </AnimatedCard>
    </div>
  );
};

export default AdminDashboard;
