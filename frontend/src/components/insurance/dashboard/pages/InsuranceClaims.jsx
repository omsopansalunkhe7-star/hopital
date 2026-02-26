import React from 'react';

const InsuranceClaims = () => {
  const claims = [
    { id: 1, patient: 'John Doe', amount: '$500', status: 'Approved', date: '2024-02-20', type: 'Medical' },
    { id: 2, patient: 'Jane Smith', amount: '$1200', status: 'Pending', date: '2024-02-25', type: 'Dental' },
    { id: 3, patient: 'Mike Wilson', amount: '$800', status: 'Approved', date: '2024-02-22', type: 'Medical' },
    { id: 4, patient: 'Sarah Johnson', amount: '$350', status: 'Rejected', date: '2024-02-18', type: 'Vision' },
    { id: 5, patient: 'David Brown', amount: '$2000', status: 'Pending', date: '2024-02-27', type: 'Surgery' },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Approved':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Insurance Claims</h1>
        <p className="text-gray-600 mt-2">Manage and review insurance claims</p>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b-2 border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Claim ID</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Patient Name</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Amount</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Type</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Date</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {claims.map((claim) => (
              <tr key={claim.id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4 text-gray-800 font-semibold">#{claim.id}</td>
                <td className="px-6 py-4 text-gray-600">{claim.patient}</td>
                <td className="px-6 py-4 text-gray-800 font-semibold">{claim.amount}</td>
                <td className="px-6 py-4 text-gray-600">{claim.type}</td>
                <td className="px-6 py-4 text-gray-600">📅 {claim.date}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(claim.status)}`}>
                    {claim.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InsuranceClaims;
