const express = require("express");
const router = express.Router();

const Project = require("../models/Project");
const auth = require("../middleware/auth");


router.post("/create", auth, async (req, res) => {
    let project = await Project.create({
        name: req.body.name,
        admin: req.userId,
        members: [req.userId]
    });

    res.json(project);
});


router.post("/add-member", auth, async (req, res) => {
    let { projectId, userId } = req.body;

    let project = await Project.findById(projectId);

    project.members.push(userId);
    await project.save();

    res.json({ message: "Member added" });
});


router.get("/all", auth, async (req, res) => {
    let projects = await Project.find({
        members: req.userId
    });

    res.json(projects);
});

module.exports = router;