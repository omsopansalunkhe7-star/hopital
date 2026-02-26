import React from 'react';

const Prescriptions = () => {
  const prescriptions = [
    {
      id: 1,
      date: '2024-02-20',
      doctor: 'Dr. Sarah Johnson',
      medicines: [
        { name: 'Aspirin', dose: '500mg', frequency: 'Twice a day', duration: '7 days' },
        { name: 'Vitamin D3', dose: '1000 IU', frequency: 'Once daily', duration: '30 days' },
        { name: 'Calcium Supplement', dose: '500mg', frequency: 'Once daily', duration: '30 days' },
      ],
      notes: 'Take medicines with food. Avoid dairy within 2 hours of Calcium supplement.',
      status: 'Active',
    },
    {
      id: 2,
      date: '2024-02-05',
      doctor: 'Dr. Michael Chen',
      medicines: [
        { name: 'Lisinopril', dose: '10mg', frequency: 'Once daily', duration: '30 days' },
        { name: 'Metoprolol', dose: '50mg', frequency: 'Twice a day', duration: '30 days' },
      ],
      notes: 'Monitor blood pressure regularly. Schedule follow-up in 2 weeks.',
      status: 'Active',
    },
    {
      id: 3,
      date: '2024-01-15',
      doctor: 'Dr. Emily Rodriguez',
      medicines: [
        { name: 'Amoxicillin', dose: '500mg', frequency: 'Three times a day', duration: '10 days' },
        { name: 'Ibuprofen', dose: '200mg', frequency: 'As needed', duration: '10 days' },
      ],
      notes: 'Complete the full course. Do not skip doses even if feeling better.',
      status: 'Completed',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Your Prescriptions</h1>
        <p className="text-gray-600">View and manage your prescribed medications</p>
      </div>

      <div className="space-y-6">
        {prescriptions.map((prescription) => (
          <div key={prescription.id} className="bg-white rounded-lg shadow-lg p-6">
            {/* Header */}
            <div className="flex justify-between items-start mb-4 pb-4 border-b">
              <div>
                <div className="flex items-center gap-3">
                  <h2 className="text-xl font-bold text-gray-800">Prescription from {prescription.doctor}</h2>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      prescription.status === 'Active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {prescription.status}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-1">📅 Issued on {prescription.date}</p>
              </div>
            </div>

            {/* Medicines */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Medicines</h3>
              <div className="space-y-3">
                {prescription.medicines.map((medicine, idx) => (
                  <div key={idx} className="bg-gray-50 rounded-lg p-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">Medicine Name</p>
                        <p className="font-semibold text-gray-800">{medicine.name}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Dose</p>
                        <p className="font-semibold text-gray-800">{medicine.dose}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Frequency</p>
                        <p className="font-semibold text-gray-800">{medicine.frequency}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Duration</p>
                        <p className="font-semibold text-gray-800">{medicine.duration}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Notes */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="text-sm font-semibold text-blue-900 mb-2">📝 Doctor's Notes</h3>
              <p className="text-blue-800">{prescription.notes}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Prescriptions;
