const mongoose = require("mongoose");

// const keys = require("../config/keys");

const connectDB = async () => {
   try {
      await mongoose.connect(process.env.mongoURI, {
         useNewUrlParser: true,
         useCreateIndex: true,
         useFindAndModify: false,
         useUnifiedTopology: true,
      });
      console.log("MongoDB Connected");
   } catch (err) {
      console.error(err);
      process.exit(1);
   }
};

module.exports = connectDB;
