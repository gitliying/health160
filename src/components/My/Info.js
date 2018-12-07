import React,{Component} from 'react';

//引入样式 
import '../../sass/info.scss';

class Info extends Component{
	constructor(){
		super();
		this.state={
			info:{
				photo:'https://wximg.91160.com/wechat/img/common/avatar_user_.jpg'
			}
		}
	}
	componentWillMount(){

	}
	render(){
		let {info}= this.state;
		console.log('info photo',info.photo)
		return<div className="info">
			 <div className="top">
				 <img src={info.photo}/>
				 <div className="middle">
				 	<p>请完善账号信息</p>
				 	<p>升级会员享受更多福利</p>
				 	<p>加入会员</p>
				 </div>
				 <div className="right">健康打卡</div>
			 </div>
		</div>
	}
	
}

export {Info};
