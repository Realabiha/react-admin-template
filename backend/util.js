import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const secret = process.env.JWT_SECRET;
const expires = '1h';

export function getJwt(expiresIn = expires){
  return data => jwt.sign({data}, secret, {expiresIn})
}