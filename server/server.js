const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

// ✅ Load environment variables
dotenv.config();

// ✅ Check if MongoDB URI is properly loaded
if (!process.env.MONGO_URI) {
  console.error("❌ Missing MONGO_URI in .env file");
  process.exit(1);  // Exit the server if no MongoDB URI is provided
}

const app = express();
app.use(express.json());
app.use(cors());

// ✅ MongoDB Connection with Better Error Handling
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  });

// ✅ Import and Use Routes
const habitRoutes = require("./Routes/habitRoutes");
const userRoutes = require("./Routes/userRoutes");

app.use("/api/habits", habitRoutes);
app.use("/api/users", userRoutes);

// ✅ Default Route for Health Check
app.get("/", (req, res) => {
  res.send("🚀 Habit Tracker API is running...");
});

// ✅ Error Handling Middleware
app.use((err, req, res, next) => {
  console.error("❌ Error:", err.stack);
  res.status(500).send("Something broke!");
});

// ✅ Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
