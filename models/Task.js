const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    dueDate: {
        type: String
    },
    priority: {
        type: String,
        default: "Low"
    },
    status: {
        type: String,
        default: "To Do"
    },
    assignedTo: {
        type: String,
        required: true
    },
    assignedUser: {
        type: String,
        default: null
    }, 

    timestamps: true   // createdAt & updatedAt automatically add honge
});

module.exports = mongoose.model("Task", taskSchema);