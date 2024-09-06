// import { useSelector } from 'react-redux';
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useEffect, useState } from "react";
import LoginButton from "../Components/UI/LoginButton";

interface User {
  user_id: string;
  email: string;
  name: string;
  picture: string;
}

function Admin() {
  const [MgmtTkn, setMgmtTkn] = useState<string>("");
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState<string>("");

  const {user, isLoading ,isAuthenticated} = useAuth0();

  const handleUserDelete = (id: string) => {
    console.log(id);
    const config = {
      method: "delete",
      maxBodyLength: Infinity,
      url: `https://dev-bpz3fesbt2epuh37.us.auth0.com/api/v2/users/${id}`,
      headers: {
        Authorization: `Bearer ${MgmtTkn}`,
        "Content-Type": "application/json",
      },
    };
    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        // getUsers()
        setUsers(users.filter((user) => user.user_id !== id));
        // getData()
      })
      .catch((error) => {
        console.log(error);
      });
  };

  async function getData() {
    const options = {
      method: "POST",
      url: "https://dev-bpz3fesbt2epuh37.us.auth0.com/oauth/token",
      headers: { "content-type": "application/json" },
      data: {
        client_id: "l9Md6MzYTwGbnZM0TnmFyC5QybWCmq4S",
        client_secret:
          "ctQrFX76xRrUC9EdE_72yfJJc5lOEGsz0s9ULT71OQYWIZBsBCkOLOuC7mn-C3_3",
        audience: "https://dev-bpz3fesbt2epuh37.us.auth0.com/api/v2/",
        grant_type: "client_credentials",
      },
    };

    try {
      const response = await axios(options);
      setMgmtTkn(response.data.access_token);
    } catch (error) {
      console.error(error);
    }
  }

  async function getUsers() {
    const options = {
      method: "GET",
      url: "https://dev-bpz3fesbt2epuh37.us.auth0.com/api/v2/users",
      headers: {
        Authorization: `Bearer ${MgmtTkn}`,
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await axios(options);
      setUsers(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getData();
    if (MgmtTkn) {
      getUsers();
    }
  }, [MgmtTkn]);


  if(isLoading){
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
    )
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

  if(user?.email !== 'krishnaprasadr666@gmail.com'){
    return (
      <div className="bg-gray-900 h-[100vh] flex flex-col justify-center items-center text-white gap-5">
        <div className="text-5xl font-bold text-center">Page not Found</div>
        <div onClick={()=>{window.location.href='/'}} className="px-4 py-1 bg-blue-500 rounded-md cursor-pointer">Home</div>
      </div>
    )
  }


  return (
    <div className="bg-gray-950 text-white flex justify-center items-center flex-col py-10 h-[100vh]">
      <div className="overflow-y-auto w-full">
        <div className="flex justify-between w-full shadow-slate-800 shadow-lg px-10 py-4 rounded-full bg-slate-950">
          <div
            className="text-2xl cursor-pointer"
            onClick={() => (window.location.href = "/admin")}
          >
            Admin
          </div>
          <div
            className="text-2xl cursor-pointer text-slate-400"
            onClick={() => (window.location.href = "/")}
          >
            Home
          </div>
        </div>
        <div className="flex flex-col justify-center items-center pt-20">
          <div className="flex sm:flex-row flex-col gap-5 items-center pt-5 ">
            <div className="flex flex-col gap-12 items-center">
              <div className="text-5xl font-bold">Users</div>
              <input
                className=" sm:w-96 w-[300px] p-2 rounded-md bg-gray-900"
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
                type="text"
                placeholder="search via mail"
              />
            </div>
          </div>
          <div className="flex flex-wrap gap-5 justify-center items-center py-10">
            {users
              .filter((user) => user.email.includes(search))
              .map((user) => {
                return (
                  <div
                    className="flex sm:w-[300px] w-[300px] flex-col flex-wrap justify-center items-center rounded-md bg-gray-900 py-10 gap-5"
                    key={user.user_id}
                  >
                    <div className="w-40 overflow-hidden">
                      <img
                        className="w-40 rounded-md"
                        src={user.picture}
                        alt=""
                      />
                    </div>
                    <div className=" font-bold text-xl overflow-clip flex text-center">
                      {user.name}
                    </div>
                    <h1>{user.email}</h1>
                    <div className="flex gap-5">
                      <button
                        className="bg-blue-700 px-4 py-2 rounded-md"
                        onClick={() => handleUserDelete(user.user_id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;
