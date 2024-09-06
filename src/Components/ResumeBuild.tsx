import { PDFDownloadLink } from '@react-pdf/renderer';
import MyDocument from './Document';

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
  description:string;
}

interface Skill {
  name: string;
}

interface Project {
  title: string;
  description: string;
  link:string;
}

interface ResumeData {
  personalDetails: PersonalDetails;
  education: Education[];
  workExperience: WorkExperience[];
  skills: Skill[];
  projects: Project[];
}

// interface ResumeBuilderProps {
//   personalDetails: PersonalDetails;
//   education: Education[];
//   workExperience: WorkExperience[];
//   skills: Skill[];
//   projects: Project[];
// }

function ResumeBuilder({ personalDetails, education, workExperience, skills, projects }: ResumeData) {

  const data:ResumeData = {
    'personalDetails':personalDetails,
    'education':education,
    'workExperience':workExperience,
    'skills':skills,
    'projects': projects
  }

  console.log(data);

  return (
          <div>
            <PDFDownloadLink document={<MyDocument data={data} />} fileName="resume.pdf">
                {({ loading }) => (
                    <button className="bg-blue-500 text-white p-2 rounded hover:bg-blue-900 duration-300">
                        {loading ? 'Preparing document...' : 'Download PDF'}
                    </button>
                )}
            </PDFDownloadLink>
        </div>
  );
}

export default ResumeBuilder
