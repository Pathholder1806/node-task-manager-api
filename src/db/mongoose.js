const mongoose = require("mongoose");

// Connect mongoose to the database to store models in it.
mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
});
