const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

const Task = require("../models/Task");
const User = require("../models/User");

// @route    POST api/task/create
// @desc     Create New Task
// @access   Private

router.post(
   "/create",
   [
      check("title", "Title is required").not().isEmpty().trim(),
      check("description", "Description is required").not().isEmpty().trim(),
      check("userId", "UserId is required").not().isEmpty().trim(),
   ],
   async (req, res) => {
      try {
         const errors = validationResult(req);
         if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
         }
         const { title, description, userId, status, editAt, completedAt } = req.body;

         let task = new Task({
            title,
            description,
            userId,
            status,
            completedAt: completedAt && completedAt,
            editAt: editAt && editAt,
         });

         let taskFromDb = await task.save();

         if (taskFromDb) {
            let user = await User.findOneAndUpdate(userId);
            if (user) {
               let userArray = user.tasksList;
               userArray.push(taskFromDb._id);
               let updateUser = await user.save();
               if (updateUser) {
                  return res.json({ data: "Task created and user updated" });
               }
            }
         }
         res.json({ data: "Task created" });
      } catch (error) {
         console.error(err);
         res.status(500).send("Server Error");
      }
   }
);

module.exports = router;
