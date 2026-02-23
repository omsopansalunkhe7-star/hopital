import React from 'react';
import Card from '../../../common/Card';

const MedicalRecords = () => {
  // Dummy data for medical records
  const records = [
    { id: 1, date: '2024-05-10', diagnosis: 'Common Cold', doctor: 'Dr. Smith' },
    { id: 2, date: '2024-02-15', diagnosis: 'Flu', doctor: 'Dr. Jones' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Medical Records</h1>
      <Card title="Past Visits">
        <table className="w-full">
          <thead>
            <tr className="text-left">
              <th className="pb-2">Date</th>
              <th className="pb-2">Diagnosis</th>
              <th className="pb-2">Doctor</th>
            </tr>
          </thead>
          <tbody>
            {records.map((rec) => (
              <tr key={rec.id}>
                <td className="py-2">{rec.date}</td>
                <td className="py-2">{rec.diagnosis}</td>
                <td className="py-2">{rec.doctor}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

export default MedicalRecords;