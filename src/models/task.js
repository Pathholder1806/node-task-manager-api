const mongoose = require("mongoose");

// Task model
//Create Model
const taskSchema = mongoose.Schema(
    {
        description: {
            type: String,
            required: true,
            trim: true,
        },
        completed: {
            type: Boolean,
            default: false,
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
    },
    {
        timestamps: true,
    }
);

const Task = mongoose.model("Task", taskSchema);

// Create an insrance/entry
// const task = new Task({
//     description: "Watch movie    ",
// });

// // Save instance/entry to the model in database
// task.save()
//     .then((result) => {
//         console.log(result);
//     })
//     .catch((err) => {
//         console.log("Error: " + err);
//     });

module.exports = Task;
