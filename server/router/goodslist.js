const express = require('express');
const Router = express.Router();

//引入goodslistModel
const goodslistModel = require('../model/goodslistModel.js');

const utils=require('./utils.js');


//goodlists 列表页
Router.post('/goodslist',(req,res)=>{
	//实现分页，总数据，目标页，每页5条
	let total = 0;
	let qty = Number(req.body.qty);
	let targetPage = Number(req.body.targetPage);
	console.log(qty,targetPage)
    goodslistModel.find({}).limit(qty).skip((targetPage-1)*qty)
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

//详情页
Router.post('/details',(req,res)=>{
	let id = Number(req.body.id);
	console.log(id);
    goodslistModel.find({id:id})
	.then((data)=>{
		console.log("666",data)
	 	res.send(utils.sendData(0,'请求ok',data));
	})
	.catch((err)=>{
		console.log(err)
		res.send(utils.sendData(-1,'请求错误',null));
	})
	
})

Router.post('/search',(req,res)=>{
	let {keyword} = req.body;
	console.log(keyword);
    goodslistModel.find({'keyword':{ '$regex': keyword} })
	.then((data)=>{
		console.log("keyword:",data)
	 	res.send(utils.sendData(0,'请求ok',data));
	})
	.catch((err)=>{
		console.log(err)
		res.send(utils.sendData(-1,'请求错误',null));
	})
	
})


module.exports=Router;