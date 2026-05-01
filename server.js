require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();


app.use(express.json());
app.use(cors());


app.get("/", (req, res) => {
    res.send("API is running 🚀");
});


mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("✅ Database Connected Successfully");
})
.catch((err) => {
    console.log("❌ DB Connection Error:", err.message);
});


app.use("/auth", require("./routes/auth"));
app.use("/task", require("./routes/task"));
app.use("/project", require("./routes/project"));


const PORT = 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
app.get("/", (req, res) => {
    res.send("Server is running 🚀");
});