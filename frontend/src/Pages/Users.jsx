import { useEffect, useState } from "react";
import axios from "axios";

const Users = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

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
    <>
      <header className="py-2 px-8 bg-gray-100 shadow-inner h-16">
        <nav aria-label="Breadcrumb" className="text-gray-600">
          <ol className="list-none flex items-center space-x-6 text-sm">
            <li>
              <a href="/home">Home</a>
            </li>
          </ol>
          <h1 className="text-xl font-bold text-gray-900">Users</h1>
        </nav>
      </header>
      <div className="ml-8 mt-10 grid grid-cols-3">
        <div className="mr-8">
          <h1 className="text-lg text-gray-500 mb-2">
            <span className="bg-primary-gradient px-1.5 rounded-xl mr-2"></span>
            Users
          </h1>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pl-8">
        <div className="bg-white rounded-md shadow-md p-4">
          <div className=" justify-between items-center mb-4">
            <img
              src={user.img_src}
              alt={user.name}
              width="80"
              height="80"
              className="rounded-full"
            />
            <h1 className="text-lg font-semibold py-2">{user.username}</h1>
            <p className="text-sm text-gray-400">{user.email}</p>
          </div>
          <div className="flex justify-between mt-10">
            <p className="text-sm text-gray-600">Role {user.role}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Users;
