import React, { useState } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    };

    const handleLoginClick = async (e) => {
        e.preventDefault();
        if (formData.email === '' || formData.password === '') {
            toast.error('All fields are required');
            return;
        }

        try {
            const response = await axios.post(`http://localhost:3000/api/v1/tasks/login`, {
                email: formData.email,
                password: formData.password
            });

            const data = response.data;
            console.log(data);
            
            if (data.status === 'success') {
                toast.success('Logged in successfully');
                const token = data?.token
                localStorage.setItem('token', token);
                localStorage.setItem('name', data?.user?.username);
                window.location.replace('/tasks');
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

            <div className="flex justify-center items-center w-full min-h-screen bg-gray-100">
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
            </div>
        </>
    );
};

export default Login;
