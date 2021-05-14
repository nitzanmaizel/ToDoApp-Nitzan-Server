const mongoose = require("mongoose");

const TaskScheme = new mongoose.Schema({
   title: {
      type: String,
      require: true,
   },
   description: {
      type: String,
      require: true,
   },
   status: {
      type: String,
      require: true,
   },
   userId: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Users" }],
   },
   lastEditAt: {
      type: Date,
      default: Date.now(),
   },
   completedAt: {
      type: Date,
      default: Date.now(),
   },
   createdAt: {
      type: Date,
      default: Date.now(),
   },
});

module.exports = mongoose.model("Tasks", TaskScheme);
