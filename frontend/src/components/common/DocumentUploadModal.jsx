import React, { useState } from 'react';
import { motion } from 'framer-motion';

const DocumentUploadModal = ({ isOpen, onClose, onUpload }) => {
  const [fileName, setFileName] = useState('');
  const [documentType, setDocumentType] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const documentTypes = [
    'License',
    'Certificate',
    'Medical Record',
    'Report',
    'Policy',
    'Accreditation',
    'Reference',
    'Other'
  ];

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
    }
  };

  const handleUpload = () => {
    if (!fileName || !documentType) {
      alert('Please select both file and document type');
      return;
    }

    setIsUploading(true);

    // Simulate upload
    setTimeout(() => {
      onUpload({
        name: fileName,
        type: documentType,
        uploadDate: new Date().toISOString().split('T')[0],
        size: Math.random() * 10 + ' MB',
        status: 'Pending'
      });

      setFileName('');
      setDocumentType('');
      setIsUploading(false);
      onClose();
    }, 1000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Upload Document</h2>

        <div className="space-y-4">
          {/* Document Type Selection */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Document Type
            </label>
            <select
              value={documentType}
              onChange={(e) => setDocumentType(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            >
              <option value="">Select a type...</option>
              {documentTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          {/* File Upload */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Select File
            </label>
            <div className="border-2 border-dashed border-indigo-300 rounded-lg p-6 text-center hover:border-indigo-500 transition cursor-pointer">
              <input
                type="file"
                onChange={handleFileChange}
                className="hidden"
                id="file-input"
              />
              <label htmlFor="file-input" className="cursor-pointer">
                <p className="text-gray-600">
                  {fileName ? `📄 ${fileName}` : '📁 Click to select file or drag & drop'}
                </p>
              </label>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
            >
              Cancel
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleUpload}
              disabled={isUploading}
              className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isUploading ? '⏳ Uploading...' : '✓ Upload'}
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default DocumentUploadModal;
