import { useEffect, useState } from 'react';
import React from 'react';
import axios from 'axios';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                // Fetch user data from the server
                const name = localStorage.getItem('name');
                const response = await axios.get(`http://localhost:3000/api/v1/tasks/users/${name}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}` // Assuming you are storing the token in localStorage
                    }
                });
                setUser(response.data.user);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching user data:', error);
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        
           
            <div className="flex justify-center items-center w-full min-h-[86vh] bg-gray-100">
                <div className="lg:w-1/2 p-16 bg-white rounded-md shadow-lg">
                    <h1 className="text-3xl font-extrabold text-gray-800">Profile</h1>
                    <div className="mt-4">
                        {user ? (
                            <div>
                                <p className="text-xl text-gray-700"><span className='font-bold'>Name:</span> {user.username}</p>
                                <p className="text-xl text-gray-700"><span className='font-bold'>Email:</span> {user.email}</p>
                            </div>
                        ) : (
                            <p className="text-sm text-gray-700">No user data found.</p>
                        )}
                    </div>
                </div>
            </div>
        
    );
};

export default Profile;
