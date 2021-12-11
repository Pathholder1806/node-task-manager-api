const express = require("express");
const Task = require("../models/task");
const auth = require("../middleware/auth");
const router = new express.Router();

router.post("/tasks", auth, async (req, res) => {
    const task = new Task({
        description: req.body.description,
        completed: req.body.completed,
        owner: req.user._id,
    });

    try {
        await task.save();
        res.status(201).send(task);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Filtering : GET /tasks?completed=true
// Pagination : GET /tasks?limit=3&skip=3
// Sorting : GET /tasks?sortBy=createdAt:desc
router.get("/tasks", auth, async (req, res) => {
    const match = {};

    if (req.query.completed) {
        match.completed = req.query.completed === "true";
    }

    if (req.query.description) {
        match.description = req.query.description;
    }

    const sort = {};
    if (req.query.sortBy) {
        const parts = req.query.sortBy.split(":");
        sort[parts[0]] = parts[1] === "desc" ? -1 : 1;
    }

    try {
        await req.user
            .populate({
                path: "tasks",
                match,
                options: {
                    limit: parseInt(req.query.limit),
                    skip: parseInt(req.query.skip),
                    sort,
                },
            })
            .execPopulate();
        res.send(req.user.tasks);
    } catch (error) {
        res.status(500).send();
    }
});

router.get("/tasks/:id", auth, async (req, res) => {
    const _id = req.params.id;

    try {
        const task = await Task.findOne({ _id, owner: req.user._id });

        if (!task) {
            return res.status(404).send();
        }

        res.send(task);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.patch("/tasks/:id", auth, async (req, res) => {
    const _id = req.params.id;

    const updatesRequested = Object.keys(req.body);
    const allowedUpdates = ["description", "completed"];
    const isValidUpdate = updatesRequested.every((update) => {
        return allowedUpdates.includes(update);
    });

    if (!isValidUpdate) {
        return res
            .status(400)
            .send({ error: "Invalid update/updates requested" });
    }

    try {
        const task = await Task.findOne({ _id, owner: req.user._id });

        if (!task) {
            return res.status(404).send();
        }

        updatesRequested.forEach((update) => {
            task[update] = req.body[update];
        });

        await task.save();

        res.send(task);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.delete("/tasks/:id", auth, async (req, res) => {
    const _id = req.params.id;

    try {
        const task = await Task.findOneAndDelete({ _id, owner: req.user._id });

        if (!task) {
            return res.status(404).send();
        }

        res.send(task);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
