const express = require("express");
const Task = require("../models/Task");
const User = require("../models/User");
const { compareTaskDatesWithQuerySearch } = require("../util/util");

const getUserTask = async (userId) => {
   try {
      const user = await User.findOne({ _id: userId }).populate("tasksList");
      if (user) return { data: user.tasksList };
      else return { data: "No User" };
   } catch (error) {
      return error;
   }
};

const getUserTasksByDate = (tasks, date) => {
   let userTaskWithDate = [];
   tasks.forEach((task) => {
      let isEqual = compareTaskDatesWithQuerySearch(task.createdAt, date);
      console.log(isEqual, "isEqual");
      if (isEqual) userTaskWithDate.push(task);
   });
   return userTaskWithDate;
};

const handleSearchResult = async (filter, date, userId) => {
   let finalResult = [];
   const { title, description, status } = filter;
   let tasks = await Task.find(filter);
   if (!date) {
      tasks.forEach((task) => {
         if (task.userId[0] == userId) finalResult.push(task);
      });
      return finalResult;
   } else if (title || description || (status && date)) {
      finalResult = getUserTasksByDate(tasks, date);
      return finalResult;
   }
};

module.exports = { getUserTask, getUserTasksByDate, handleSearchResult };
