import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Modal } from "antd";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import { RiMore2Line, RiAddCircleFill } from "react-icons/ri";

const Boards = () => {
  const [boards, setBoards] = useState([]);
  const [newBoard, setNewBoard] = useState("");
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const [newBoardDescription, setNewBoardDescription] = useState("");

  const fetchBoards = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/v1/boards");
      setBoards(response.data.boards);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching boards:", error);
      setLoading(false);
      toast.error("Error fetching boards");
    }
  };

  useEffect(() => {
    fetchBoards();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/v1/boards/${id}`
      );
      if (response.data.status === "success") {
        fetchBoards();
        toast.success("Board deleted successfully");
      }
    } catch (error) {
      console.error("Error deleting board:", error);
      toast.error("Error deleting board");
    }
  };

  const handleCreateBoard = async () => {
    try {
      const response = await axios.post("http://localhost:3000/api/v1/boards", {
        name: newBoard,
        description: newBoardDescription,
      });
      setBoards([...boards, response.data.board]);
      setNewBoard("");
      setNewBoardDescription("");
      setVisible(false);
      toast.success("Board created successfully");
    } catch (error) {
      console.error("Error creating board:", error);
      toast.error("Error creating board");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
     
      <div className="pl-8">
        <Toaster />
        <div className="w-[360px] h-[190px] left-[31.5px] rounded-[5px] bg-gray-100 border border-gray-500 border-dashed flex items-center justify-center mt-2 ml-1 mb-4">
          <button
            className="mb-4 text-sm font-semibold text-left text-gray-500"
            onClick={() => setVisible(true)}
          >
            Add Board
          </button>
        </div>
        <Modal
          title="Create New Board"
          visible={visible}
          onOk={handleCreateBoard}
          onCancel={() => setVisible(false)}
        >
          <label className="text-sm text-gray-500">Name:</label>
          <input
            type="text"
            value={newBoard}
            onChange={(e) => setNewBoard(e.target.value)}
            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:border-blue-500"
            placeholder="Enter a new Board Name"
          />
          <label className="text-sm text-gray-500 mt-2">Description:</label>
          <input
            type="text"
            value={newBoardDescription}
            onChange={(e) => setNewBoardDescription(e.target.value)}
            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:border-blue-500"
            placeholder="Enter Description"
          />
          <div className="font-medium text-gray-500 whitespace-nowrap">
            Members
            <RiAddCircleFill className="text-blue-500 w-8 h-8" />
          </div>
        </Modal>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {boards.map((board, index) => (
            <div key={index} className="bg-white rounded-md shadow-md p-4">
              <div className="flex justify-between items-center mb-4">
                <Link to={`/boards/${board._id}`}>
                  <h1 className="text-lg font-semibold">{board.name}</h1>
                </Link>
                <div className="flex items-center space-x-2">
                  <button
                    className="text-gray-500 hover:text-red-500"
                    onClick={() => handleDelete(board._id)}
                  >
                    <RiMore2Line />
                  </button>
                </div>
              </div>
              <p className="text-sm text-gray-400 mb-20">{board.description}</p>

              <div className="flex justify-between">
                <p className="text-sm text-gray-600">
                  Updated on {new Date(board.date).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-600">{"1 Board"}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Boards;
