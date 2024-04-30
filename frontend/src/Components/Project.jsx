import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Modal, Switch } from "antd";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import { RiMore2Line, RiAddCircleFill } from "react-icons/ri";

const Project = () => {
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState("");
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const [newProjectDescription, setNewProjectDescription] = useState("");
  

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
    fetchProjects();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/v1/projects/${id}`
      );
      if (response.data.status === "success") {
        fetchTasks();
        toast.success("Project deleted successfully");
      }
    } catch (error) {
      console.error("Error deleting Project:", error);
    }
  };

  const handleTaskCompletion = async (id, completed) => {
    try {
      const response = await axios.patch(
        `http://localhost:3000/api/v1/projects/${id}`,
        { completed }
      );
      if (response.data.status === "success") {
        fetchTasks();
        toast.success("Task status updated successfully");
      }
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  const handleInputChange = (e) => {
    setNewProject(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setNewProjectDescription(e.target.value);
  };

  const handleCreateTask = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/projects",
        { name: newProject, description: newProjectDescription }
      );
      setProjects([...projects, response.data.project]);
      setNewProject("");
      setNewProjectDescription("");
      setVisible(false);
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <Toaster />
      <div className="w-[360px] h-[190px] left-[31.5px] rounded-[5px] bg-gray-100 border border-gray-500 border-dashed flex items-center justify-center mt-2 ml-1 mb-4">
        <button
          className="mb-4 text-sm font-semibold text-left text-gray-500"
          onClick={() => setVisible(true)}
        >
          Add Project
        </button>
      </div>
      <Modal
        title="Create New Project"
        visible={visible}
        onOk={handleCreateTask}
        onCancel={() => setVisible(false)}
      >
        <label className="text-sm text-gray-500">Name:</label>
        <input
          type="text"
          value={newProject}
          onChange={handleInputChange}
          className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:border-blue-500"
          placeholder="Enter a new Project Name"
        />
        <label className="text-sm text-gray-500 mt-2">Description:</label>
        <input
          type="text"
          value={newProjectDescription}
          onChange={handleDescriptionChange}
          className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:border-blue-500"
          placeholder="Enter Description"
        />
        <div className="font-medium text-gray-500 whitespace-nowrap">
          Members
          <RiAddCircleFill className="text-blue-500 w-8 h-8" />
        </div>
      </Modal>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {projects.map((project, index) => (
          <div key={index} className="bg-white rounded-md shadow-md p-4">
            <div className="flex justify-between items-center mb-4">
              <Link to={`/boards/${project?._id}`}>
                <h1 className="text-lg font-semibold">{project?.name}</h1>
              </Link>
              <div className="flex items-center space-x-2">
                <button
                  className="text-gray-500 hover:text-red-500"
                  onClick={() => handleDelete(project?._id)}
                >
                  <RiMore2Line />
                </button>
              </div>
            </div>
            <p className="text-sm text-gray-400 mb-20">{project.description}</p>

            <div className="flex justify-between">
              <p className="text-sm text-gray-600">
                Updated on {new Date(project.date).toLocaleDateString()}
              </p>
              <p className="text-sm text-gray-600">{"1 Board"}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Project;
