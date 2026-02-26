import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import AnimatedCard from '../../../common/AnimatedCard';

const PatientDashboard = () => {
  const patientName = localStorage.getItem('name') || 'John Doe';
  const patientEmail = localStorage.getItem('email') || 'patient@example.com';

  // Mock data
  const stats = [
    { label: 'Total Appointments', value: 12, color: 'indigo' },
    { label: 'Appointments This Month', value: 3, color: 'green' },
    { label: 'Pending Appointments', value: 2, color: 'yellow' },
    { label: 'Completed Appointments', value: 10, color: 'blue' },
  ];

  const recentAppointments = [
    {
      id: 1,
      doctorName: 'Dr. Sarah Johnson',
      specialty: 'General Practitioner',
      date: '2024-02-28',
      time: '10:00 AM',
      status: 'Confirmed',
    },
    {
      id: 2,
      doctorName: 'Dr. Michael Chen',
      specialty: 'Cardiologist',
      date: '2024-03-05',
      time: '2:30 PM',
      status: 'Pending',
    },
    {
      id: 3,
      doctorName: 'Dr. Emily Rodriguez',
      specialty: 'Dermatologist',
      date: '2024-03-10',
      time: '11:00 AM',
      status: 'Confirmed',
    },
  ];

  const lastPrescription = {
    date: '2024-02-20',
    doctor: 'Dr. Sarah Johnson',
    medicines: ['Aspirin 500mg', 'Vitamin D3', 'Calcium Supplement'],
    duration: '30 days',
  };

  const [applyStatus, setApplyStatus] = useState('');

  const applyInsurance = async () => {
    const email = localStorage.getItem('email');
    const sessionKey = localStorage.getItem('sessionKey');
    try {
      const res = await axios.post('/patient/apply-insurance', { email, sessionKey });
      if (res.data.status === 'applied') {
        setApplyStatus('Application submitted');
      } else if (res.data.status === 'unauthenticated') {
        setApplyStatus('Please login again');
      } else {
        setApplyStatus('Unable to submit');
      }
    } catch (err) {
      console.error(err);
      setApplyStatus('Network error');
    }
  };

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
        <h1 className="text-3xl font-bold mb-2">Welcome, {patientName}! 👋</h1>
        <p className="text-indigo-100">{patientEmail}</p>
        {/* insurance apply button */}
        <button
          onClick={applyInsurance}
          className="mt-4 bg-white text-indigo-700 font-semibold px-4 py-2 rounded-lg hover:bg-indigo-50"
        >
          Apply for Insurance
        </button>
        {applyStatus && <p className="mt-2 text-sm text-white">{applyStatus}</p>}
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Appointments */}
        <AnimatedCard delay={0.3} className="lg:col-span-2 p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Appointments</h2>
          <div className="space-y-4">
            {recentAppointments.map((apt, idx) => (
              <motion.div
                key={apt.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.4 + idx * 0.1 }}
                whileHover={{ backgroundColor: '#f9fafb' }}
                className="border border-gray-200 rounded-lg p-4 transition"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-800">{apt.doctorName}</h3>
                    <p className="text-sm text-gray-600">{apt.specialty}</p>
                    <p className="text-sm text-gray-500 mt-2">
                      📅 {apt.date} | ⏰ {apt.time}
                    </p>
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

        {/* Last Prescription */}
        <AnimatedCard delay={0.4} className="p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Last Prescription</h2>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-600">Doctor</p>
              <p className="font-semibold text-gray-800">{lastPrescription.doctor}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Date</p>
              <p className="font-semibold text-gray-800">{lastPrescription.date}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Duration</p>
              <p className="font-semibold text-gray-800">{lastPrescription.duration}</p>
            </div>
            <div className="border-t pt-3">
              <p className="text-sm text-gray-600 mb-2">Medicines</p>
              <ul className="space-y-1">
                {lastPrescription.medicines.map((medicine, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + idx * 0.05 }}
                    className="text-sm text-gray-700"
                  >
                    • {medicine}
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </AnimatedCard>
      </div>
    </div>
  );
};

export default PatientDashboard;