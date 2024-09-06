// src/components/ProjectsForm.js
import React, { useState } from 'react';

interface Project {
  title: string;
  description: string;
  link: string;
}

interface ProjectsFormProps {
  onSubmit: (project: Project) => void;
  onRemove: (index: number) => void;
  onClear: () => void;
  projects: Project[];
}

function ProjectsForm({ onSubmit, onRemove, onClear, projects }:ProjectsFormProps) {
  const [formData, setFormData] = useState<Project>({
    title: '',
    description: '',
    link: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedFormData = Object.fromEntries(
      Object.entries(formData).map(([key, value]) => [key, value.trim()])
    );
    onSubmit(trimmedFormData);
    setFormData({
      title: '',
      description: '',
      link: '',
    });
    setFormData({
      title: '',
      description: '',
      link: '',
    });
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <h2 className="text-2xl font-semibold text-white">Projects</h2>
        <div>
          <label className="block text-lg font-medium text-gray-300">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
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
        <div>
          <label className="block text-lg font-medium text-gray-300">Link</label>
          <input
            type="url"
            name="link"
            value={formData.link}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <button
          type="submit"
          className="mt-4 py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Add Project
        </button>
      </form>

      {projects.length > 0 && (
        <>
          <ul className="mt-4 space-y-4">
            {projects.map((project, index) => (
              <li key={index} className="p-4 border rounded-md flex justify-between items-center bg-white">
                <div>
                  <h3 className="text-lg font-semibold">{project.title}</h3>
                  <p className="text-gray-600">{project.description}</p>
                  {project.link && (
                    <a href={project.link} className="text-indigo-600 hover:text-indigo-800">
                      {project.link}
                    </a>
                  )}
                </div>
                <button
                  onClick={() => onRemove(index)}
                  className="text-red-600 hover:text-red-800"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <button
            onClick={onClear}
            className="mt-4 py-2 px-4 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Clear All Projects
          </button>
        </>
      )}
    </div>
  );
}

export default ProjectsForm;
