const express = require('express');
const dbconnect = require('./dbconnect.js');
const path = require('path');

//代理服务器
var proxy = require('http-proxy-middleware');

//新建app
const app = express();

//引入路由
const user = require('./router/user.js');
const goodslist = require('./router/goodslist.js');
const cartslist = require('./router/cartslist.js');


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

//代理服务器
//请求头解决跨域
app.all('*', function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
  res.setHeader('Access-Control-Allow-Credentials', true)
//
//	//跨域请求CORS中的预请求
	if(req.method == "OPTIONS") {
		res.send(200);
	} else {
		next();
	}
});
app.use('/jkapi', proxy({
	"target": "https://weixin.91160.com",
		"changeOrigin": true,
		"pathRewrite":{
			"^/jkapi":"/"
	}
})),
app.use('/registration', proxy({
	"target": "https://wap.91160.com",
		"changeOrigin": true,
		"pathRewrite":{
			"^/registration":"/"
	}
})),

app.use('/api/user',user); //路由
app.use('/api/goodslist',goodslist); //路由
app.use('/api/cartslist',cartslist); //路由



app.listen(3003,()=>{
    console.log('server start in port:'+3003);
})