import React from 'react';
import Card from '../../common/Card';

const Appointments = () => {
  // Dummy data for appointments
  const appointments = [
    { id: 1, patient: 'John Doe', date: '2024-07-25', time: '10:00 AM' },
    { id: 2, patient: 'Jane Smith', date: '2024-07-26', time: '11:30 AM' },
    { id: 3, patient: 'Sam Wilson', date: '2024-07-26', time: '02:00 PM' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Appointments</h1>
      <Card title="Upcoming Appointments">
        <table className="w-full">
          <thead>
            <tr className="text-left">
              <th className="pb-2">Patient</th>
              <th className="pb-2">Date</th>
              <th className="pb-2">Time</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((apt) => (
              <tr key={apt.id}>
                <td className="py-2">{apt.patient}</td>
                <td className="py-2">{apt.date}</td>
                <td className="py-2">{apt.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

export default Appointments;