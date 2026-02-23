import React from 'react';

const Card = ({ children, title }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-4">
      {title && <h2 className="text-xl font-bold mb-4">{title}</h2>}
      {children}
    </div>
  );
};

export default Card;