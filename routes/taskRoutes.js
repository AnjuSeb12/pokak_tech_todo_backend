import express from "express";
import Task from "../models/taskModel.js";
import { authenticate } from "../middlewares/auth.js";

const router = express.Router();


router.post("/", authenticate, async (req, res) => {
  try {
    const task = new Task({
      ...req.body,
      user: req.user.id, 
    });
    const saved = await task.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: "Task creation failed" });
  }
});





router.get("/", authenticate, async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id });
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
});






router.delete("/:id", authenticate, async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    if (!deletedTask) return res.status(404).json({ error: "Task not found" });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete task" });
  }
});


export default router;
