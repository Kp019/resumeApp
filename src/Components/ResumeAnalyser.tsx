import React, { useState } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "./UI/LoginButton";
import LogoutButton from "./UI/logoutButton";
import Navbar from "./Navbar";

interface Data {
  score: number;
  suggestions: string[];
  jobs: string[];
}

const FileUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState<string>("");
  const [data, setData] = useState<Data>({
    score: 0,
    suggestions: [],
    jobs: [],
  });
  const [job, setJob] = useState<string>("");
  const [preferedLocation, setPreferedLocation] = useState<string>("");
  const [loader, setLoader] = useState(false);

  const { user, isAuthenticated, isLoading } = useAuth0();
  console.log("user", user);

  // console.log(data.score);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files && e.target.files[0]);
  };

  const handleSetData = (jobs: string) => {
    setJob(jobs);
  };

  const handleFindJobs = async () => {
    console.log(job);

    const url = `https://www.indeed.com/jobs?q=${job}&l=${preferedLocation}`;
    window.open(url, "_blank");
  };

  const onFileUpload = async (e: Event) => {
    e.preventDefault();

    if (!file) {
      setMessage("Please select a PDF file.");
      return;
    }
    setLoader(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post("http://localhost:8000/analyse", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(res);
      setMessage('')
      setData(res.data);
      setLoader(false);
    } catch (error) {
      console.log(error);
    }
  };

  if (loader) {
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
    <div className="flex flex-col items-center w-full bg-slate-900 min-h-[100vh] text-white pb-20">
      <Navbar />
      <div className="border lg:w-[900px] sm:p-10 p-2 m-1 rounded-md flex justify-center flex-col mt-20">
        <div className="flex w-full justify-between items-center flex-wrap">
          <h2 className=" text-3xl">Upload PDF File</h2>
          <div className="text-red-400 cursor-pointer hover:bg-red-400 hover:text-white duration-300 px-4 py-2 rounded-md">
            <LogoutButton />
          </div>
        </div>
        <form className="pt-10 flex flex-wrap gap-2">
          <input
            className="text-xl w-72"
            type="file"
            onChange={onFileChange}
            accept="application/pdf"
          />
          {message}
          <button
            onClick={onFileUpload}
            className="bg-purple-500 px-4 py-2 rounded-md hover:bg-purple-900 duration-300"
            type="submit"
          >
            Upload
          </button>
        </form>
        {data.score > 0 && (
          <div className="pt-10 flex flex-col gap-7">
            <div className="text-3xl">Score: {data.score}</div>
            <div className="flex flex-col gap-3">
              <div className="text-xl font-bold text-slate-300">
                Suggestions
              </div>
              <div className="flex flex-wrap gap-2">
                {data.suggestions &&
                  data.suggestions.map((item) => {
                    return (
                      <h1 className="py-2 px-4 bg-slate-700 rounded-md text-sm">
                        {item}
                      </h1>
                    );
                  })}
              </div>
            </div>
          </div>
        )}
      </div>
      {data.jobs.length > 0 && (
        <div className="border lg:w-[900px] m-2 sm:p-10 p-2 rounded-md flex justify-center flex-col mt-10 gap-5">
          <input
            className="p-2 rounded-md text-black"
            type="text"
            onChange={(e) => setPreferedLocation(e.target.value)}
            placeholder="location"
            required
          />
          <div className="flex flex-col gap-5">
            <h1 className="text-xl text-slate-500">Select Job</h1>
            <div className="flex gap-5 flex-wrap">
              {data.jobs &&
                data.jobs.map((item) => {
                  return (
                    <h1
                      onClick={() => handleSetData(item)}
                      className={`px-4 py-2 rounded-sm cursor-pointer 
                                    ${
                                      item === job
                                        ? "bg-blue-500"
                                        : "bg-purple-500"
                                    }`}
                    >
                      {item}
                    </h1>
                  );
                })}
            </div>
            <button
              onClick={() => handleFindJobs()}
              className="px-4 py-2 bg-slate-500 rounded-md"
            >
              Search
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
