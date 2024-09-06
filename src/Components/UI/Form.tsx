import { useState } from 'react';

function FormShortlister() {
  const [experiance, setExperiance] = useState('');
  const [education, setEducation] = useState('');
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState('');
  const [location, setLocation] = useState('');
  const [error, setError] = useState({});

  const handleData = () => {
    const data = {
      experiance,
      education,
      skills,
      location,
    };
    console.log(data);
    setExperiance('')
    setEducation('')
    setNewSkill('')
    setSkills([])
    setLocation('')    
  };

  const validateForm = () => {
    const errors = {};
    if (!experiance) errors.experiance = 'Experiance is required';
    if (!education) errors.education = 'Education is required';
    if (!location) errors.location = 'Location is required';
    if (skills.length === 0) errors.skills = 'At least one skill is required';
    setError(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e:Event) => {
    e.preventDefault();
    if (validateForm()) {
      handleData();
    }
  };

  return (
    <div className='flex flex-col w-[500px] rounded-md justify-center items-start gap-5 border py-10 px-10'>
      <div className='text-xl font-bold'>Give your Requirements</div>
      <form className='flex flex-col justify-center items-start gap-5'>
        <div className='flex gap-2'>
        <input
        className='border px-2 py-2 rounded-md'
        type="text"
        placeholder="Experiance"
        value={experiance}
        onChange={(e) => setExperiance(e.target.value)}
        />
        {error.experiance && <div style={{ color: 'red' }}>{error.experiance}</div>}
        <input
        className='border px-2 py-2 rounded-md'
        type="text"
        placeholder="Education"
        value={education}
        onChange={(e) => setEducation(e.target.value)}
        />
        </div>
        {error.education && <div style={{ color: 'red' }}>{error.education}</div>}
        <div className="flex gap-2">
          <input
            className='border px-2 py-2 rounded-md'
            type="text"
            placeholder="Skills"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
          />
          <button
          className='px-4 py-1 bg-blue-400 rounded-md text-sm'
            onClick={(e) => {
              e.preventDefault();
              if (newSkill !== '') {
                setSkills([...skills, newSkill]);
                setNewSkill('');
              }
            }}
          >
            Add Skill
          </button>
        </div>
        {error.skills && <div style={{ color: 'red' }}>{error.skills}</div>}
        {skills.length > 0 ? 
        <ul className='flex gap-2 flex-wrap'>
          {skills.map((skill, index) => (
            <li className='py-2 px-4 text-sm borde bg-blue-200 rounded-md' key={index}>{skill}</li>
          ))}
        </ul>:''
        }
        <input
        className='border px-2 py-2 rounded-md'
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        {error.location && <div style={{ color: 'red' }}>{error.location}</div>}
        <button className='px-4 py-1 bg-blue-900 rounded-md text-sm text-white' type="submit" onClick={()=>handleSubmit}>Submit</button>
        </form>
    </div>
  )}
  
  export default FormShortlister