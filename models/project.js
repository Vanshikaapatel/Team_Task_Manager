const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    admin: {
        type: String   // userId
    },
    members: [
        {
            type: String   // userId or email
        }
    ]
});

module.exports = mongoose.model("Project", projectSchema);