import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import AnimatedCard from '../../../common/AnimatedCard';

const InsuranceDashboard = () => {
  const companyName = localStorage.getItem('name') || 'Insurance Company';

  const stats = [
    { label: 'Total Claims', value: 450, color: 'indigo' },
    { label: 'Pending Claims', value: 65, color: 'yellow' },
    { label: 'Approved Claims', value: 350, color: 'green' },
    { label: 'Total Patients', value: 2300, color: 'blue' },
  ];

  const recentClaims = [
    { id: 1, patient: 'John Doe', amount: '$500', status: 'Approved', date: '2024-02-20' },
    { id: 2, patient: 'Jane Smith', amount: '$1200', status: 'Pending', date: '2024-02-25' },
    { id: 3, patient: 'Mike Wilson', amount: '$800', status: 'Approved', date: '2024-02-22' },
  ];

  const colorMap = {
    indigo: 'bg-indigo-500',
    green: 'bg-green-500',
    yellow: 'bg-yellow-500',
    blue: 'bg-blue-500',
  };

  const [applications, setApplications] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get('/insurance/requests');
        setApplications(res.data);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Approved':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-indigo-800 text-white p-6 rounded-lg">
        <h1 className="text-3xl font-bold mb-2">Welcome to {companyName} 👋</h1>
        <p className="text-indigo-100">Insurance Management Dashboard</p>
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

      {/* Recent Claims */}
      <AnimatedCard delay={0.4} className="p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Claims</h2>
        <div className="space-y-4">
          {recentClaims.map((claim, idx) => (
            <motion.div
              key={claim.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.5 + idx * 0.1 }}
              whileHover={{ backgroundColor: '#f9fafb' }}
              className="border border-gray-200 rounded-lg p-4 transition"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-gray-800">{claim.patient}</h3>
                  <p className="text-sm text-gray-600">Claim Amount: {claim.amount}</p>
                  <p className="text-sm text-gray-500 mt-2">📅 {claim.date}</p>
                </div>
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(claim.status)}`}
                >
                  {claim.status}
                </motion.span>
              </div>
            </motion.div>
          ))}
        </div>
      </AnimatedCard>

      {/* Insurance Applications (from patient portal) */}
      <AnimatedCard delay={0.5} className="p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Insurance Applications</h2>
        {applications.length === 0 && <p className="text-gray-600">No applications yet</p>}
        <div className="space-y-4">
          {applications.map((app, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.6 + idx * 0.1 }}
              whileHover={{ backgroundColor: '#f9fafb' }}
              className="border border-gray-200 rounded-lg p-4 transition"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-gray-800">{app.patientEmail}</h3>
                  <p className="text-sm text-gray-500 mt-2">📅 {new Date(app.createdAt).toLocaleDateString()}</p>
                </div>
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(app.status)}`}
                >
                  {app.status}
                </motion.span>
              </div>
            </motion.div>
          ))}
        </div>
      </AnimatedCard>
    </div>
  );
};

export default InsuranceDashboard;
