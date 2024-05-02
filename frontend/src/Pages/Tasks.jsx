import React, { useState, useEffect } from 'react';
import { Button, Modal, Switch } from 'antd';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';
import { RiDeleteBin7Line } from "react-icons/ri";


const Tasks = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');
    const [loading, setLoading] = useState(true);
    const [visible, setVisible] = useState(false);
    const [newTaskDescription, setNewTaskDescription] = useState('');

    const fetchTasks = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/v1/tasks');
            setTasks(response.data.tasks);
            console.log(response.data.tasks);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching tasks:', error);
            setLoading(false);
        }
    };

    useEffect(() => {

        fetchTasks();
    }, []);

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:3000/api/v1/tasks/${id}`);
            if (response.data.status === 'success') {
                fetchTasks();
                toast.success('Task deleted successfully');
            }
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    }

    const handleTaskCompletion = async (id, completed) => {
        try {
            const response = await axios.patch(`http://localhost:3000/api/v1/tasks/${id}`, { completed });
            if (response.data.status === 'success') {
                fetchTasks();
                toast.success('Task status updated successfully');
            }
        } catch (error) {
            console.error('Error updating task status:', error);
        }
    }

    const handleInputChange = (e) => {
        setNewTask(e.target.value);
    };

    const handleDescriptionChange = (e) => {
        setNewTaskDescription(e.target.value);
    };

    const handleCreateTask = async () => {
        try {
            const response = await axios.post('http://localhost:3000/api/v1/tasks', { name: newTask, description: newTaskDescription });
            setTasks([...tasks, response.data.task]);
            setNewTask('');
            setNewTaskDescription('');
            setVisible(false);
        } catch (error) {
            console.error('Error creating task:', error);
        }
    };

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
          <h1 className="text-xl font-bold text-gray-900">Tasks</h1>
        </nav>
      </header>

        <div className="p-4">
            <Toaster />
            <div className="w-[360px] h-[120px] left-[31.5px] rounded-[5px] bg-gray-100 border border-gray-500 border-dashed flex items-center justify-center mt-2 ml-1 mb-4">
          <button
            className="mb-4 text-sm font-semibold text-left text-gray-500"
            onClick={() => setVisible(true)}
          >
            Add Task
          </button>
        </div>
            <Modal
                title="Add New Task"
                visible={visible}
                onOk={handleCreateTask}
                onCancel={() => setVisible(false)}
            >
                <input
                    type="text"
                    value={newTask}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:border-blue-500"
                    placeholder="Enter a new task"
                />
                <input
                    type="text"
                    value={newTaskDescription}
                    onChange={handleDescriptionChange}
                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:border-blue-500"
                    placeholder="Enter Description"
                />
            </Modal>
          
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {tasks.map((task, index) => (
                    <div key={index} className="bg-white rounded-md shadow-md p-4">
                        <div className="flex justify-between items-center mb-4">
                            <h1 className="text-lg font-semibold">{task?.name}</h1>
                            <div className="flex items-center space-x-2">                              
                                <Switch checked={task.completed} onChange={(checked) => handleTaskCompletion(task._id, checked)} />
                                <button className="text-gray-500 hover:text-red-500" onClick={() => handleDelete(task?._id)}>
                                    <RiDeleteBin7Line />
                                </button>
                            </div>
                        </div>
                        <p className="text-sm text-gray-700 mb-2">{task.description}</p>
                        <div className="flex justify-between">
                            <p className="text-sm text-gray-600">{new Date(task.date).toLocaleDateString()}</p>
                            <p className="text-sm text-gray-600">{task?.time}</p>
                        </div>
                    </div>
                ))}
            </div>

        </div>
        </>
    );
};

export default Tasks;
