import mongoose from 'mongoose';
import db from '../db/config';

// 用户表
const userSchema = new mongoose.Schema({
  name: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  isAdmin: {type: Boolean, default: false},
  permission: {type: Array, default: []}  
})

const userModel = db.model('users', userSchema);

export default userModel;



// a SCHEMA describe the model detail