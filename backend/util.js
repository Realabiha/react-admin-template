import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const secret = process.env.JWT_SECRET;
const expires = '1h';

// 加密token header(meta)+payload+signature
export function encodeJwt(expiresIn = expires){
  return data => jwt.sign({data}, secret, {expiresIn})
}
// 解密token
export function decodeJwt(){
  return token => jwt.verify(token, secret)
}

// 响应结果处理
export function fmtResponse(status){
  return function(msg){
    return function(res){
      return {
        status,
        msg,
        data: res ? _isArray(res) : {}
      }
    }
  }
}



function _isArray(res){
  if(res instanceof Array){
    return [...res]
  }
  return {...res}
}