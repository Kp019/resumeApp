// src/components/PersonalDetailsForm.js
import React, { useState, useEffect } from 'react';

interface PersonalDetails {
  [key: string]: string;
}

interface PersonalDetailsFormProps {
  onSubmit: (formData: PersonalDetails) => void;
  personalDetails: PersonalDetails;
  onRemoveSection: () => void;
}

function PersonalDetailsForm({ onSubmit, personalDetails, onRemoveSection }:PersonalDetailsFormProps) {
  const [formData, setFormData] = useState<PersonalDetails>({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    github: '',
    linkedin: '',
  });

  useEffect(() => {
    if (personalDetails) {
      setFormData(personalDetails);
    }
  }, [personalDetails]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleRemove = () => {
    onRemoveSection();
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      address: '',
      github: '',
      linkedin: '',
    });
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-white">Personal Details</h2>
      {personalDetails.fullName ? (
        <div className="p-4 border rounded-md">
          <div className='text-white'>
            <p><strong>Full Name:</strong> {personalDetails.fullName}</p>
            <p><strong>Email:</strong> {personalDetails.email}</p>
            <p><strong>Phone:</strong> {personalDetails.phone}</p>
            <p><strong>Address:</strong> {personalDetails.address}</p>
            <p><strong>GitHub:</strong> {personalDetails.github}</p>
            <p><strong>LinkedIn:</strong> {personalDetails.linkedin}</p>
          </div>
          <button
            onClick={handleRemove}
            className="mt-4 py-2 px-4 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Remove Personal Details
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-lg font-medium text-gray-300">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-lg font-medium text-gray-300">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-lg font-medium text-gray-300">Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-lg font-medium text-gray-300">Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-lg font-medium text-gray-300">GitHub</label>
              <input
                type="url"
                name="github"
                value={formData.github}
                onChange={handleChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-lg font-medium text-gray-300">LinkedIn</label>
              <input
                type="url"
                name="linkedin"
                value={formData.linkedin}
                onChange={handleChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
          <button
            type="submit"
            className="mt-4 py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Save Personal Details
          </button>
        </form>
      )}
    </div>
  );
}

export default PersonalDetailsForm;
