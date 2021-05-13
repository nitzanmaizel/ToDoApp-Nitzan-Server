const mongoose = require("mongoose");

const UserScheme = new mongoose.Schema({
   firstName: {
      type: String,
      required: true,
   },
   lastName: {
      type: String,
      required: true,
   },
   profileImage: {
      type: String,
   },
   email: {
      type: String,
      required: true,
      unique: true,
   },
   password: {
      type: String,
   },
   googleId: {
      type: String,
   },
   facebookId: {
      type: String,
   },
   linkedinId: {
      type: String,
   },
   signupMethod: {
      type: String,
      require: true,
   },
   tasksList: [{ type: mongoose.Schema.Types.ObjectId, ref: "TodoItems" }],
   createdAt: {
      type: Date,
      default: Date.now(),
   },
});

module.exports = mongoose.model("Users", UserScheme);
