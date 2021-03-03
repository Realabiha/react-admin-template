import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
// const mongoose = require('mongoose');
// require('dotenv').config();
const DB_URL = process.env.DB_URL;

// mongoose.Promise = global.Promise;
mongoose.connect(
  DB_URL, 
  { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true 
  },
  function(){
    console.log("mongodb connect success")
  }
);
// mongoose.connection.on("connected", () => {
//     console.log("mongodb connect success")
// });
// mongoose.connection.on("error", (error) => {
//     console.log("mongodb connect fail", error)
// });


module.exports = mongoose;