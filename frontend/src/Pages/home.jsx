import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/v1/tasks");
      setTasks(response.data.tasks);
      console.log(response.data.tasks);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      setLoading(false);
    }
  };
  const fetchProjects = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/v1/projects");
      setProjects(response.data.projects);
      console.log(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      setLoading(false);
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
    fetchTasks();
    fetchProjects();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="ml-8 mt-8 text-gray-500">
        <p>Welcome,</p>
        <h1 className="font-medium text-2xl text-gray-900">{user.username}</h1>
        <p>
          You are logged into{" "}
          <span className="font-medium text-gray-900">Task.it</span>
        </p>
      </div>
      <div className="ml-8 mt-10 grid grid-cols-3">
        <div className="mr-8">
          <h1 className="text-lg text-gray-500 mb-2">
            <span className="bg-primary-gradient px-1.5 rounded-xl mr-2"></span>
            Tasks
          </h1>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pl-8">
        {tasks.map((task, index) => (
          <div key={index} className="bg-white rounded-md shadow-md p-4">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-lg font-semibold">{task?.name}</h1>
              <div className="flex items-center space-x-2"></div>
            </div>
            {/* <p className="text-sm text-gray-700 mb-2">{task.description}</p> */}
            <div className="flex justify-between">
              <p className="text-sm text-gray-600">
                {new Date(task.date).toLocaleDateString()}
              </p>
              <p className="text-sm text-gray-600">{task?.time}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="ml-8 mt-10 grid grid-cols-3">
        <div className="mr-8">
          <h1 className="text-lg text-gray-500 mb-2">
            <span className="bg-primary-gradient px-1.5 rounded-xl mr-2"></span>
            Projects
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pl-8">
        {projects.map((project, index) => (
          <div key={index} className="bg-white rounded-md shadow-md p-4">
            <div className="flex justify-between items-center mb-2">
              <h1 className="text-lg font-semibold">{project?.name}</h1>
            </div>
            <p className="text-sm text-gray-400 mb-7">{project.description}</p>

            <div className="flex justify-between">
              <p className="text-sm text-gray-600">
                Updated on {new Date(project.date).toLocaleDateString()}
              </p>
              <p className="text-sm text-gray-600">{"1 Board"}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="ml-8 mt-10 grid grid-cols-3">
        <div className="mr-8">
          <h1 className="text-lg text-gray-500 mb-2">
            <span className="bg-primary-gradient px-1.5 rounded-xl mr-2"></span>
            Boards
          </h1>
        </div>
      </div>
    </>
  );
};

export default Home;
