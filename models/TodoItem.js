const mongoose = require("mongoose");

const TskScheme = new mongoose.Schema({
   type: {
      type: String,
      required: true,
   },
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
   editAt: {
      type: Date,
      default: Date.now(),
   },
   createdAt: {
      type: Date,
      default: Date.now(),
   },
});

module.exports = mongoose.model("Tasks", TskScheme);
