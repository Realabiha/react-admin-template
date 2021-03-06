import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';

import userRoute from './routes/userRoute';
import productRoute from './routes/productRoute';

import vt from './middleware/validateToken';
const app = express();

// 支持json格式数据请求
app.use(bodyParser.json());

// 指定静态文件目录
app.use(express.static(path.resolve(__dirname, '../frontend/build')));

app.use(vt);

app.use('/users', userRoute);
app.use('/products', productRoute);

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../frontend/build/index.html'));
});


const port = process.env.PORT || 5000;
app.listen(port, _ => {
  console.log(`Server is runing at ${port}`)
})