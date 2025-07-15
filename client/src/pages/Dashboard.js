import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlus, FaSignOutAlt } from "react-icons/fa";

function Dashboard() {
  const navigate = useNavigate();
  const name = localStorage.getItem("name");
  const token = localStorage.getItem("token");

  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterPriority, setFilterPriority] = useState("All");
  const [sortOrder, setSortOrder] = useState("");

  const [form, setForm] = useState({
    subject: "",
    description: "",
    priority: "",
    status: "",
    dueDate: "",
  });

  useEffect(() => {
    if (!token) {
      toast.error("Please log in first");
      navigate("/login");
      return;
    }
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/tasks", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(res.data);
    } catch {
      toast.error("Failed to load tasks");
    }
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`http://localhost:5000/api/tasks/${editingId}`, form, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("Task updated!");
      } else {
        await axios.post("http://localhost:5000/api/tasks", form, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("Task added!");
      }
      setForm({
        subject: "",
        description: "",
        priority: "",
        status: "",
        dueDate: "",
      });
      setEditingId(null);
      setShowForm(false);
      fetchTasks();
    } catch {
      toast.error("Failed to save task");
    }
  };

  const handleEdit = (task) => {
    setForm({
      subject: task.subject,
      description: task.description,
      priority: task.priority,
      status: task.status,
      dueDate: task.dueDate.split("T")[0],
    });
    setEditingId(task._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this task?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Task deleted!");
      fetchTasks();
    } catch {
      toast.error("Failed to delete task");
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };
  const fetchAllTasks = async () => {
    try {
      const res = await axios.get("/api/tasks", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setTasks(res.data);
    } catch (err) {
      console.error("Failed to fetch all tasks:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-400 via-purple-400 to-pink-400 p-6">
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white rounded-xl p-6 shadow-lg flex justify-between items-center max-w-4xl mx-auto mb-6"
      >
        <h1 className="text-2xl font-bold text-gray-700">
          👋 Hello, {name}!...Welcome to your Study Planner...
        </h1>
        <div className="flex space-x-2">
          <button
            onClick={() => {
              setForm({
                subject: "",
                description: "",
                priority: "",
                status: "",
                dueDate: "",
              });
              setEditingId(null);
              setShowForm(true);
            }}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded flex items-center gap-2 transition"
          >
            <FaPlus /> New Task
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded flex items-center gap-2 transition"
          >
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </motion.div>

      {/* Filter & Sort Controls */}
      <div className="max-w-4xl mx-auto flex flex-wrap justify-between items-center mb-4 gap-4">
        <button
          onClick={() => {
            setFilterStatus("All");
            setFilterPriority("All");
            setSortOrder("");
            fetchAllTasks();
          }}
          className="px-5 py-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-black font-bold rounded-full shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
        >
          All Tasks
        </button>

        <select
          className="p-2 rounded border"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="All">Filter by Status</option>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
        </select>

        <select
          className="p-2 rounded border"
          value={filterPriority}
          onChange={(e) => setFilterPriority(e.target.value)}
        >
          <option value="All">Filter by Priority</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        <select
          className="p-2 rounded border"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="">Sort by</option>
          <option value="dueDate">Due Date</option>
        </select>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-4xl mx-auto space-y-4"
      >
        {tasks
          .filter((task) => {
            return (
              (filterStatus === "All" || task.status === filterStatus) &&
              (filterPriority === "All" || task.priority === filterPriority)
            );
          })
          .sort((a, b) => {
            if (sortOrder === "dueDate") {
              return new Date(a.dueDate) - new Date(b.dueDate);
            }
            return 0;
          })
          .map((task) => (
            <motion.div
              key={task._id}
              className="bg-white rounded-lg p-4 shadow-md"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-semibold text-purple-700">
                    {task.subject}
                  </h2>
                  <p className="text-gray-600">{task.description}</p>
                  <p className="text-sm text-gray-500">
                    Due: {task.dueDate.split("T")[0]} | Priority:{" "}
                    {task.priority}
                  </p>
                  <select
                    value={task.status}
                    onChange={async (e) => {
                      try {
                        await axios.put(
                          `http://localhost:5000/api/tasks/${task._id}`,
                          { status: e.target.value },
                          { headers: { Authorization: `Bearer ${token}` } }
                        );
                        toast.success("Status updated");
                        fetchTasks();
                      } catch {
                        toast.error("Failed to update status");
                      }
                    }}
                    className={`text-sm font-semibold mt-2 px-2 py-1 rounded ${
                      task.status === "Completed"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(task)}
                    className="bg-blue-500 hover:bg-blue-600 text-white rounded-full px-3 py-1 text-sm shadow"
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => handleDelete(task._id)}
                    className="bg-red-500 hover:bg-red-600 text-white rounded-full px-3 py-1 text-sm shadow"
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
      </motion.div>

      {/* Modal Form */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            >
              <h2 className="text-xl font-bold mb-4 text-center">
                {editingId ? "✏️ Edit Task" : "➕ Add New Task"}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-3">
                <input
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  className="w-full border p-2 rounded"
                  value={form.subject}
                  onChange={handleChange}
                  required
                />
                <input
                  type="date"
                  name="dueDate"
                  className="w-full border p-2 rounded"
                  value={form.dueDate}
                  onChange={handleChange}
                  required
                />
                <textarea
                  name="description"
                  placeholder="Description"
                  className="w-full border p-2 rounded"
                  value={form.description}
                  onChange={handleChange}
                  required
                />
                <select
                  name="priority"
                  className="w-full border p-2 rounded text-gray-700"
                  value={form.priority}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled hidden>
                    Select priority
                  </option>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
                <select
                  name="status"
                  className="w-full border p-2 rounded text-gray-700"
                  value={form.status}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled hidden>
                    Select status
                  </option>
                  <option value="Pending">Pending</option>
                  <option value="Completed">Completed</option>
                </select>
                <div className="flex justify-between">
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  >
                    {editingId ? "Update Task" : "Save Task"}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowForm(false);
                      setEditingId(null);
                    }}
                    className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Dashboard;
