import React, { useState } from 'react';

const BookAppointment = () => {
  const [formData, setFormData] = useState({
    doctor: '',
    date: '',
    time: '',
    symptoms: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const doctors = [
    { id: 1, name: 'Dr. Sarah Johnson', specialty: 'General Practitioner' },
    { id: 2, name: 'Dr. Michael Chen', specialty: 'Cardiologist' },
    { id: 3, name: 'Dr. Emily Rodriguez', specialty: 'Dermatologist' },
    { id: 4, name: 'Dr. James Wilson', specialty: 'Orthopedist' },
    { id: 5, name: 'Dr. Lisa Anderson', specialty: 'Neurologist' },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.doctor || !formData.date || !formData.time || !formData.symptoms) {
      alert('Please fill in all fields!');
      return;
    }
    setSubmitted(true);
    setTimeout(() => {
      alert('Appointment booked successfully! You will receive a confirmation email shortly.');
      setFormData({ doctor: '', date: '', time: '', symptoms: '' });
      setSubmitted(false);
    }, 1500);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Book an Appointment</h1>
        <p className="text-gray-600 mb-8">Schedule a consultation with our experienced doctors</p>

        {submitted ? (
          <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
            <div className="text-4xl mb-4">✓</div>
            <h2 className="text-2xl font-bold text-green-800 mb-2">Appointment Booked!</h2>
            <p className="text-green-700">Your appointment has been successfully booked. Please check your email for confirmation details.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Doctor Selection */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Select Doctor *</label>
              <select
                name="doctor"
                value={formData.doctor}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
              >
                <option value="">Choose a doctor...</option>
                {doctors.map((doctor) => (
                  <option key={doctor.id} value={doctor.id}>
                    {doctor.name} - {doctor.specialty}
                  </option>
                ))}
              </select>
            </div>

            {/* Date Selection */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Appointment Date *</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
              />
            </div>

            {/* Time Selection */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Preferred Time *</label>
              <select
                name="time"
                value={formData.time}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
              >
                <option value="">Select time...</option>
                <option value="09:00 AM">09:00 AM</option>
                <option value="09:30 AM">09:30 AM</option>
                <option value="10:00 AM">10:00 AM</option>
                <option value="10:30 AM">10:30 AM</option>
                <option value="02:00 PM">02:00 PM</option>
                <option value="02:30 PM">02:30 PM</option>
                <option value="03:00 PM">03:00 PM</option>
                <option value="03:30 PM">03:30 PM</option>
              </select>
            </div>

            {/* Symptoms */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Describe Your Symptoms *</label>
              <textarea
                name="symptoms"
                value={formData.symptoms}
                onChange={handleInputChange}
                placeholder="Please describe your symptoms, concerns, or reason for visit..."
                rows="5"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-3 px-6 rounded-lg transition"
            >
              Book Appointment
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default BookAppointment;
