const express = require("express");
const router = express.Router();

const Task = require("../models/Task");
const auth = require("../middleware/auth");

// CREATE TASK
router.post("/create", auth, async (req, res) => {
    let { title, description, dueDate, priority, assignedUser } = req.body;

    let task = await Task.create({
        title,
        description,
        dueDate,
        priority,
        assignedTo: req.userId,
        assignedUser: assignedUser || "",
    });

    res.send(task);
});

// GET TASKS
router.get("/all", auth, async (req, res) => {
    let tasks = await Task.find({
        assignedTo: req.userId
    });

    res.send(tasks);
});

// 🔹 UPDATE STATUS (Done / To Do)
router.put("/update/:id", auth, async (req, res) => {
    try {
        let task = await Task.findById(req.params.id);

        if (!task) {
            return res.json({ message: "Task not found" });
        }

        // toggle status
        if(task.status === "To Do"){
            task.status = "In Progress";
        }
        else if(task.status === "In Progress"){
            task.status = "Done";
        }
        else{
            task.status = "To Do";
        }

        await task.save();

        res.json({
            message: "Task updated",
            task
        });

    } catch (err) {
        console.log(err);
        res.json({ message: "Error updating task" });
    }
});


// 🔹 DELETE TASK
router.delete("/delete/:id", auth, async (req, res) => {
    try {
        await Task.findByIdAndDelete(req.params.id);

        res.json({ message: "Task deleted" });

    } catch (err) {
        console.log(err);
        res.json({ message: "Error deleting task" });
    }
});

module.exports = router;