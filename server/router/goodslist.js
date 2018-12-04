const express = require('express');
const Router = express.Router();

//引入goodslistModel
const goodslistModel = require('../model/goodslistModel.js');

const utils=require('./utils.js');


//goodlists 
Router.post('/goodslist',(req,res)=>{
	//实现分页，总数据，目标页，每页5条
	let total = 0;
	let qty = Number(req.body.qty);
	let targetPage = Number(req.body.targetPage);
	console.log(qty,targetPage)
    goodslistModel.find({})
	.then((data)=>{
		//数据结构改变，前端接收注意
		console.log("666",data)
//		total = data.length;
//		let array={total:total,goodslist:data};
//		console.log("array:",array)
	 	res.send(utils.sendData(0,'请求ok',data));
	})
	.catch((err)=>{
		console.log(err)
		res.send(utils.sendData(-1,'请求错误',null));
	})
	
})


module.exports=Router;