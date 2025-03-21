const mongoose = require("mongoose");

const habitSchema = new mongoose.Schema({  
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },  
  title: String,  
  description: String,  
  completedDays: [Date],  
  goalDays: Number,  
  createdAt: { type: Date, default: Date.now }  
});

module.exports = mongoose.model("Habit", habitSchema);
