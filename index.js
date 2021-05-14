const express = require("express");
const connectDB = require("./util/db");

const app = express();

// Connect MongoDB ==>
connectDB();

// Middlewares ==>
app.use(express.json({ extended: false, limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cors());

// Set up routers ==>
app.use("/api/task", require("./routes/task"));
app.use("/api/user", require("./routes/user"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
   console.log(`Server run on http://localhost:${PORT}`);
});
