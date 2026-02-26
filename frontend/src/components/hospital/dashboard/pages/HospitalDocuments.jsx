import React, { useState } from 'react';
import { motion } from 'framer-motion';
import DocumentUploadModal from '../../../common/DocumentUploadModal';

const HospitalDocuments = () => {
  const [documents, setDocuments] = useState([
    {
      id: 1,
      name: 'Hospital Registration Certificate',
      type: 'License',
      uploadDate: '2024-01-10',
      status: 'Verified',
      size: '2.1 MB',
      uploadedBy: 'Admin'
    },
    {
      id: 2,
      name: 'Patient Medical Records - Q1 2024',
      type: 'Medical Record',
      uploadDate: '2024-02-20',
      status: 'Active',
      size: '5.3 MB',
      uploadedBy: 'Dr. Sarah Johnson'
    },
    {
      id: 3,
      name: 'Accreditation Report',
      type: 'Accreditation',
      uploadDate: '2024-02-15',
      status: 'Verified',
      size: '3.8 MB',
      uploadedBy: 'Admin'
    },
    {
      id: 4,
      name: 'Lab Reports Archive',
      type: 'Medical Record',
      uploadDate: '2024-02-22',
      status: 'Active',
      size: '7.2 MB',
      uploadedBy: 'Dr. Michael Chen'
    },
    {
      id: 5,
      name: 'Department Annual Report',
      type: 'Report',
      uploadDate: '2024-02-25',
      status: 'Active',
      size: '4.5 MB',
      uploadedBy: 'Admin'
    },
  ]);

  const [isUploadOpen, setIsUploadOpen] = useState(false);

  const getTypeColor = (type) => {
    switch(type) {
      case 'License': return 'bg-blue-100 text-blue-800';
      case 'Accreditation': return 'bg-green-100 text-green-800';
      case 'Medical Record': return 'bg-purple-100 text-purple-800';
      case 'Report': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleDownload = (docName) => {
    console.log(`Downloaded: ${docName}`);
    alert(`Document "${docName}" downloaded successfully`);
  };

  const handleDelete = (docId, docName) => {
    if (window.confirm(`Delete document "${docName}"?`)) {
      setDocuments(documents.filter(doc => doc.id !== docId));
      console.log(`Deleted: ${docName}`);
    }
  };

  const handleUploadDocument = (newDoc) => {
    const uploadedDoc = {
      id: documents.length + 1,
      name: newDoc.name,
      type: newDoc.type,
      uploadDate: newDoc.uploadDate,
      status: 'Pending',
      size: newDoc.size,
      uploadedBy: localStorage.getItem('name') || 'Admin'
    };
    setDocuments([uploadedDoc, ...documents]);
    console.log('Document uploaded:', uploadedDoc);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Hospital Documents</h1>
          <p className="text-gray-600 mt-2">Manage hospital records, licenses, and compliance documents</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsUploadOpen(true)}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
        >
          📤 Upload Document
        </motion.button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b-2 border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Document Name</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Type</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Upload Date</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Uploaded By</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Size</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {documents.map((doc, idx) => (
              <motion.tr
                key={doc.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="hover:bg-gray-50 transition"
              >
                <td className="px-6 py-4 text-gray-800 font-semibold">{doc.name}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getTypeColor(doc.type)}`}>
                    {doc.type}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-600">📅 {doc.uploadDate}</td>
                <td className="px-6 py-4 text-gray-600">{doc.uploadedBy}</td>
                <td className="px-6 py-4 text-gray-600">{doc.size}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    doc.status === 'Verified'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {doc.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleDownload(doc.name)}
                      className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition"
                    >
                      📥 Download
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleDelete(doc.id, doc.name)}
                      className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700 transition"
                    >
                      🗑️ Delete
                    </motion.button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      <DocumentUploadModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onUpload={handleUploadDocument}
      />
    </div>
  );
};

export default HospitalDocuments;
