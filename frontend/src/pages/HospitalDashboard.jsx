import React from 'react';
import Card from '../components/common/Card';

const HospitalDashboard = () => {
  // Dummy data for hospital status
  const bedAvailability = { total: 100, occupied: 65 };
  const doctorsOnDuty = ['Dr. Smith', 'Dr. Jones', 'Dr. Wilson'];

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">Hospital Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card title="Bed Availability">
          <p>Total Beds: {bedAvailability.total}</p>
          <p>Occupied Beds: {bedAvailability.occupied}</p>
          <p>Available Beds: {bedAvailability.total - bedAvailability.occupied}</p>
        </Card>
        <Card title="Doctors on Duty">
          <ul>
            {doctorsOnDuty.map((doctor, index) => (
              <li key={index}>{doctor}</li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
};

export default HospitalDashboard;
