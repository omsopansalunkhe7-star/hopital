import React from 'react';
import { motion } from 'framer-motion';

export const Spinner = ({ size = "md" }) => {
  const sizes = {
    sm: "h-5 w-5 border-2",
    md: "h-10 w-10 border-4",
    lg: "h-16 w-16 border-4"
  };

  return (
    <div className="flex justify-center items-center">
      <motion.div
        className={`${sizes[size]} rounded-full border-indigo-200 border-t-indigo-600`}
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear"
        }}
      />
    </div>
  );
};

export const Skeleton = ({ className }) => {
  return (
    <div className={`relative overflow-hidden bg-gray-200 rounded ${className}`}>
      <motion.div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.5) 50%, transparent 100%)",
        }}
        animate={{
          x: ['-100%', '100%'],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
};

export const LoadingButton = ({ 
  children, 
  isLoading, 
  onClick, 
  className = "", 
  disabled = false,
  type = "button"
}) => {
  return (
    <motion.button
      type={type}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      disabled={isLoading || disabled}
      className={`relative flex items-center justify-center px-4 py-2 bg-indigo-600 text-white rounded-xl transition-colors hover:bg-indigo-700 disabled:opacity-70 disabled:cursor-not-allowed ${className}`}
    >
      {isLoading && (
        <motion.div
          className="mr-2 h-4 w-4 rounded-full border-2 border-white/30 border-t-white"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      )}
      <span>{children}</span>
    </motion.button>
  );
};

const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 p-8">
      <Spinner size="lg" />
      <p className="text-indigo-600 font-medium animate-pulse">Loading experience...</p>
    </div>
  );
};

export default Loader;