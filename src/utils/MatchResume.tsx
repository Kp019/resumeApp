const matchResumes = (resumes, requirements) => {
  return resumes.map(resume => {
    const matches = requirements.filter(req => resume.content.includes(req));
    return { ...resume, matchScore: matches.length / requirements.length };
  });
};


export default matchResumes
  