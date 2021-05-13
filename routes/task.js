const express = require("express");

const router = express.Router();

const { check, validationResult } = require("express-validator");

// @route    POST api/task/create
// @desc     Create New Task
// @access   Private

router.post(
   "/create",
   [
      check("firstName", "First name is required").not().isEmpty().trim(),
      check("lastName", "Last name is required").not().isEmpty().trim(),
      check("email", "Please enter valid email").isEmail(),
   ],
   async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         return res.status(400).json({ errors: errors.array() });
      }
      res.json("This is A Create route");
   }
);
