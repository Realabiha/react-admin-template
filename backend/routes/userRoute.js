import express from 'express';
import User from '../model/userModel';
import {encodeJwt, fmtResponse} from '../util';

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

// 用户注册
router.post('/register', async (req, res) => {
  const {email, password, permission} = req.body;
  try {
    const user = await User.findOne({email});
    if(user)
      res.status(200).send(fmtResponse('0')('用户已存在')())
    else{
      const newUser = await User.create({email, password, permission})
      newUser ? 
      res.status(200).send(fmtResponse('1')('注册成功')(newUser)) :
      res.status(200).send(fmtResponse('0')('注册失败')())
    }
  } catch (error) {
    res.status(200).send(fmtResponse('0')(error.message)(error));
  }
})

// 编辑用户
router.put('/update/:_id', async (req, res) => {
  try {
    const {_id} = req.params;
    const result = await User.findByIdAndUpdate({_id}, {...req.body})
    result ? 
    res.status(200).send(fmtResponse('1')('编辑成功')()) :
    res.status(200).send(fmtResponse('0')('编辑失败')())
  } catch (error) {
    res.status(200).send(fmtResponse('0')(error.message)())    
  }
})

// 删除用户
router.post('/delete/:_id', async (req, res) => {
  // findByIdAndRemove|remove|findOneAndRemove
  try {
    const {_id} = req.params;
    const result = await User.findByIdAndRemove({_id});
    result ?
    res.status(200).send(fmtResponse('1')('删除成功')()) :
    res.status(200).send(fmtResponse('0')('删除失败')())
  } catch (error) {
    res.status(200).send(fmtResponse('0')(error.message)())
  }
})

// 创建admin用户
router.get('/createAdmin', async (req, res) => {
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
      email: 'admin',
      password: 'admin',
      isAdmin: true
    })
    res.send(admin);
  } catch (error) {
    res.send(error);
  }
})

export default router;