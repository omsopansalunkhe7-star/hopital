import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, AlertCircle } from 'lucide-react';

/**
 * Toast Component
 * @param {string} id - Unique identifier
 * @param {string} message - Notification message
 * @param {string} type - 'success' | 'error'
 * @param {function} onClose - Callback to remove toast
 * @param {number} duration - ms before auto-close
 */
const Toast = ({ id, message, type = 'success', onClose, duration = 4000 }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(id);
    }, duration);
    return () => clearTimeout(timer);
  }, [id, duration, onClose]);

  const variants = {
    success: {
      base: "bg-white border-emerald-100",
      icon: <CheckCircle className="w-5 h-5 text-emerald-500" />,
      bar: "bg-emerald-500",
      shadow: "shadow-emerald-100"
    },
    error: {
      base: "bg-white border-red-100",
      icon: <AlertCircle className="w-5 h-5 text-red-500" />,
      bar: "bg-red-500",
      shadow: "shadow-red-100"
    }
  };

  const config = variants[type] || variants.success;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 50, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 20, scale: 0.95 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={`relative overflow-hidden min-w-[320px] max-w-md p-4 rounded-xl border shadow-xl ${config.base} ${config.shadow} mb-3`}
    >
      <div className="flex items-start gap-3">
        <div className="mt-0.5">{config.icon}</div>
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-800 leading-tight">
            {message}
          </p>
        </div>
        <button 
          onClick={() => onClose(id)}
          className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-lg hover:bg-gray-50"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Progress Bar Animation */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-100">
        <motion.div
          initial={{ width: "100%" }}
          animate={{ width: "0%" }}
          transition={{ duration: duration / 1000, ease: "linear" }}
          className={`h-full ${config.bar}`}
        />
      </div>
    </motion.div>
  );
};

/**
 * ToastContainer - Place this at the root of your app
 */
export const ToastContainer = ({ toasts, removeToast }) => {
  return (
    <div className="fixed top-6 right-6 z-[9999] flex flex-col items-end pointer-events-none">
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <div key={toast.id} className="pointer-events-auto">
            <Toast
              id={toast.id}
              message={toast.message}
              type={toast.type}
              duration={toast.duration}
              onClose={removeToast}
            />
          </div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default Toast;