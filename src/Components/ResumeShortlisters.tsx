import { useSelector } from 'react-redux';
import UploadResumes from './UploadResume';
import Spline from '@splinetool/react-spline';
import { RootState } from '../Redux/store';
import Navbar from './Navbar';
import { useAuth0 } from '@auth0/auth0-react';

const ResumeShortlisters = () => {
  const { data } = useSelector((state: RootState) => state.resumes);
  const {isLoading} = useAuth0();
  console.log('data = ', data);

  if(isLoading){
    return(
        <div className='bg-slate-900 h-[100vh] flex justify-center items-center'>
            <svg className='w-40' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 150"><path fill="none" stroke="#D300FF" stroke-width="15" stroke-linecap="round" stroke-dasharray="300 385" stroke-dashoffset="0" d="M275 75c0 31-27 50-50 50-58 0-92-100-150-100-28 0-50 22-50 50s23 50 50 50c58 0 92-100 150-100 24 0 50 19 50 50Z"><animate attributeName="stroke-dashoffset" calcMode="spline" dur="2" values="685;-685" keySplines="0 0 1 1" repeatCount="indefinite"></animate></path></svg>
        </div>
    )
}

  
  return (
    <div className=' relative h-[100vh] flex flex-col w-full overflow-hidden'>
      <div className='top-0'>
        <Navbar/>
      </div>
      <div className='z-10 overflow-y-auto pointer-events-none top-0 relative flex flex-col justify-center items-center h-full'>
        <UploadResumes/>
      </div>
      {/* <div className='z-20 mt-10 text-white'>{data.length > 0 ? <Table props={data} /> : ""}</div> */}
      <div className=' absolute z-0 h-full w-full scale-150'>
      <Spline
        scene = "https://prod.spline.design/mW5JItEfGQ63U4OZ/scene.splinecode"
        />
      </div>
    </div>
  );
};

export default ResumeShortlisters;