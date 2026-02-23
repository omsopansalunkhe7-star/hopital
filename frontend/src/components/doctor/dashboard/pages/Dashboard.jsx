import React from 'react';
import StatsCard from '../../common/StatsCard';
import Card from '../../common/Card';

const DoctorDashboard = () => {
  const doctorName = localStorage.getItem('name') || 'Doctor';

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Welcome, {doctorName}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <StatsCard title="Total Patients" value="120" />
        <StatsCard title="Upcoming Appointments" value="8" />
        <StatsCard title="Earnings" value="$5,400" />
        <StatsCard title="Recent Activity" value="5" />
      </div>
      <Card title="Recent Activity">
        <p>No recent activity</p>
      </Card>
    </div>
  );
};

export default DoctorDashboard;