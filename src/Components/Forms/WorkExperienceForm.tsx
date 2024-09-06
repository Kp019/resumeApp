// src/components/WorkExperienceForm.js
import React, { useState } from 'react';

interface WorkExperience {
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface Props {
  onSubmit: (formData: WorkExperience) => void;
  onRemove: (index: number) => void;
  onClear: () => void;
  onRemoveSection: () => void;
  workExperience: WorkExperience[];
}


function WorkExperienceForm({ onSubmit, onRemove, onClear, workExperience }:Props) {
  const [formData, setFormData] = useState<WorkExperience>({
    company: '',
    position: '',
    startDate: '',
    endDate: '',
    description: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      description: '',
    });
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-white">Work Experience</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-lg font-medium text-gray-300">Company</label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-lg font-medium text-gray-300">Position</label>
          <input
            type="text"
            name="position"
            value={formData.position}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-lg font-medium text-gray-300">Start Date</label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-lg font-medium text-gray-300">End Date</label>
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>
        <div>
          <label className="block text-lg font-medium text-gray-300">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleTextAreaChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            rows={4}
          />
        </div>
        <button
          type="submit"
          className="mt-4 py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Add Work Experience
        </button>
      </form>

      {workExperience.length > 0 && (
        <>
          <ul className="mt-4 space-y-4">
            {workExperience.map((exp, index) => (
              <li key={index} className="p-4 border rounded-md flex justify-between items-center bg-white">
                <div>
                  <h3 className="text-lg font-semibold">{exp.company}</h3>
                  <p className="text-gray-600">{exp.position}</p>
                  <p className="text-gray-500">{exp.startDate} - {exp.endDate}</p>
                  <p>{exp.description}</p>
                </div>
                <button
                  onClick={() => onRemove(index)}
                  className="text-red-600 hover:text-red-800"
                >
                  Remove Content
                </button>
              </li>
            ))}
          </ul>
          <button
            onClick={onClear}
            className="mt-4 py-2 px-4 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Clear All Work Experience
          </button>
        </>
      )}
    </div>
  );
}

export default WorkExperienceForm;
