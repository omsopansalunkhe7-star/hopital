import React from 'react';

const StatsCard = ({ title, value }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
      <p className="text-3xl font-bold text-gray-900">{value}</p>
    </div>
  );
};

export default StatsCard;