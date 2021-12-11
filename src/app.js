const express = require("express");
require("./db/mongoose");
const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");

const app = express();

// This line is necessary to let express automatically parse the incoming body and activate req.body
app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

module.exports = app;
