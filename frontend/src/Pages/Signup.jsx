import { useState } from 'react';
// import React from 'react';
import { toast, Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import axios from 'axios';
import board from '../assets/images/board.png';
import logofullsvg from '../assets/images/logo-full.svg';


const Signup = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    };

    const handleSignupClick = async (e) => {
        e.preventDefault();
        if (formData.name === '' || formData.email === '' || formData.password === '') {
            toast.error('All fields are required');
            return;
        }

        try {
            const response = await axios.post(`http://localhost:3000/api/v1/tasks/users`, {
                username: formData.name,
                email: formData.email,
                password: formData.password
            });

            const data = response.data;
            console.log(data);

            if (data.message === 'User Created') {
                toast.success('Successfully signed up');
            } else {
                toast.error(data.message);
            }
        } catch (err) {
            toast.error(err.response.data.message || 'Something went wrong')
            console.error(err);
        }
    };

    return (
        <>
        <Toaster />
        <main className="w-screen h-screen grid grid-cols-1 lg:grid-cols-2">
      <section className="place-items-center bg-primary-gradient hidden lg:grid">
        <div>
          <div className="text-white">
            <h1 className="text-lg font-medium">Welcome to Task.it</h1>
            <div className="flex space-x-2 items-center">
              <p>Tasks done right!</p>
              <div className="rounded-full bg-green-500 px-1">
                <i className="ri-check-double-line"></i>
              </div>
            </div>
            <div className="rounded-md shadow-lg mt-6">
              <img
                src={board}
                alt="Board"
                height="400"
                width="500"
                className="rounded-md"
              />
            </div>
          </div>
        </div>
      </section>
      <section className="grid place-items-center bg-white">
        <div className="max-w-lg lg:w-10/12 w-9/12">
          <header className="mb-6 flex justify-center">
            <img src={logofullsvg} height="65" width="170" alt="Task.it" />
          </header>
          <form className="p-6 bg-white rounded-md" >
            
              <div className="form-group pb-4">
                <label htmlFor="Name">Name</label>
                {/* <input
                  className="w-full"
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  autoFocus
                /> */}
                <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:border-blue-500"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                />
              </div>
              {/* <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input
                  className="w-full"
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div> */}
           
            <div className="form-group pb-4">
              <label htmlFor="email">Email</label>
              {/* <input
                className="w-full"
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
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
                value={formData.password}
                onChange={handleChange}
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
            {/* <div className="form-group">
              <label htmlFor="org">Org Name</label>
              <input
                className="w-full"
                type="text"
                id="org"
                name="org"
                value={formData.org}
                onChange={handleChange}
              />
            </div> */}
            <footer className="flex justify-end space-x-4 mt-4">
              {/* <button
                type="button"
                className="bg-gray-100 text-gray-800 border focus:ring-2 focus:ring-primary focus:ring-offset-2 hover:bg-gray-200 px-3 py-2 rounded"
                
              >
                Cancel
              </button> */}
              <button
                type="button"
                onClick={handleSignupClick}
                className="bg-primary-gradient text-white shadow-md focus:ring-2 focus:ring-primary focus:ring-offset-2 hover:shadow-lg px-3 py-2 rounded"
                >
                Create Account
                </button>
              {/* <button
                type="submit"
                className="bg-primary-gradient text-white shadow-md focus:ring-2 focus:ring-primary focus:ring-offset-2 hover:shadow-lg px-3 py-2 rounded"
              >
                Create Account
              </button> */}
            </footer>
          </form>
          
          <div className="mt-8">
            <p className="text-center text-gray-500">Already have an account? 
            <Link to="/login" passHref>
                <p className="text-primary font-medium">Login</p>
            </Link>
              
            </p>
          </div>
        </div>
      </section>
    </main>
    </>
        

            /* <Toaster />

            <div className="flex justify-center items-center w-full min-h-screen bg-gray-100">
                <div className="lg:w-1/2 p-16 bg-white rounded-md shadow-lg">
                    <h1 className="text-3xl font-extrabold text-gray-800">Sign up</h1>
                    <form className="mt-4">
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                Your Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:border-blue-500"
                                placeholder="Enter your name"
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
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
                                onClick={handleSignupClick}
                                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue"
                            >
                                Signup
                            </button>
                        </div>
                    </form>
                    <div className="mt-4">
                        <Link to="/login" passHref>
                            <p className="text-blue-500 hover:underline inline-block">Back to Login</p>
                        </Link>
                    </div>
                </div>
            </div> */
   
    );
};

export default Signup;
