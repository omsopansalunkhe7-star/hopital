import React from 'react';
import { motion } from 'framer-motion';

const TreatmentHistory = () => {
  const treatments = [
    {
      id: 1,
      type: 'Consultation',
      doctor: 'Dr. Sarah Johnson',
      date: '2024-02-20',
      diagnosis: 'Hypertension',
      treatment: 'Prescribed Lisinopril 10mg daily',
      status: 'Completed',
    },
    {
      id: 2,
      type: 'Follow-up',
      doctor: 'Dr. Michael Chen',
      date: '2024-02-25',
      diagnosis: 'Blood Pressure Check',
      treatment: 'BP: 120/80 - Stable, Continue medication',
      status: 'Completed',
    },
    {
      id: 3,
      type: 'Lab Test',
      doctor: 'Dr. Emily Rodriguez',
      date: '2024-02-28',
      diagnosis: 'Annual Checkup',
      treatment: 'Blood tests ordered - Results pending',
      status: 'In Progress',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Treatment History</h1>
        <p className="text-gray-600 mt-2">Complete medical treatment records and history</p>
      </div>

      <div className="space-y-4">
        {treatments.map((treatment, idx) => (
          <motion.div
            key={treatment.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white rounded-lg shadow p-6 border-l-4 border-indigo-600 hover:shadow-lg transition"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">{treatment.type}</h3>
                <p className="text-sm text-gray-600 mt-1">👨‍⚕️ {treatment.doctor}</p>
                <p className="text-sm text-gray-600">📅 {treatment.date}</p>
              </div>
              <div className="text-right">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    treatment.status === 'Completed'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}
                >
                  {treatment.status}
                </span>
              </div>
            </div>

            <div className="mt-4 space-y-2 border-t pt-4">
              <div>
                <p className="text-sm font-semibold text-gray-700">Diagnosis:</p>
                <p className="text-gray-700">{treatment.diagnosis}</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-700">Treatment:</p>
                <p className="text-gray-700">{treatment.treatment}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TreatmentHistory;
