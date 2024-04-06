const mongoose = require("mongoose");
require("dotenv").config();

const mongoURL = process.env.MONGODB_URL_LOCAL;

mongoose.connect(mongoURL, {
});

const db = mongoose.connection;

db.on("connected", () => {
  console.log("Connected to MongoDb Server");
});

db.on("error", (err) => {
  console.error("MongoDB connection error", err);
});

db.on('disconnected',()=>{
    console.log('MongoDB disconnected');
})

module.exports=db;
