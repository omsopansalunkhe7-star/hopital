import React from 'react';

const PatientDashboard = () => {
  const patientName = localStorage.getItem('name') || 'Patient';

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Welcome, {patientName}</h1>
      <p>This is your dashboard. You can view your appointments, medical records, and more.</p>
    </div>
  );
};

export default PatientDashboard;