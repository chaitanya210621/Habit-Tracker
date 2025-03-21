const express = require("express");  
const router = express.Router();  
const Habit = require("../models/Habit");

// Create Habit  
router.post("/", async (req, res) => {  
  const habit = new Habit(req.body);  
  await habit.save();  
  res.json(habit);  
});

// Get Habits  
router.get("/", async (req, res) => {  
  const habits = await Habit.find().populate("user");  
  res.json(habits);  
});

// Update Habit  
router.put("/:id", async (req, res) => {  
  const habit = await Habit.findByIdAndUpdate(req.params.id, req.body, { new: true });  
  res.json(habit);  
});

// Delete Habit  
router.delete("/:id", async (req, res) => {  
  await Habit.findByIdAndDelete(req.params.id);  
  res.send("Habit deleted");  
});

module.exports = router;
