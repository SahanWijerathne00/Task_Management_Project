const express = require("express");
const Task = require("../models/Task");
const jwt = require("jsonwebtoken");
const router = express.Router();

// Middleware to verify token
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (err) {
    res.status(403).json({ message: "Invalid token" });
  }
};

// GET all tasks for the logged-in user
router.get("/", authMiddleware, async (req, res) => {
  const tasks = await Task.find({ userId: req.userId });
  res.json(tasks);
});

// CREATE a task
router.post("/", authMiddleware, async (req, res) => {
  const { subject, description, priority, dueDate } = req.body;
  const newTask = new Task({
    userId: req.userId,
    subject,
    description,
    priority,
    dueDate,
  });
  await newTask.save();
  res.status(201).json(newTask);
});

// UPDATE a task
router.put("/:id", authMiddleware, async (req, res) => {
  const task = await Task.findOneAndUpdate(
    { _id: req.params.id, userId: req.userId },
    req.body,
    { new: true }
  );
  res.json(task);
});

// DELETE a task
router.delete("/:id", authMiddleware, async (req, res) => {
  await Task.findOneAndDelete({ _id: req.params.id, userId: req.userId });
  res.json({ message: "Task deleted" });
});

module.exports = router;
