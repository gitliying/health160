const express = require('express');
const Router = express.Router();

//引入cartModel
const cartslistModel = require('../model/cartslistModel.js');

const utils=require('./utils.js');

//加入购物车
Router.post('/cart',(req,res)=>{
	console.log('cart123:',req.body)
	let {id,total,name,img,addManage,price} = req.body;
	let cartdata = {
		id:id,
		total:total,
		name:name,
		img:img,
		addManage:addManage,
		price:price
		
	};
	cartslistModel.find({id:id})
	.then((data)=>{
		console.log('total1234:',data)
		if(data.length>=1){
			return cartslistModel.updateMany({id},{ $set:{total:++data[0].total} })
			.then((data)=>{
			 	res.send(utils.sendData(0,'加入购物车成功',data));
			})
			.catch((err)=>{
				console.log(err)
				res.send(utils.sendData(-1,'请求错误',null));
			})
		}else{
			cartslistModel.insertMany(cartdata)
			.then((data)=>{
		//		console.log('cartdata',data)
			 	res.send(utils.sendData(0,'加入购物车成功',data));
			})
			.catch((err)=>{
				console.log(err)
				res.send(utils.sendData(-1,'请求错误',null));
			})
		}
	})
	
		
	
    
	
})

//查找
Router.post('/cartfind',(req,res)=>{
	let id = Number(req.body.id);
//	console.log(id);
    cartslistModel.find({id:id})
	.then((data)=>{
//		console.log("666",data)
	 	res.send(utils.sendData(0,'请求ok',data));
	})
	.catch((err)=>{
		console.log(err)
		res.send(utils.sendData(-1,'请求错误',null));
	})
	
})


module.exports=Router;