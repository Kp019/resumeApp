import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "./UI/logoutButton";
import LoginButton from "./UI/LoginButton";

function ShowProfile() {
    const { user, isAuthenticated, isLoading } = useAuth0();

    if(isLoading){
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
        isAuthenticated ? (<div className="flex flex-col justify-center items-center h-[100vh] bg-gray-900 text-white">
            <div className=" flex flex-col justify-center items-center py-20 px-10 gap-5 rounded-md">
                <img className=" w-40 rounded-full" src={user?.picture} alt={user?.name} />
                <div className="flex justify-center items-center flex-col gap-3">
                    <h2 className="text-4xl font-boldl">{user?.name}</h2>
                    <p className="text-xl">{user?.email}</p>
                </div>
                <div className="flex gap-3">
                  <LogoutButton/>
                  <button className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={()=>{window.location.href='/'}}>Home</button>
                </div>
                </div>
          </div>) : <div> <LoginButton/> </div>
      );
}

export default ShowProfile
