import mongoose from 'mongoose';
import db from '../db/config';

// Schema表解构Type类型
// String
// Number
// Date
// Buffer
// Boolean
// Mixed
// ObjectId
// Array

// 表|模型的具体描述
const userSchema = new mongoose.Schema({
  name: {type: String, default: 'user'},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  isAdmin: {type: Boolean, default: false},
  permission: {type: Array, default: []}
})

// 模型|具备操作数据库能力
const userModel = db.model('users', userSchema);
export default userModel;