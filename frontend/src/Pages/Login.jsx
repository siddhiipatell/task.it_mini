import  { useState } from "react";
// import React from 'react';
import { toast, Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import axios from "axios";
import logofullsvg from '../assets/images/logo-full.svg';


const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleLoginClick = async (e) => {
    e.preventDefault();
    if (formData.email === "" || formData.password === "") {
      toast.error("All fields are required");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:3000/api/v1/tasks/login`,
        {
          email: formData.email,
          password: formData.password,
        }
      );

      const data = response.data;
      console.log(data);

      if (data.status === "success") {
        toast.success("Logged in successfully");
        const token = data?.token;
        localStorage.setItem("token", token);
        localStorage.setItem("name", data?.user?.username);
        window.location.replace("/tasks");
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.response.data.message || "Something went wrong");
      console.error(err);
    }
  };

  return (
    <>
      <Toaster />

      <div className="w-screen h-screen bg-primary-gradient flex items-center justify-center px-5 py-5">
        <div
          className="w-full mx-auto rounded-md shadow-lg items-center bg-white py-7 px-4"
          style={{ maxWidth: "440px" }}
        >
          <div className="max-w-lg">
            <header className="mb-6 flex justify-center">
              <img
                src={logofullsvg}
                height="65"
                width="170"
                alt="Task.it"
              />
            </header>
            <div className="text-center">
              <h1 className="text-lg font-medium pt-6 pb-2">Welcome</h1>
              <p>Log in to Task.it to continue to Task.it App</p>
            </div>
            <form className="p-6 bg-white rounded-md" id="signupForm">
              <div className="form-group pb-4">
                <label htmlFor="email">Email</label>
                {/* <input
                  className="w-full"
                  type="email"
                  id="email"
                  name="email"
                /> */}
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:border-blue-500"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="form-group pb-4">
                <label htmlFor="password">Password</label>
                {/* <input
                  className="w-full"
                  type="password"
                  id="password"
                  name="password"
                /> */}
                <input
                  type="password"
                  id="password"
                  className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:border-blue-500"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
              </div>
              {/* <p className="text-primary">Forgot password?</p> */}
            </form>
            <div className="px-6 pt-4 bg-white rounded-md flex justify-center">
              <button
                type="button"
                onClick={handleLoginClick}
                className="w-full bg-primary-gradient text-white shadow-md focus:ring-2 focus:ring-primary focus:ring-offset-2 hover:shadow-lg py-3 rounded"
              >
                Login to Task.it
              </button>
              {/* <button
                type="button"
                onClick={handleLoginClick}
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue"
              >
                Login
              </button> */}
            </div>
            <div className="mt-8">
              <p className="text-center text-gray-500">
                Dont have an account yet? 
                <Link to="/signup" passHref>
                  <p className="text-blue-500 hover:underline inline-block">
                     Create an account
                  </p>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="flex justify-center items-center w-full min-h-screen bg-gray-100">
                <div className="lg:w-1/2 p-16 bg-white rounded-md shadow-lg">
                    <h1 className="text-3xl font-extrabold text-gray-800">Log in</h1>
                    <form className="mt-4">
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Your Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:border-blue-500"
                                placeholder="Enter your email"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Your Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:border-blue-500"
                                placeholder="Enter your password"
                                value={formData.password}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div>
                            <button
                                type="button"
                                onClick={handleLoginClick}
                                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue"
                            >
                                Login
                            </button>
                        </div>
                    </form>
                    <div className="mt-4">
                        <Link to="/signup" passHref>
                            <p className="text-blue-500 hover:underline inline-block">Create an account</p>
                        </Link>
                    </div>
                </div>
            </div> */}
    </>
  );
};

export default Login;
