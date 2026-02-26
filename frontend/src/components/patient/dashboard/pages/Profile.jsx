import React, { useState } from 'react';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: localStorage.getItem('name') || 'John Doe',
    email: localStorage.getItem('email') || 'john@example.com',
    age: '28',
    blood: 'O+',
    phone: '+1-555-0123',
    address: '123 Main Street, City, State 12345',
    medicalHistory: 'No significant medical history',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleSave = () => {
    localStorage.setItem('name', profile.name);
    setIsEditing(false);
    alert('Profile updated successfully!');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">My Profile</h1>
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
                <label className="block text-gray-700 font-semibold mb-2">Full Name</label>
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
                <label className="block text-gray-700 font-semibold mb-2">Age</label>
                <input
                  type="number"
                  name="age"
                  value={profile.age}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Blood Type</label>
                <input
                  type="text"
                  name="blood"
                  value={profile.blood}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={profile.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Address</label>
                <input
                  type="text"
                  name="address"
                  value={profile.address}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Medical History</label>
              <textarea
                name="medicalHistory"
                value={profile.medicalHistory}
                onChange={handleInputChange}
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
              />
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
              <h3 className="text-lg font-bold text-gray-800 mb-4">Personal Information</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600">Full Name</p>
                  <p className="text-lg font-semibold text-gray-800">{profile.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="text-lg font-semibold text-gray-800">{profile.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Age</p>
                  <p className="text-lg font-semibold text-gray-800">{profile.age} years</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Blood Type</p>
                  <p className="text-lg font-semibold text-gray-800">{profile.blood}</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Contact Information</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600">Phone Number</p>
                  <p className="text-lg font-semibold text-gray-800">{profile.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Address</p>
                  <p className="text-lg font-semibold text-gray-800">{profile.address}</p>
                </div>
              </div>
            </div>

            <div className="md:col-span-2 bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Medical History</h3>
              <p className="text-gray-800">{profile.medicalHistory}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
