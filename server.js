require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// 🔹 Middlewares
app.use(express.json());
app.use(cors());

// 🔹 Basic route (test ke liye)
app.get("/", (req, res) => {
    res.send("API is running 🚀");
});

// 🔹 MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("✅ Database Connected Successfully");
})
.catch((err) => {
    console.log("❌ DB Connection Error:", err.message);
});

// 🔹 Routes
app.use("/auth", require("./routes/auth"));
app.use("/task", require("./routes/task"));
app.use("/project", require("./routes/project"));

// 🔹 Server Start
const PORT = 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
app.get("/", (req, res) => {
    res.send("Server is running 🚀");
});