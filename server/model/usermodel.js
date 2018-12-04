const mongoose = require('mongoose');
let Schema = mongoose.Schema;

//创建和表相关的对象，相当于实例化一个对象    type 字段类型  required 是否必须
let userSchema = new Schema({
	username:{type:String,required:true},
	userpass:{type:String,required:true}
})
// 将schema对象变成model  参数1  集合名字  参数2是 schema对象  
// 灵异事件：mongoose 会把你的集合名字自动变成复数  user -> users   
let usermodel = mongoose.model('user', userSchema);

//抛出
module.exports = usermodel;