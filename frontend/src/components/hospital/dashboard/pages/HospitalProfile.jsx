import React, { useState } from 'react';

const HospitalProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: localStorage.getItem('name') || 'Medical Center Hospital',
    email: localStorage.getItem('email') || 'hospital@example.com',
    licenseNumber: 'LIC-2020-54321',
    address: '789 Hospital Road, City, State 98765',
    phone: '+1-555-1234',
    established: '2010',
    beds: '150',
    departments: 'Cardiology, Surgery, Neurology, Dermatology, General Medicine',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleSave = () => {
    localStorage.setItem('name', profile.name);
    setIsEditing(false);
    alert('Hospital profile updated successfully!');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Hospital Profile</h1>
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-6 rounded-lg transition"
            >
              Edit Profile
            </button>
          )}
        </div>

        {isEditing ? (
          <div className="space-y-6">
            {/* Edit Mode */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Hospital Name</label>
                <input
                  type="text"
                  name="name"
                  value={profile.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={profile.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">License Number</label>
                <input
                  type="text"
                  name="licenseNumber"
                  value={profile.licenseNumber}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={profile.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Year Established</label>
                <input
                  type="text"
                  name="established"
                  value={profile.established}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Total Beds</label>
                <input
                  type="text"
                  name="beds"
                  value={profile.beds}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-gray-700 font-semibold mb-2">Address</label>
                <input
                  type="text"
                  name="address"
                  value={profile.address}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-gray-700 font-semibold mb-2">Departments</label>
                <textarea
                  name="departments"
                  value={profile.departments}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <button
                onClick={handleSave}
                className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-lg transition"
              >
                Save Changes
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="bg-gray-400 hover:bg-gray-500 text-white font-semibold py-2 px-6 rounded-lg transition"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* View Mode */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Basic Information</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600">Hospital Name</p>
                  <p className="text-lg font-semibold text-gray-800">{profile.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">License Number</p>
                  <p className="text-lg font-semibold text-gray-800">{profile.licenseNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Year Established</p>
                  <p className="text-lg font-semibold text-gray-800">{profile.established}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Beds</p>
                  <p className="text-lg font-semibold text-gray-800">{profile.beds}</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Contact Information</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="text-lg font-semibold text-gray-800">{profile.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Phone</p>
                  <p className="text-lg font-semibold text-gray-800">{profile.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Address</p>
                  <p className="text-lg font-semibold text-gray-800">{profile.address}</p>
                </div>
              </div>
            </div>

            <div className="md:col-span-2 bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Departments</h3>
              <p className="text-gray-800">{profile.departments}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HospitalProfile;
