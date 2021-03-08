// 1.从请求头里获取token
// 2.判断是否为登录接口(登录接口不需要token)
// 3.校验token是否存在或修改
// 4.若存在或修改返回401
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import {fmtResponse} from '../util'
dotenv.config();

const apisNoNeedToken = [
  {url: '/users/signin', method: 'POST'},
  {url: '/users/register', method: 'POST'},
  {url: '/users/createAdmin', method: 'GET'},
]

export default function(req, res, next){
  // 接口跳过
  
  if(apisNoNeedToken.some(api => req.url === api.url && req.method === api.method))
  return next();

  // 获取token
  const token = req.headers['token'];
  jwt.verify(token, process.env.JWT_SECRET, function(error, decoded){
    if(error){
      const send = fmtResponse('401')(error.message)();
      return res.status(200).send(send);
      // token过期
      if(error.name === 'TokenExpiredError'){
      }
      // token错误
      if(error.name === 'JsonWebTokenError'){

      }
    }
    next();    
  })

}