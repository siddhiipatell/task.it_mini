import { useEffect, useState } from "react";
// import React from "react";
import axios from "axios";

const Profile = () => {
  const [name, setName] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/updateProfile", {
        name,
        currentPassword,
        newPassword,
      });

      setMessage(response.data.message);
    } catch (error) {
      setMessage("An error occurred while updating the profile.");
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Fetch user data from the server
        const name = localStorage.getItem("name");
        const response = await axios.get(
          `http://localhost:3000/api/v1/tasks/users/${name}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`, // Assuming you are storing the token in localStorage
            },
          }
        );
        setUser(response.data.user);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <header className="py-2 px-8 bg-gray-100 shadow-inner h-16">
        <nav aria-label="Breadcrumb" className="text-gray-600">
          <ol className="list-none flex items-center space-x-6 text-sm">
            <li>
              <a href="/home">Home</a>
            </li>
          </ol>
          <h1 className="text-xl font-bold text-gray-900">Profile</h1>
        </nav>
      </header>
      <div>
        <div className="ml-10 mt-7">
          <img
            src={user.img_src}
            alt={user.name}
            width="120"
            height="120"
            className="rounded-full"
          />

          <form
            className="mt-6 bg-white rounded-md grid grid-cols-2"
            id="signupForm"
            onSubmit={handleSubmit}
          >
            <div>
              <div className="form-group">
                <label htmlFor="Name">Name</label>
                <input
                  className="w-full p-2"
                  type="text"
                  id="name"
                  placeholder={user.username}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  className="w-full p-2"
                  type="email"
                  id="email"
                  value={user.email}
                  readOnly
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="form-group">
                  <label htmlFor="currentPassword">Current Password</label>
                  <input
                    className="w-full p-2"
                    type="password"
                    id="currentPassword"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="newPassword">New Password</label>
                  <input
                    className="w-full p-2"
                    type="password"
                    id="newPassword"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="role">Role</label>
                <input
                  className="w-full p-2"
                  type="text"
                  id="role"
                  value={user.role}
                  readOnly
                />
              </div>

              <footer className="flex justify-end space-x-4 mt-4">
                <button
                  type="button"
                  className="bg-gray-100 text-gray-800 border focus:ring-2 focus:ring-primary focus:ring-offset-2 hover:bg-gray-200 px-3 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  form="signupForm"
                  className="bg-primary-gradient text-white shadow-md focus:ring-2 focus:ring-primary focus:ring-offset-2 hover:shadow-lg px-3 py-2 rounded"
                >
                  Update
                </button>
              </footer>
              {message && <p>{message}</p>}
            </div>
          </form>
        </div>
      </div>
    </div>

    // <div className="flex justify-center items-center w-full min-h-[86vh] bg-gray-100">
    //     <div className="lg:w-1/2 p-16 bg-white rounded-md shadow-lg">
    //         <h1 className="text-3xl font-extrabold text-gray-800">Profile</h1>
    //         <div className="mt-4">
    //             {user ? (
    //                 <div>
    //                     <p className="text-xl text-gray-700"><span className='font-bold'>Name:</span> {user.username}</p>
    //                     <p className="text-xl text-gray-700"><span className='font-bold'>Email:</span> {user.email}</p>
    //                 </div>
    //             ) : (
    //                 <p className="text-sm text-gray-700">No user data found.</p>
    //             )}
    //         </div>
    //     </div>
    // </div>
  );
};

export default Profile;
