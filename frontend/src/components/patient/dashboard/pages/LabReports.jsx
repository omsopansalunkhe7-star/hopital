import React from 'react';
import { motion } from 'framer-motion';

const LabReports = () => {
  const labReports = [
    {
      id: 1,
      testName: 'Blood Test',
      date: '2024-02-20',
      status: 'Completed',
      results: 'Normal',
      doctor: 'Dr. Sarah Johnson',
    },
    {
      id: 2,
      testName: 'CT Scan',
      date: '2024-02-25',
      status: 'Completed',
      results: 'Normal',
      doctor: 'Dr. Michael Chen',
    },
    {
      id: 3,
      testName: 'X-Ray',
      date: '2024-02-28',
      status: 'Pending',
      results: 'Awaiting Results',
      doctor: 'Dr. Emily Rodriguez',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Lab Reports</h1>
        <p className="text-gray-600 mt-2">View and download medical lab reports</p>
      </div>

      <div className="space-y-4">
        {labReports.map((report, idx) => (
          <motion.div
            key={report.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">{report.testName}</h3>
                <p className="text-sm text-gray-600 mt-1">📅 {report.date}</p>
                <p className="text-sm text-gray-600">👨‍⚕️ {report.doctor}</p>
              </div>
              <div className="text-right">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    report.status === 'Completed'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  {report.status}
                </span>
                <p className="text-sm font-semibold text-gray-800 mt-2">{report.results}</p>
              </div>
            </div>
            {report.status === 'Completed' && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
              >
                📥 Download Report
              </motion.button>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default LabReports;
