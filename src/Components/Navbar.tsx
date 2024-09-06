import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import LoginButton from "./UI/LoginButton";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isAuthenticated } = useAuth0();

  const handleProfileClick = () => {
    window.location.href = "/profile";
  };

  return (
    <div className="w-full fixed z-20">
      <nav className="bg-gray-900">
        <div className="container p-4 md:p-0 mx-auto flex justify-between items-center">
          <div className="text-white text-2xl">RESUMER</div>
          <div
            className={`flex flex-col gap-5 ${
              isOpen ? " justify-end items-end" : ""
            }`}
          >
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-white focus:outline-none"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d={
                      !isOpen
                        ? "M4 6h16M4 12h16m-7 6h7"
                        : "M6 18L18 6M6 6l12 12"
                    }
                  ></path>
                </svg>
              </button>
            </div>
            <div
              className={`md:flex items-center ${isOpen ? "block" : "hidden"} ${
                isOpen ? "relative" : ""
              } w-full md:w-auto p-5 rounded-md md:bg-transparent`}
            >
              <Link to="/">
                <div className={`block md:inline-block px-4 py-2 text-white`}>
                  Home
                </div>
              </Link>
              <Link to="/ResumeAnalyser">
                <div className={`block md:inline-block px-4 py-2 text-white`}>
                  Analyser
                </div>
              </Link>
              <Link to="/ResumeBuilder">
                <div className={`block md:inline-block px-4 py-2 text-white`}>
                  Builder
                </div>
              </Link>
              <Link to="/ResumeShortlister">
                <div className={`block md:inline-block px-4 py-2 text-white`}>
                  Shortlister
                </div>
              </Link>

              {/* <Link to='/cart' ><div className={`block md:inline-block px-4 py-2 text-white`}>Cart({length})</div></Link> */}
              {/* <div className="w-12 rounded-full" onClick={handleProfileClick}><ShowProfile/></div> */}
              <div>
                {isAuthenticated === true ? (
                  <div>
                    <img
                      onClick={handleProfileClick}
                      className="w-10 rounded-full"
                      src={user?.picture}
                      alt={user?.name}
                    />
                  </div>
                ) : (
                  <div className="text-white">
                    <LoginButton />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
