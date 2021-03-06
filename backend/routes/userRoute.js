import express from 'express';
import { decode } from 'jsonwebtoken';
import User from '../model/userModel';
import {encodeJwt, decodeJwt, fmtResponse} from '../util';

const router = express.Router();
// 获取用户列表
router.get('/', async (req, res) => {
  let send;
  try {
    const userList = await User.find();
    if(userList){
      send = fmtResponse('1')('请求成功')(userList);
      res.status(200).send(send);
    }
  } catch (error) {
    send = fmtResponse('0')(error.message)()
    res.status(200).send(send)
  }
})

// 用户登录
router.post('/signin', async (req, res) => {
  const {email, password} = req.body;
  try {
    const user = await User.findOne({email, password});
    if(user){
      const token = encodeJwt()({email, password});
      res.status(200).send(fmtResponse('1')('登录成功')({user,token}))
    }
    else
    res.status(200).send(fmtResponse('0')('账号或密码不正确')())
  } catch (error) {
    res.status(200).send(fmtResponse('0')(error.message)());
  }
})

// 编辑用户
router.put('/update/:email', async (req, res) => {
  // findByIdAndUpdate | updateOne
})

// 删除用户
router.delete('/delete', async (req, res) => {
  // remove 
})


// 创建admin用户
router.get('/createAdmin', async res => {
  // const admin = new User({
  //   name: 'abiha',
  //   email: 'm17386550687@163.com',
  //   password: '123456',
  //   isAdmin: true
  // })
  // await User.save()
  try {
    const admin = await User.create({
      name: 'abiha',
      email: 'm17386550687@163.com',
      password: '123456',
      isAdmin: true
    })
    res.send(admin);
  } catch (error) {
    res.send(error);
  }
})


export default router;