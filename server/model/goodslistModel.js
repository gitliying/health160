const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//创建Schema对象
const goodslistSchema = new Schema({
	id:{type:String},
  	name:{type:String},
  	subhead:{type:String},
  	img:{type:String},
  	keyword:{type:String},
  	orgPrice:{type:String},
  	price:{type:String},
  	addManage:{type:String}
})

//将schema对象变成model //参数1  集合名字  参数2是 schema对象
let goodslist=mongoose.model('goods',goodslistSchema);

module.exports = goodslist;
