import express from 'express';
import User from '../model/userModel';
import {getJwt} from '../util';

const router = express.Router();

router.post('/signin', async (req, res) => {
  const userInfo = await User.findOne(req.body);
  if(userInfo){
    const token = getJwt()(userInfo);
    const {name, email} = userInfo;
    res.send({name, email, token});
  }
  else
  res.status(401).send('Invalid email or password!');
})

router.post('/register', async (req, res) => {
  try {
    const data = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    }
    const newUser = await User.create(data)
    const token = getJwt()(data);
    const {name, email} = newUser;
    res.send({name, email, token});
  } catch (error) {
    res.status(401).send('Invalid email!');
  }
})

router.get('/createAdmin', async res => {
  // const admin = new User({
  //   name: 'abiha',
  //   email: 'm17386550687@163.com',
  //   password: '123456',
  //   isAdmin: true
  // })
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