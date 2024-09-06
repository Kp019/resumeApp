import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import moment from "moment";
import { useAuth0 } from "@auth0/auth0-react";
import { RootState } from "../Redux/store";
import { Link } from "react-router-dom";
import LoginButton from "../Components/UI/LoginButton";

interface GeneralInfo {
  [key: string]: string;
}

interface Education {
  id: number;
  degree: string;
  school: string;
  startDate: string;
  endDate: string;
  fieldOfStudy: string;
}

interface WorkExperience {
  id: number;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description:string;
}

interface Skill {
  id: number;
  name: string;
}

interface Project {
  id: number;
  title: string;
  description: string;
  link:string;
}

interface Sections {
  generalInfo: GeneralInfo[];
  education: Education[];
  experience: WorkExperience[];
  skills: Skill[];
  projects: Project[];
}

interface ResumeHistoryItem {
  Date: string;
  jobTitle: string;
  score: number;
  sections: Sections;
  filename: string;
  user: string;
}

function ViewResult() {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const { flatHistory } = useSelector(
    (state: RootState) => state.resumeHistory
  );
  const [jobFilter, setJobFilter] = useState<string>("");
  const [dateFilter, setDateFilter] = useState<string>("");
  const [nameFilter, setNameFilter] = useState<string>("");
  const [historyData, setHistoryData] = useState<ResumeHistoryItem[]>([]);
  const [loading, setLoading] = useState(true)
  const [url,setUrl] = useState('')
  console.log(url);
  
  console.log(flatHistory);

  useEffect(() => {
    if (flatHistory.length > 0 && historyData.length > 0) {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }

    if (user) {
      const userHistory = flatHistory.filter(
        (item) => item.user === user.email
      );
      
      setHistoryData(userHistory);
    }
  }, [flatHistory, historyData.length, user]);
  
  console.log(historyData);
  const filteredHistory = historyData.filter((item: ResumeHistoryItem) => {
    const jobMatch = jobFilter
      ? item.jobTitle &&
        item.jobTitle.toLowerCase().includes(jobFilter.toLowerCase())
      : true;
    const dateMatch = dateFilter
      ? item.Date &&
        moment(item.Date, "DD/MM/YYYY").isSame(
          moment(dateFilter, "YYYY-MM-DD")
        )
      : true;
    const nameMatch = nameFilter
      ? item.sections &&
        item.sections.generalInfo &&
        item.sections.generalInfo[0] &&
        item.sections.generalInfo[0].Name &&
        item.sections.generalInfo[0].Name.toLowerCase().includes(
          nameFilter.toLowerCase()
        )
      : true;
    return jobMatch && dateMatch && nameMatch;
  });

  console.log(filteredHistory);


  if (loading && isLoading) {
    return (
      <div className="bg-slate-900 h-[100vh] w-screen flex justify-center items-center">
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

  if(!isAuthenticated){
    return(
        <div className="text-black pointer-events-auto h-[100vh] justify-center items-center bg-gray-950">
        <div className=" flex h-full justify-center items-center">
          <div className="text-white pointer-events-auto px-4 py-2 bg-slate-800 rounded-md justify-center items-center">
            <LoginButton />
          </div>
        </div>
      </div>
    )
  }

  if(historyData.length === 0){
    return (
      <div className="bg-gray-900 h-[100vh] flex flex-col justify-center items-center text-white gap-5">
        <div className="text-5xl font-bold text-center">No data Found</div>
        <div onClick={()=>{window.location.href='/'}} className="px-4 py-1 bg-blue-500 rounded-md">Home</div>
      </div>
    )
  }

  return (
    <div className="p-4 bg-gradient-to-tr from-slate-900 to-gray-900 text-white h-[100vh] overflow-hidden w-screen lg:px-40">
      <div className="flex w-full justify-between items-center py-10">
        <h1 className="text-3xl font-bold mb-4">Resume History</h1>
        <div className="text-xl px-4 py-2 bg-slate-500 rounded-md cursor-pointer" onClick={()=>window.location.href='/ResumeShortlister'}>back</div>
      </div>
      <div className="flex flex-wrap mb-4 gap-2">
        <input
          type="text"
          value={jobFilter}
          onChange={(e) => setJobFilter(e.target.value)}
          placeholder="Filter by job title"
          className="w-full md:w-1/4 px-3 py-2 mb-2 md:mb-0 text-black rounded-md"
        />
        <input
          type="text"
          value={nameFilter}
          onChange={(e) => setNameFilter(e.target.value)}
          placeholder="Filter by name"
          className="w-full md:w-1/4 px-3 py-2 mb-2 md:mb-0 text-black rounded-md"
        />
        <input
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          placeholder="Filter by date"
          className="w-full md:w-1/4 px-3 py-2 mb-2 md:mb-0 text-black rounded-md"
        />
      </div>
      <div className="w-full overflow-y-auto">
      <table className="table-auto w-full text-sm text-left text-gray-500 dark:text-gray-400 overflow-x-auto rounded-md">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th className="px-6 py-3 font-bold">Date</th>
            <th className="px-6 py-3 font-bold">Job Title</th>
            <th className="px-6 py-3 font-bold">Score</th>
            <th className="px-6 py-3 font-bold">Name</th>
            <th className="px-6 py-3 font-bold">email</th>
            <th className="px-6 py-3 font-bold">File</th>
          </tr>
        </thead>
        <tbody>
          {filteredHistory.map((item, index) => (
            <tr
              key={index}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100 hover:text-black duration-300"
            >
              <td className="px-6 py-4">{item.Date}</td>
              <td className="px-6 py-4">{item?.jobTitle}</td>
              <td className="px-6 py-4">{item.score}</td>
              <td className="px-6 py-4">
                {item.sections &&
                  item.sections.generalInfo &&
                  item.sections.generalInfo[0] &&
                  item.sections.generalInfo[0].Name}
              </td>
              <td className="px-6 py-4">{item.sections.generalInfo[0].Email}</td>
              {/* <td className="px-6 py-4">{item.filename}</td> */}
              <td className="px-4 py-2 text-blue-500">
                  <Link to={`/view/${item.filename}`} onClick={() => setUrl(item.filename)} target='_blank'>
                    click me
                  </Link>
                </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
}

export default ViewResult;
