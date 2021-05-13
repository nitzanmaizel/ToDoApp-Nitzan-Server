const express = require("express");
const connectDB = require("./util/db");

const app = express();

// Connect MongoDB ==>
connectDB();

app.get("/", (req, res) => {
   res.json({ by: "By World!!!" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
   console.log(`Server start on http://localhost:${PORT}`);
});
