const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

const Task = require("../models/Task");
const User = require("../models/User");

// @route    GET api/user/get/:userId
// @desc     Get User By ID
// @access   Private

router.get("/get/:userId", async (req, res) => {
   try {
      let id = req.params.userId;
      let user = await User.findById(id);
      if (!user) return res.status(404).json({ data: null });
      let sendUser = {
         id: user._id,
         firstName: user.firstName,
         lastName: user.lastName,
         email: user.email,
         profileImage: user.profileImage,
         tasksList: user.tasksList,
      };
      res.json(sendUser);
   } catch (error) {
      console.error(error);
      res.status(500).send("Server Error");
   }
});

module.exports = router;
