import React, { useState } from 'react';
import { motion } from 'framer-motion';
import DocumentUploadModal from '../../../common/DocumentUploadModal';

const InsuranceDocuments = () => {
  const [documents, setDocuments] = useState([
    {
      id: 1,
      name: 'Insurance License',
      type: 'License',
      uploadDate: '2024-01-05',
      status: 'Verified',
      size: '1.9 MB',
      uploadedBy: 'Admin'
    },
    {
      id: 2,
      name: 'Claim Processing Guidelines',
      type: 'Policy',
      uploadDate: '2024-02-20',
      status: 'Active',
      size: '2.4 MB',
      uploadedBy: 'Policy Team'
    },
    {
      id: 3,
      name: 'Insurance Compliance Report',
      type: 'Report',
      uploadDate: '2024-02-15',
      status: 'Verified',
      size: '3.1 MB',
      uploadedBy: 'Compliance'
    },
  ]);

  const [appliedDocuments, setAppliedDocuments] = useState([
    {
      id: 1,
      name: 'Hospital Accreditation - City Hospital',
      type: 'Accreditation',
      uploadDate: '2024-02-18',
      submittedBy: 'City Hospital Admin',
      status: 'Pending',
      size: '2.8 MB'
    },
    {
      id: 2,
      name: 'Doctor License Verification - Dr. Sarah Johnson',
      type: 'License',
      uploadDate: '2024-02-22',
      submittedBy: 'Dr. Sarah Johnson',
      status: 'Pending',
      size: '1.2 MB'
    },
    {
      id: 3,
      name: 'Medical Records Backup - General Hospital',
      type: 'Medical Record',
      uploadDate: '2024-02-24',
      submittedBy: 'General Hospital - Dr Michael',
      status: 'Pending',
      size: '5.6 MB'
    },
    {
      id: 4,
      name: 'Lab Certification - Diagnostic Center',
      type: 'Certificate',
      uploadDate: '2024-02-19',
      submittedBy: 'Diagnostic Center',
      status: 'Pending',
      size: '0.9 MB'
    },
  ]);

  const [isUploadOpen, setIsUploadOpen] = useState(false);

  const getTypeColor = (type) => {
    switch(type) {
      case 'License': return 'bg-blue-100 text-blue-800';
      case 'Policy': return 'bg-green-100 text-green-800';
      case 'Report': return 'bg-purple-100 text-purple-800';
      case 'Reference': return 'bg-yellow-100 text-yellow-800';
      case 'Accreditation': return 'bg-indigo-100 text-indigo-800';
      case 'Certificate': return 'bg-pink-100 text-pink-800';
      case 'Medical Record': return 'bg-orange-100 text-orange-800';
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

  const handleApprove = (docId, docName) => {
    if (window.confirm(`Approve document "${docName}"?`)) {
      setAppliedDocuments(appliedDocuments.map(doc =>
        doc.id === docId ? { ...doc, status: 'Approved' } : doc
      ));
      console.log(`Approved: ${docName}`);
      alert(`Document "${docName}" has been approved!`);
    }
  };

  const handleReject = (docId, docName) => {
    if (window.confirm(`Reject document "${docName}"?`)) {
      setAppliedDocuments(appliedDocuments.map(doc =>
        doc.id === docId ? { ...doc, status: 'Rejected' } : doc
      ));
      console.log(`Rejected: ${docName}`);
      alert(`Document "${docName}" has been rejected.`);
    }
  };

  const handleUploadDocument = (newDoc) => {
    const uploadedDoc = {
      id: documents.length + 1,
      name: newDoc.name,
      type: newDoc.type,
      uploadDate: newDoc.uploadDate,
      status: 'Active',
      size: newDoc.size,
      uploadedBy: localStorage.getItem('name') || 'Admin'
    };
    setDocuments([uploadedDoc, ...documents]);
    console.log('Document uploaded:', uploadedDoc);
  };

  const pendingCount = appliedDocuments.filter(doc => doc.status === 'Pending').length;

  return (
    <div className="space-y-6">
      {/* Applied Documents Section - For Approval */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Document Review & Approval</h1>
            <p className="text-gray-600 mt-2">Review and approve documents submitted by hospitals and doctors</p>
          </div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="px-6 py-3 bg-red-500 text-white rounded-lg font-semibold"
          >
            ⏳ {pendingCount} Pending Review
          </motion.div>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-red-50 border-b-2 border-red-200">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Document Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Type</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Submitted By</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Date</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Size</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {appliedDocuments.map((doc, idx) => (
                <motion.tr
                  key={doc.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="hover:bg-red-50 transition"
                >
                  <td className="px-6 py-4 text-gray-800 font-semibold">{doc.name}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getTypeColor(doc.type)}`}>
                      {doc.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{doc.submittedBy}</td>
                  <td className="px-6 py-4 text-gray-600">📅 {doc.uploadDate}</td>
                  <td className="px-6 py-4 text-gray-600">{doc.size}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      doc.status === 'Pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : doc.status === 'Approved'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {doc.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2 flex-wrap">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleDownload(doc.name)}
                        className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition"
                      >
                        📥 View
                      </motion.button>
                      {doc.status === 'Pending' && (
                        <>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleApprove(doc.id, doc.name)}
                            className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700 transition"
                          >
                            ✓ Approve
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleReject(doc.id, doc.name)}
                            className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700 transition"
                          >
                            ✕ Reject
                          </motion.button>
                        </>
                      )}
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Insurance Portal Documents */}
      <div className="space-y-4 pt-6 border-t-2 border-gray-200">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Insurance Documents</h2>
            <p className="text-gray-600 mt-2">Manage insurance licenses, policies, and records</p>
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
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Date</th>
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
      </div>

      <DocumentUploadModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onUpload={handleUploadDocument}
      />
    </div>
  );
};

export default InsuranceDocuments;
