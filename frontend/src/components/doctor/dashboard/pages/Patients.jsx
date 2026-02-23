import React from 'react';
import Card from '../../common/Card';

const Patients = () => {
  // Dummy data for patients
  const patients = [
    { id: 1, name: 'John Doe', age: 45, lastVisit: '2024-05-10' },
    { id: 2, name: 'Jane Smith', age: 32, lastVisit: '2024-06-15' },
    { id: 3, name: 'Sam Wilson', age: 58, lastVisit: '2024-07-01' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Patients</h1>
      <Card title="Patient List">
        <table className="w-full">
          <thead>
            <tr className="text-left">
              <th className="pb-2">Name</th>
              <th className="pb-2">Age</th>
              <th className="pb-2">Last Visit</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient) => (
              <tr key={patient.id}>
                <td className="py-2">{patient.name}</td>
                <td className="py-2">{patient.age}</td>
                <td className="py-2">{patient.lastVisit}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

export default Patients;