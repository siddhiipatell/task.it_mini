import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Modal, Button, Input } from 'antd';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';
import { RiAddCircleFill, RiDeleteBin5Line } from 'react-icons/ri';

const Something = () => {
  const { projectId } = useParams(); // Get the projectId from the URL
  const [boards, setBoards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const [newBoardName, setNewBoardName] = useState('');
  const [newBoardDescription, setNewBoardDescription] = useState('');

  const fetchBoards = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/v1/boards`);
      setBoards(response.data.boards);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching boards:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBoards(); // Fetch boards when the component mounts
  }, [projectId]); // Re-run when projectId changes

  const handleAddBoard = async () => {
    try {
      const response = await axios.post(
        `http://localhost:3000/api/v1/boards`,
        {
          projectId,
          name: newBoardName,
          description: newBoardDescription,
        }
      );
      setBoards([...boards, response.data.board]); // Add the new board to the state
      setNewBoardName('');
      setNewBoardDescription('');
      setVisible(false); // Close the modal
    } catch (error) {
      console.error('Error creating board:', error);
    }
  };

  const handleDeleteBoard = async (boardId) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/v1/boards/${boardId}`
      );
      if (response.data.status === 'success') {
        setBoards(boards.filter((board) => board._id !== boardId)); // Remove the deleted board from the list
        toast.success('Board deleted successfully');
      }
    } catch (error) {
      console.error('Error deleting board:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <Toaster />
      <h1 className="text-2xl font-bold">Boards</h1>
      <Button
        type="primary"
        onClick={() => setVisible(true)}
        icon={<RiAddCircleFill />}
      >
        Add Board
      </Button>

      <Modal
        title="Create New Board"
        visible={visible}
        onOk={handleAddBoard}
        onCancel={() => setVisible(false)}
      >
        <label className="text-sm text-gray-500">Board Name:</label>
        <Input
          value={newBoardName}
          onChange={(e) => setNewBoardName(e.target.value)}
          placeholder="Enter board name"
        />
        <label className="text-sm text-gray-500 mt-2">Description:</label>
        <Input
          value={newBoardDescription}
          onChange={(e) => setNewBoardDescription(e.target.value)}
          placeholder="Enter board description"
        />
      </Modal>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
        {boards.map((board) => (
          <div key={board._id} className="bg-white rounded-md shadow-md p-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">{board.name}</h2>
              <Button
                type="text"
                danger
                icon={<RiDeleteBin5Line />}
                onClick={() => handleDeleteBoard(board._id)}
              />
            </div>
            <p className="text-sm text-gray-500">{board.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Something;
