const express = require("express");

const app = express();

app.get("/", (req, res) => {
   res.json({ by: "By World!!!" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
   console.log(`Server start on http://localhost:${PORT}`);
});
