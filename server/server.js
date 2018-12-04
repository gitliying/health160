const express = require('express');
const dbconnect = require('./dbconnect.js');
const path = require('path');

//新建app
const app = express();

//引入路由
const user = require('./router/user.js');
const goodslist = require('./router/goodslist.js');


//解决跨域
const cors = require('cors');
app.use(cors());

//post解析
const bodyParser = require('body-parser');

//解析post的请求参数
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());



//开启静态文件
app.use(express.static(path.join(__dirname,'./public')))



app.use('/api/user',user); //路由
app.use('/api/goodslist',goodslist); //路由


app.listen(3003,()=>{
    console.log('server start in port:'+3003);
})