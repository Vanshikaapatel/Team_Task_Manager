const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
{
    title: String,
    description: String,
    dueDate: String,
    priority: String,
    status: {
        type: String,
        default: "To Do"
    },
    assignedTo: String,
    assignedUser: String,
    projectId: String
},
{
    timestamps: true   // 👈 YAHAN hona chahiye
});

module.exports = mongoose.model("Task", taskSchema);