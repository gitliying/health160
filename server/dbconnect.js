const mongoose = require('mongoose');
//链接到test数据库
mongoose.connect('mongodb://localhost:27017/health160',{ useNewUrlParser: true });

//检测是否链接成功
// 1 创建一个实例对象
var db = mongoose.connection;
// 2 监听(error、open、disconnected)
db.on('error', ()=>{
	console.log('链接数据库错误')
});
db.on('open', function() {
  console.log('链接数据库成功');
});
 db.on('disconnected', function () {
     console.log('数据库连接断开');
 })
 









