import React, { useState } from 'react';
import InputField from '../../../common/InputField';
import Card from '../../../common/Card';

const DoctorProfile = () => {
  const [formData, setFormData] = useState({
    name: 'Dr. John Doe',
    registrationNumber: '12345',
    degree: 'MBBS, MD',
    specialization: 'Cardiology',
    fees: '500',
    mobile: '123-456-7890',
    gender: 'Male',
    dob: '1980-01-01',
    address: '123 Main St, Anytown, USA'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="p-4">
      <Card title="My Profile">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField label="Name" name="name" value={formData.name} onChange={handleChange} />
            <InputField label="Registration Number" name="registrationNumber" value={formData.registrationNumber} onChange={handleChange} />
            <InputField label="Degree" name="degree" value={formData.degree} onChange={handleChange} />
            <InputField label="Specialization" name="specialization" value={formData.specialization} onChange={handleChange} />
            <InputField label="Fees" name="fees" value={formData.fees} onChange={handleChange} />
            <InputField label="Mobile" name="mobile" value={formData.mobile} onChange={handleChange} />
            <InputField label="Gender" name="gender" value={formData.gender} onChange={handleChange} />
            <InputField label="Date of Birth" name="dob" type="date" value={formData.dob} onChange={handleChange} />
            <InputField label="Address" name="address" value={formData.address} onChange={handleChange} />
          </div>
          <button type="submit" className="bg-indigo-500 text-white px-4 py-2 rounded-md mt-4">Save</button>
        </form>
      </Card>
    </div>
  );
};

export default DoctorProfile;