import express from 'express';
import User from '../model/userModel';
import {encodeJwt, decodeJwt, fmtResponse} from '../util';

const router = express.Router();

// 获取用户列表
router.get('/', async (req, res) => {
  const allUsers = await User.find() || [];
  res.status(200).send(fmtResponse('1')('请求成功')(allUsers));
})

// 用户登录
router.post('/signin', async (req, res) => {
  const {email, password} = req.body;
  const {token} = req.headers;
  try {
    const userInfo = await User.findOne({email, password});
    res.status(200).send(fmtResponse('1')('登录成功')(userInfo));
  } catch (error) {
    res.status(401).send(fmtResponse('0')('账号或密码不正确')(error));
  }
})

// 用户注册
router.post('/register', async (req, res) => {
  const {email, password} = req.body;
  const token = encodeJwt()({email, password});
  try {
    const createUser = await User.create({email, password})
    res.status(200).send(fmtResponse('1')('注册成功')({email, password, token}))
  } catch (error) {
    res.status(401).send(fmtResponse('0')('注册失败')(error));
  }
})

// 编辑用户
router.put('/update/:email', async (req, res) => {
  const {email} = req.params;
  const {password, permission} = req.body
  // findByIdAndUpdate
  try {
    const newUserInfo = await User.updateOne({email}, {password, permission});
    res.status(200).send(fmtResponse('1')('更新成功')(newUserInfo))
  } catch (error) {
    res.status(401).send(fmtResponse('0')('更新失败')(error));
  }
})

// 删除用户
router.delete('/delete', async (req, res) => {
  // remove 
  const {email, password} = req.body;
  try {
    const result = await User.remove({email, password});
    res.status(200).send(fmtResponse('1')('删除成功')(result)) 
  } catch (error) {
    res.status(401).send(fmtResponse('0')('删除失败')(error))
  }
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