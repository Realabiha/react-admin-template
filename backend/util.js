import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const secret = process.env.JWT_SECRET;
const expires = '60';

// 加密token 
// header(meta源信息)+ payload(data存储数据) + signature(sign签名防篡改)
export function encodeJwt(expiresIn = expires){
  return data => jwt.sign({data}, secret, {expiresIn})
}
// 解密token
export function decodeJwt(res){
  return token => jwt.verify(token, secret, function(error){
    const send = fmtResponse('005')(error.message)()
    res.status(200).send(send);
  })
}

// 响应结果处理
export function fmtResponse(status){
  return function(msg){
    return function(res){
      return {
        status,
        msg,
        data: _isArray(res)
      }
    }
  }
}

// helper func
function _isArray(res = {}){
  if(res instanceof Array){
    return [...res]
  }
  return res
}