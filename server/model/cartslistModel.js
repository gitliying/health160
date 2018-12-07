const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//创建Schema对象
const cartslistSchema = new Schema({
	id:{type:String},
	total:{type:String},
	name:{type:String},
	img:{type:String},
	addManage:{type:String},
	price:{type:String}
})

//将schema对象变成model //参数1  集合名字  参数2是 schema对象
let cartslist=mongoose.model('carts',cartslistSchema);

module.exports = cartslist;
