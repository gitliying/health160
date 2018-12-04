import React,{Component} from 'react';

//引入样式 
import '../../sass/login.scss';

//引入axios
import axios from 'axios';

//fontAwesome
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faChevronLeft,
	faMobileAlt,
	faLock
    } from '@fortawesome/free-solid-svg-icons';

library.add(
	faChevronLeft,
	faMobileAlt,
	faLock
);


	
class Reg extends Component{
	constructor(){
		super();
		this.state={
			data:[
				{
					logo:"https://wximg.91160.com/wechat/img/account/logo.png"
				},
				{
					iconLeft:"chevron-left",
					iconPhone:"mobile-alt",
					iconLock:"lock"

				}
			]
		}
		this.handlerToHome = this.handlerToHome.bind(this);
		this.handlerToLogin = this.handlerToLogin.bind(this);
		this.handlerQuickReg = this.handlerQuickReg.bind(this);
	}
	//返回首页
	handlerToHome(){
		let{history} = this.props;
		history.push({
            pathname:'/home'
        });
	}
	//去登录
	handlerToLogin(){
		let{history} = this.props;
		history.push({
            pathname:'/my'
        });
	}
	//点击注册事件
//	componentDidMount(){
		handlerQuickReg(){
			
			//获取用户名和密码
			const username = document.getElementById('username').value;
			const userpass = document.getElementById('userpass').value;
			let reg = new RegExp("^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$");
			
			var data={
				username:username,
				userpass:userpass
			}
			if(reg.test(username) && userpass.length>=6){
				console.log(2213)
				axios.post('http://localhost:3003/api/user/reg',data)
				.then((res)=>{
					function go(){
						window.location.href="#/my";
					}
					alert(res.data.msg+'  3秒后跳转到登录界面')
					setTimeout(go,3000)
					
				})
				.catch((res)=>{
					alert(res.data.msg)
				})
			}else{
				alert('邮箱或密码不正确！请重试')
			}
		
		}
//	}

	
	render(){
		return<div className="container">
			<div className="login">
				<div className="login_top">
					<p>
						<a onClick={this.handlerToHome}><FontAwesomeIcon icon={this.state.data[1].iconLeft}/></a>
					</p>
					<div className="logo">
						<img src={this.state.data[0].logo}/>
					</div>
				</div>
				<div className="login_form">
					<div className="login_form_email">
						<span><FontAwesomeIcon icon={this.state.data[1].iconPhone}/></span>
						<input type="text" placeholder="请输入邮箱" id="username"/>
					</div>
					<div className="login_form_email">
						<span><FontAwesomeIcon icon={this.state.data[1].iconLock}/></span>
						<input type="password" placeholder="请输入密码" id="userpass" />
					</div>
					<div className="login_form_login">
						<div className="quickReg" onClick={this.handlerQuickReg}>立即注册</div>
					</div>
					<div className="login_form_reg">
						<span>已注册</span>
						<span onClick={this.handlerToLogin}>直接登录</span>
					</div>
				</div>
			</div>
		</div>
	}
	
}

export {Reg};
