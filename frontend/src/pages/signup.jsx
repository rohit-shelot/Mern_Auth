import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const App = () => {
  const navigate = useNavigate();

  const [signupinfo, setsignupinfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setsignupinfo({ ...signupinfo, [name]: value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const { name, email, password } = signupinfo;
    if (!name || !email || !password) {
      return toast.error("All Fields Required");
    }

    try {
      const url = "http://localhost:3000/api/auth/signup";
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signupinfo),
      });
      const result = await response.json();

      if (response.ok) {
        toast.success(result.message);
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } else {
        toast.error(result.message || "Signup failed");
      }
    } catch (error) {
      toast.error(error.message || "An error occurred during signup");
    }
  };

  return (
    <div className="w-screen h-screen bg-gradient-to-br from-purple-400 to-purple-600 flex justify-center items-center">
      <div className="w-[400px] bg-gray-200 rounded-xl p-8">
        <h1 className="text-center mb-6 text-2xl uppercase font-bold font-poppins">
          Sign Up
        </h1>
        <form onSubmit={handleSignup} className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label className="text-[18px] font-medium">Name</label>
            <TextField
              name="name"
              label="Enter Name"
              variant="outlined"
              onChange={handleChange}
              value={signupinfo.name}
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[18px] font-medium">Email</label>
            <TextField
              name="email"
              label="Enter Email"
              variant="outlined"
              type="email"
              autoComplete="email"
              onChange={handleChange}
              value={signupinfo.email}
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[18px] font-medium">Password</label>
            <TextField
              name="password"
              label="Enter Password"
              type="password"
              autoComplete="current-password"
              variant="outlined"
              onChange={handleChange}
              value={signupinfo.password}
              required
            />
          </div>

          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded transition duration-300"
          >
            Submit
          </button>

          <h3 className="text-sm text-center">
            Already have an Account?{" "}
            <span
              className="text-blue-600 hover:underline hover:cursor-pointer"
              onClick={() => {
                navigate("/login");
              }}
            >
              Login
            </span>
          </h3>
        </form>
      </div>
    </div>
  );
};

export default App;
