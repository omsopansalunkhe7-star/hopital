import React from 'react';

const StatsCard = ({ title, value, icon, bgColor, iconColor }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-4 flex items-center">
      <div className={`rounded-full p-3 ${bgColor}`}>
        <div className={`${iconColor}`}>
          {icon}
        </div>
      </div>
      <div className="ml-4">
        <p className="text-gray-500">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </div>
  );
};

export default StatsCard;