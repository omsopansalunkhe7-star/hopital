import React from 'react';
import Card from '../../common/Card';

const InsuranceDashboard = () => {
  // Dummy data for insurance claims
  const claims = [
    { id: 1, patient: 'John Doe', amount: '$500', status: 'Approved' },
    { id: 2, patient: 'Jane Smith', amount: '$1200', status: 'Pending' },
    { id: 3, patient: 'Sam Wilson', amount: '$300', status: 'Rejected' },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">Insurance Dashboard</h1>
      <Card title="Insurance Claims">
        <table className="w-full">
          <thead>
            <tr className="text-left">
              <th className="pb-2">Patient</th>
              <th className="pb-2">Amount</th>
              <th className="pb-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {claims.map((claim) => (
              <tr key={claim.id}>
                <td className="py-2">{claim.patient}</td>
                <td className="py-2">{claim.amount}</td>
                <td className="py-2">{claim.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

export default InsuranceDashboard;
