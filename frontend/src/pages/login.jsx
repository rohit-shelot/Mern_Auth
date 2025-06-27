import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [logininfo, setlogininfo] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setlogininfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
  e.preventDefault();
  const { email, password } = logininfo;

  if (!email || !password) {
    return toast.error("All Fields Required");
  }

  try {
    const url = "http://localhost:3000/api/auth/login";
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(logininfo),
    });

    const result = await response.json();

    if (response.ok && result.success) {
      localStorage.setItem("token", result.logintoken);
      localStorage.setItem("LoggedInUser", result.name);
      toast.success(result.message || "Login successful");

      setTimeout(() => {
        navigate("/home");
      }, 1000);
    } else {
      toast.error(result.message || "Login failed");
    }
  } catch (error) {
    toast.error(error.message || "An error occurred during login");
  }
};


  return (
    <div className="w-screen h-screen bg-gradient-to-br from-purple-400 to-purple-600 flex justify-center items-center">
      <div className="bg-gray-200 rounded-xl w-[400px] p-8 shadow-md">
        <h1 className="text-center text-[24px] uppercase font-poppins font-bold mb-6">
          Login
        </h1>
        <form onSubmit={handleLogin} className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label className="text-[18px] font-medium" htmlFor="email">
              Email
            </label>
            <TextField
              name="email"
              id="outlined-email-input"
              label="Enter Email"
              variant="outlined"
              type="email"
              autoComplete="email"
              required
              onChange={handleChange}
              value={logininfo.email}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[18px] font-medium" htmlFor="password">
              Password
            </label>
            <TextField
              name="password"
              id="outlined-password-input"
              label="Enter Password"
              type="password"
              autoComplete="current-password"
              variant="outlined"
              required
              onChange={handleChange}
              value={logininfo.password}
            />
          </div>

          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded transition-colors duration-300"
          >
            Submit
          </button>
        </form>
        <p className="mt-4 text-sm">
          Don't have an account?{" "}
          <span
            className="text-blue-600 hover:cursor-pointer hover:underline"
            onClick={() => {
              navigate("/signup");
            }}
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
