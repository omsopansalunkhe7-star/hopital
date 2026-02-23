import React from 'react';

const EmptyState = ({ message }) => {
  return (
    <div className="text-center py-10">
      <p className="text-gray-500">{message}</p>
    </div>
  );
};

export default EmptyState;