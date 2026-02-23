import React from 'react';
import Table from '../../../common/Table';
import Card from '../../../common/Card';

const DoctorAppointments = () => {
  const columns = [
    { Header: 'Patient Name', accessor: 'patientName' },
    { Header: 'Date', accessor: 'date' },
    { Header: 'Time', accessor: 'time' },
    { Header: 'Status', accessor: 'status' },
    {
      Header: 'Action',
      Cell: ({ row }) => (
        <div>
          <button className="bg-green-500 text-white px-2 py-1 rounded-md mr-2">Approve</button>
          <button className="bg-red-500 text-white px-2 py-1 rounded-md">Cancel</button>
        </div>
      )
    }
  ];

  const data = [
    { patientName: 'John Doe', date: '2024-07-28', time: '10:00 AM', status: 'Pending' },
    { patientName: 'Jane Smith', date: '2024-07-29', time: '11:00 AM', status: 'Approved' },
    { patientName: 'Sam Wilson', date: '2024-07-30', time: '12:00 PM', status: 'Completed' }
  ];

  return (
    <div className="p-4">
      <Card title="Appointments">
        <Table columns={columns} data={data} />
      </Card>
    </div>
  );
};

export default DoctorAppointments;