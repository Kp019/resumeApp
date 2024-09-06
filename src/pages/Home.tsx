import { useNavigate } from "react-router-dom"
import Spline from '@splinetool/react-spline';
import Navbar from "../Components/Navbar";
import { useEffect, useState } from "react";

export const Home = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        setTimeout(() => {
            setLoading(false)
        }, 1000);
    })

    if(loading){
        return(
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
        )
    }

    return (
        <div className="flex flex-col gap-5 relative h-[100vh] w-screen overflow-hidden">
            <div className="z-10 w-full">
                <Navbar/>
            </div>
            <div className=" absolute z-10 text-white flex flex-col gap-5 lg:m-40 sm:m-20 m-5 flex-wrap pointer-events-none bottom-0">
                <h1 className="lg:text-7xl sm:text-5xl text-5xl font-bold lg:mr-20">Welcome to Your Ultimate Resume Solutions</h1>
                <h1 className="text-3xl  font-bold sm:pt-20 pt-5 text-slate-500">Our Services</h1>
                <div className="flex gap-5 pointer-events-auto flex-wrap">
                    <button className=" bg-gradient-to-tr from-gray-900 to-slate-900 border border-blue-950 px-6 py-2 rounded-md sm:text-xl text-sm hover:scale-105 hover:bg-gradient-to-bl hover:from-slate-900 hover:to-gray-600 duration-300" onClick={()=>navigate('/ResumeAnalyser')}>Resume Analyser</button>
                    <button className=" bg-gradient-to-tr from-gray-900 to-slate-900 border border-blue-950 px-6 py-2 rounded-md sm:text-xl text-sm hover:scale-105 hover:bg-gradient-to-bl hover:from-slate-900 hover:to-gray-600 duration-300" onClick={()=>window.location.href = '/ResumeBuilder'}>Resume Builder</button>
                    <button className=" bg-gradient-to-tr from-gray-900 to-slate-900 border border-blue-950 px-6 py-2 rounded-md sm:text-xl text-sm hover:scale-105 hover:bg-gradient-to-bl hover:from-slate-900 hover:to-gray-600 duration-300" onClick={()=>window.location.href = '/ResumeShortlister'}>Resume Shortlister</button>
                </div>
            </div>
            <div className="relative w-full h-screen sm:translate-x-40 z-0 scale-150">
            <Spline
                scene = "https://prod.spline.design/mW5JItEfGQ63U4OZ/scene.splinecode"
            />
            </div>
        </div>
    )
}