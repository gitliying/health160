const express = require('express');

//路由
const Router = express.Router();

//引入model就是为了可以curd
const userModel = require('../model/usermodel.js');

//引入返回构建数据
const utils = require('./utils.js');


Router.post('/login',(req,res)=>{
		let {username,userpass} = req.body;
		userModel.find({username,userpass})
		.then((data)=>{
			console.log(data)
			if(data.length>=1){
				return res.send(utils.sendData(0,'登录成功',null))
			}
				res.send(utils.sendData(-1,'登录失败，请重试',null))
		})
		
})


Router.post('/reg',(req,res)=>{
		let {username,userpass} = req.body;
		userModel.find({username})
		.then((data)=>{
			if(data.length>=1){
				return res.send(utils.sendData(-1,"该邮箱已被注册，请登录",null))
			}else if(data.length<1){
				userModel.insertMany({username,userpass})
				.then((data)=>{
					console.log(data)
					res.send(utils.sendData(0,'注册成功，请登录',null))
				})
				.catch((err)=>{
					console.log(err)
					res.send(utils.sendData(-1,'注册失败，请重试',null))
				})
			}
		})
		
})

//抛出
module.exports = Router;
