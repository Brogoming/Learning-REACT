import { useState } from "react";
import { baseUrl } from "../shared";
import { useLocation, useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const location = useLocation();
  const navigate = useNavigate();

  function login(e) {
    e.preventDefault(); //doesn't reload the page when we submit
    const url = baseUrl + "api/token/";
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        localStorage.setItem("access", data.access);
        localStorage.setItem("refresh", data.refresh);
        navigate(location?.state?.previousUrl ? location.state.previousUrl : '/customers');
      });
  }

  return (
    <form id="customer" onSubmit={login} className="m-2 w-full max-w-sm">
      <div className="md:flex md:items-center mb-6">
        <div className="md:w-1/4">
          <label for="username">Username</label>
        </div>
        <div className="md:w-3/4">
          <input
            id="username"
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-red-500"
            type="text"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </div>
      </div>
      <div className="md:flex md:items-center mb-6">
        <div className="md:w-1/4">
          <label id="password">Password</label>
        </div>
        <div className="md:w-3/4">
          <input
            id="password"
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-red-500"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
      </div>
      <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
        Login
      </button>
    </form>
  );
}
