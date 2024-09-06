import { useState } from "react";
import ResumeBuilder from "../Components/ResumeBuild";
import PersonalDetailsForm from "../Components/Forms/PersonalDetailsForm";
import EducationForm from "../Components/Forms/EducationForm";
import WorkExperienceForm from "../Components/Forms/WorkExperienceForm";
import SkillsForm from "../Components/Forms/SkillsForm";
import ProjectsForm from "../Components/Forms/ProjectForm";
import Navbar from "../Components/Navbar";
import LoginButton from "../Components/UI/LoginButton";
import { useAuth0 } from "@auth0/auth0-react";

interface PersonalDetails {
  [key: string]: string;
}

interface Education {
  degree: string;
  school: string;
  startDate: string;
  endDate: string;
  fieldOfStudy: string;
}

interface WorkExperience {
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface Skill {
  name: string;
}

interface Project {
  title: string;
  description: string;
  link: string;
}

interface ShowSection {
  personalDetails: boolean;
  education: boolean;
  workExperience: boolean;
  skills: boolean;
  projects: boolean;
}

function Resume_Builder() {
  const [personalDetails, setPersonalDetails] = useState<PersonalDetails>({});
  const [education, setEducation] = useState<Education[]>([]);
  const [workExperience, setWorkExperience] = useState<WorkExperience[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [showSection, setShowSection] = useState<ShowSection>({
    personalDetails: true,
    education: true,
    workExperience: true,
    skills: true,
    projects: true,
  });

  const { isAuthenticated, isLoading } = useAuth0();

  const handlePersonalDetails = (details: PersonalDetails) =>
    setPersonalDetails(details);

  const handleAddEducation = (edu: Education) =>
    setEducation([...education, edu]);
  const handleRemoveEducation = (index: number) => {
    setEducation(education.filter((_, i) => i !== index));
  };
  const handleClearEducation = () => setEducation([]);
  // const handleRemoveEducationSection = () => {
  //   setEducation([]);
  //   setShowSection({ ...showSection, education: false });
  // };

  const handleAddWorkExperience = (exp: WorkExperience) =>
    setWorkExperience([...workExperience, exp]);
  const handleRemoveWorkExperience = (index: number) => {
    setWorkExperience(workExperience.filter((_, i) => i !== index));
  };
  const handleClearWorkExperience = () => setWorkExperience([]);
  const handleRemoveWorkExperienceSection = () => {
    setWorkExperience([]);
    setShowSection({ ...showSection, workExperience: false });
  };

  const handleAddSkill = (skill: Skill) => setSkills([...skills, skill]);
  const handleRemoveSkill = (index: number) => {
    setSkills(skills.filter((_, i) => i !== index));
  };
  const handleClearSkills = () => setSkills([]);
  const handleRemoveSkillsSection = () => {
    setSkills([]);
    setShowSection({ ...showSection, skills: false });
  };

  const handleAddProject = (project: Project) =>
    setProjects([...projects, project]);
  const handleRemoveProject = (index: number) => {
    setProjects(projects.filter((_, i) => i !== index));
  };
  const handleClearProjects = () => setProjects([]);
  // const handleRemoveProjectsSection = () => {
  //   setProjects([]);
  //   setShowSection({ ...showSection, projects: false });
  // };

  const handleRemovePersonalDetailsSection = () => {
    setPersonalDetails({});
    setShowSection({ ...showSection, personalDetails: true });
  };

  if (isLoading) {
    return (
      <div className="bg-slate-900 h-[100vh] flex justify-center items-center">
        <svg
          className="w-40"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 300 150"
        >
          <path
            fill="none"
            stroke="#D300FF"
            stroke-width="15"
            stroke-linecap="round"
            stroke-dasharray="300 385"
            stroke-dashoffset="0"
            d="M275 75c0 31-27 50-50 50-58 0-92-100-150-100-28 0-50 22-50 50s23 50 50 50c58 0 92-100 150-100 24 0 50 19 50 50Z"
          >
            <animate
              attributeName="stroke-dashoffset"
              calcMode="spline"
              dur="2"
              values="685;-685"
              keySplines="0 0 1 1"
              repeatCount="indefinite"
            ></animate>
          </path>
        </svg>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="text-black pointer-events-auto h-[100vh] justify-center bg-gray-950">
        <Navbar />
        <div className=" flex justify-center items-center h-full">
          <div className="text-white pointer-events-auto px-4 py-2 bg-slate-800 rounded-md flex justify-center items-center">
            <LoginButton />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-tr from-gray-900 to-slate-900 flex flex-col w-full">
      <div className="">
      <Navbar />
      </div>
      <div className="flex flex-col justify-center items-center bg-gray-900 sm:p-6 rounded-lg shadow-2xl shadow-blue-950 text-white w-full mt-40">
        <h1 className="text-4xl font-bold text-center mb-8">Resume Builder</h1>
        <div className="p-6 rounded-lg shadow-lg space-y-6 text-black sm:w-2/3 w-full">
          {showSection.personalDetails && (
            <PersonalDetailsForm
              onSubmit={handlePersonalDetails}
              personalDetails={personalDetails}
              onRemoveSection={handleRemovePersonalDetailsSection}
            />
          )}
          {showSection.education && (
            <EducationForm
              onSubmit={handleAddEducation}
              onRemove={handleRemoveEducation}
              onClear={handleClearEducation}
              // onRemoveSection={handleRemoveEducationSection}
              education={education}
            />
          )}
          {showSection.workExperience && (
            <WorkExperienceForm
              onSubmit={handleAddWorkExperience}
              onRemove={handleRemoveWorkExperience}
              onClear={handleClearWorkExperience}
              onRemoveSection={handleRemoveWorkExperienceSection}
              workExperience={workExperience}
            />
          )}
          {showSection.skills && (
            <SkillsForm
              onSubmit={handleAddSkill}
              onRemove={handleRemoveSkill}
              onClear={handleClearSkills}
              onRemoveSection={handleRemoveSkillsSection}
              skills={skills}
            />
          )}
          {showSection.projects && (
            <ProjectsForm
              onSubmit={handleAddProject}
              onRemove={handleRemoveProject}
              onClear={handleClearProjects}
              // onRemoveSection={handleRemoveProjectsSection}
              projects={projects}
            />
          )}
          <ResumeBuilder
            personalDetails={personalDetails}
            education={education}
            workExperience={workExperience}
            skills={skills}
            projects={projects}
          />
        </div>
      </div>
    </div>
  );
}

export default Resume_Builder;
