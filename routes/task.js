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

         let taskFromDb;

         taskFromDb = await task.save();

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
            return res.json({ data: "Task created" });
         }
         return res.json({ data: taskFromDb });
      } catch (error) {
         console.error(err);
         res.status(500).send("Server Error");
      }
   }
);

// @route    POST api/task/getAll
// @desc     Get User Tasks
// @access   Private

router.get("/getAll", async (req, res) => {
   try {
      let id = "609c29c44fc5a570a4b32203";

      const user = await User.findOne({ _id: id }).populate("tasksList");
      if (user) {
         return res.json({ data: user.tasksList });
      }
      return res.json({ data: "No User" });
   } catch (error) {
      console.error(error);
      res.status(500).send("Server Error");
   }
});

// @route    POST api/task/get/:id
// @desc     Get User Tasks
// @access   Private

router.get("/get/:id", async (req, res) => {
   try {
      let id = req.params.id;
      const task = await Task.findById(id);
      if (task) {
         return res.json({ data: task });
      }
      res.json({ data: "No task" });
   } catch (error) {
      console.error(error);
      res.status(500).send("Server Error");
   }
});

// @route    POST api/task/delete/:id
// @desc     Get User Tasks
// @access   Private

router.post("/delete/:taskId", async (req, res) => {
   try {
      let taskId = req.params.taskId;
      let userId = "609c29c44fc5a570a4b32203";
      let task = await Task.findById(taskId);
      if (task) {
         let testUserId = task.userId[0];
         if (testUserId != userId) return res.json({ data: "Task doesn't belongs to user" });
         else {
            let user = await User.findById(testUserId);
            if (user) {
               await Task.findByIdAndRemove(taskId);
               const index = user.tasksList.indexOf(taskId);
               user.tasksList.splice(index, 1);
               await user.save();
               const updatedUser = await User.findById(testUserId).populate("tasksList");
               return res.json(updatedUser.tasksList);
            }
         }
         return res.json({ data: "No User task Exists" });
      }
      res.json({ data: "No Task" });
   } catch (error) {
      console.error(error);
      res.status(500).send("Server Error");
   }
});

module.exports = router;
