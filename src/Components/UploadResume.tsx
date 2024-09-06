import { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useDispatch, useSelector } from 'react-redux';
import { saveData, ResumeData } from '../Redux/Reducer/ResumeSlice';
import { addToHistory } from '../Redux/Reducer/ResumeHistorySlice';
import { RootState } from '../Redux/store';
import { Table } from './UI/Table';
import { useAuth0 } from '@auth0/auth0-react';
import LoginButton from './UI/LoginButton';
import LogoutButton from './UI/logoutButton';

const UploadResumes = () => {
  const {user, isAuthenticated} = useAuth0();
  const dispatch = useDispatch();

  const { data } = useSelector((state: RootState) => state.resumes);
  const userState = useSelector((state: RootState) => state.Users);
  const { flatHistory } = useSelector((state: RootState) => state.resumeHistory);

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [requirements, setRequirements] = useState<string>("");
  const [requirementList, setRequirementList] = useState<string[]>([]);
  const [jobTitle, setJobTitle] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false)
  const [histroyData, setHistoryData] = useState([])
  const [errors, setErrors] = useState({
    jobTitle: '',
    requirements: '',
  });

  useEffect(()=>{
    if (user) {
      const userHistory = flatHistory.filter(
        (item) => item.user === user.email
      );
      setHistoryData(userHistory)
  }}, [flatHistory, user])
  

  console.log('user',user);
  console.log(data);
  console.log('userState',userState);

  const onDrop = (acceptedFiles: File[]) => {
    setSelectedFiles(acceptedFiles);
  };

  const handleSubmit = async () => {
    if (!jobTitle) {
      setErrors({ ...errors, jobTitle: 'Job title is required' });
      return;
    }

    if (!requirements && requirementList.length === 0) {
      setErrors({ ...errors, requirements: 'Job requirements are required' });
      return;
    }

    if (selectedFiles.length === 0) {
      alert('Upload Resume')
      return;
    }

    setIsLoading(true);
    if (selectedFiles.length === 0 || requirementList.length === 0) {
      console.error("Please upload a resume and enter job requirements");
      return;
    }

    const formData = new FormData();
    requirementList.forEach((requirement) =>
      formData.append("requirements", requirement)
    );
    selectedFiles.forEach((file) => formData.append("files", file));
    console.log(jobTitle);
    
    formData.append("jobTitle", jobTitle.trim())
    formData.append("userState", JSON.stringify(user?.email));

    console.log(formData);
    
    try {
      const response = await fetch('http://localhost:8000/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data: ResumeData[] = await response.json() ?? [];
        console.log(data);
        dispatch(saveData(data)); // Save the locally stored uploaded data to Redux
        dispatch(addToHistory(data));
        setIsLoading(false) // Add the uploaded data to the history
      } else {
        console.error('Error uploading file');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleAddRequirement = () => {
    if (requirements !== "") {
      setRequirementList([...requirementList, requirements]);
      setRequirements("");
    }
  };

  const handleRemoveRequirement = (index: number) => {
    setRequirementList(requirementList.filter((_, i) => i !== index));
  };

  const handleRemoveFile = (index: number) => {
    setSelectedFiles(selectedFiles.filter((_, i) => i !== index));
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "application/pdf",
  });

  console.log(isAuthenticated);

  if(isLoading){
    return(
        <div className='bg-slate-900 h-[100vh] w-screen flex justify-center items-center'>
            <svg className='w-40' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 150"><path fill="none" stroke="#D300FF" stroke-width="15" stroke-linecap="round" stroke-dasharray="300 385" stroke-dashoffset="0" d="M275 75c0 31-27 50-50 50-58 0-92-100-150-100-28 0-50 22-50 50s23 50 50 50c58 0 92-100 150-100 24 0 50 19 50 50Z"><animate attributeName="stroke-dashoffset" calcMode="spline" dur="2" values="685;-685" keySplines="0 0 1 1" repeatCount="indefinite"></animate></path></svg>
        </div>
    )
}
  

  if(!isAuthenticated){
    return(
      <div className='text-white pointer-events-auto px-4 py-2 bg-slate-950 rounded-md'>
        <LoginButton/>
      </div>
    )
  }

  

  return (
    <div className="flex flex-col sm:mt-0 sm:gap-20 gap-10 relative justify-center items-center overflow-y-auto overflow-x-hidden w-full">
      <div className=' flex md:w-[700px] flex-col w-full mt-80 gap-10 sm:px-14 px-5 py-5 shadow-2xl bg-gradient-to-tr from-gray-900 border border-slate-700 rounded-md text-white'>
        <h1 className=' text-4xl capitalize font-bold text-center'>Resume Shortlister</h1>
        <div className="flex flex-col justify-center gap-2 pointer-events-auto">
            <input
              className="border p-2 rounded-md text-black"
              type="text"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              placeholder="Enter job Title"
              />
            {errors.jobTitle && <div className="text-red-500">{errors.jobTitle}</div>}
            <div className='flex flex-wrap gap-2'>
              <input
                className="sm:w-96 border p-2 rounded-md text-black"
                type="text"
                value={requirements}
                onChange={(e) => setRequirements(e.target.value.trim())}
                placeholder="Enter job requirements"
                />
              {errors.requirements && <div className="text-red-500">{errors.requirements}</div>}
              <button
                className="px-8 py-1 border border-purple-500 rounded-full hover:bg-purple-500 duration-300"
                onClick={handleAddRequirement}
                style={{ marginLeft: "10px" }}
                >
                Add
              </button>
            </div>
          </div>
        <ul
          className={` pointer-events-auto flex w-full flex-wrap gap-5 justify-center ${requirementList.length>0?'block':'hidden'}`}
          style={{ marginBottom: "10px" }}
          >
          {requirementList.map((requirement, index) => (
            <li
            className="px-4 py-2 bg-slate-700 rounded-full"
            key={index}
            >
              {requirement}<button onClick={()=>handleRemoveRequirement(index)} className='pl-5 text-red-500 text-xl'>x</button>
            </li>
          ))}
        </ul>
        <div className='pointer-events-auto'>
          <div
            className="border border-dashed border-gray-500 px-20 py-5 cursor-pointer text-center"
            {...getRootProps()}
            >
            <input {...getInputProps()} />
            <p>Drag 'n' drop PDF resumes here, or click to select files</p>
          </div>
          <ul className={`flex w-full flex-wrap justify-center gap-3 pt-10 ${selectedFiles.length>0?'block':'hidden'}`}>
            {selectedFiles.map((file, index) => (
              <li className="px-4 py-2 rounded-full bg-slate-700" key={index}>
                {file.name}
                <button onClick={()=>handleRemoveFile(index)} className='pl-5 text-red-500 text-xl'>x</button>
              </li>
            ))}
          </ul>
        </div>
        <div className='pointer-events-auto flex flex-wrap gap-5 items-center'>
          <button
            className="px-4 py-2 bg-purple-700 text-white rounded-md hover:bg-purple-950 duration-300"
            onClick={handleSubmit}
            >
            Upload and Process
          </button>
          {histroyData.length>0?
          <button
          className="px-4 py-2 border border-purple-700 text-white rounded-md hover:bg-purple-500 duration-300"
          onClick={()=>window.location.href='/candidates'}
          >
            View history
          </button>
          :''}
          <div className=' hover:text-red-500 duration-300'>
            <LogoutButton/>
          </div>
          </div>
      </div>
      <div className={`my-10 text-white pointer-events-auto`}>{data.length > 0 ? <Table props={data} />:''}</div>
    </div>
  );
};

export default UploadResumes;
