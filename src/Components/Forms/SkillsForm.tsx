// src/components/SkillsForm.js
import { useState } from 'react';

interface Skill {
  name: string;
}

interface Props {
  onSubmit: (skill: Skill) => void;
  onRemove: (index: number) => void;
  onClear: () => void;
  onRemoveSection: () => void;
  skills: Skill[];
}

function SkillsForm({ onSubmit, onRemove, onClear, skills }: Props) {
  const [formData, setFormData] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.trim() !== '') {
      onSubmit(formData.trim());
      setFormData('');
    }
  };

  // console.log(formData); // Commented out to avoid unnecessary console logs

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-white">Skills</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-lg font-medium text-gray-300">Skill</label>
          <input
            type="text"
            value={formData}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData(e.target.value)}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <button
          type="submit"
          className="mt-4 py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Add Skill
        </button>
      </form>

      {skills.length > 0 && (
        <>
          <ul className="mt-4 space-y-4">
            {skills.map((skill: Skill, index: number) => (
              <li key={index} className="p-4 border rounded-md flex justify-between items-center bg-white">
                <div className='text-black'>{skill}</div>
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
            Clear All Skills
          </button>
        </>
      )}
    </div>
  );
}

export default SkillsForm;