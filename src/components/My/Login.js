
import React,{Component} from 'react';

//引入样式 
import '../../sass/login.scss';

//引入axios
import axios from 'axios';

//隐藏tabbar菜单
import {connect} from 'react-redux';
import {tabbar} from '../../actions';


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

class Login extends Component{
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
		this.handlerToReg = this.handlerToReg.bind(this);
		this.handlerQuickLogin = this.handlerQuickLogin.bind(this);
	}
	//返回首页
	handlerToHome(){
		let{history} = this.props;
		history.push({
            pathname:'/home'
        });
	}
	//去注册
	handlerToReg(){
		console.log('login to reg',this.props);
		let{history} = this.props;
		history.push({
            pathname:'/my/reg'
        });
	}
//	componentWillMount(){
//		console.log(document.getElementById('username'))
//	}
	//登录事件
	handlerQuickLogin(){
	    //获取用户名和密码
		const username = document.getElementById('username').value;
		const userpass = document.getElementById('userpass').value;
		
		var data={
			username:document.getElementById('username').value,
			userpass:document.getElementById('userpass').value
		}
		axios.post('http://localhost:3003/api/user/login',data)
		.then((res)=>{
			if(res.data.err==0){
				function go(){
						window.location.href="/";
					}
					alert(res.data.msg+'  3秒后跳转到首页界面')
					setTimeout(go,3000)
				sessionStorage.setItem('userHealth',username); // 存入一个值
			}else if(res.data.err==-1){
				alert(res.data.msg)
			}
			
		})
		
		}
	
	//隐藏tabbar菜单 
	componentWillMount(){
		this.props.changeTabbarStatus(false);
	}
    componentWillUnmount(){
    	this.props.changeTabbarStatus(true);
    }
	
	render(){
		console.log("login data:",this.state.data[0].logo)
		return<div className="login">
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
						<div onClick={this.handlerQuickLogin}>立即登录</div>
					</div>
					<div className="login_form_reg">
						<span>忘记密码?</span>
						<span onClick={this.handlerToReg}>快速注册</span>
					</div>
				</div>
			</div>
	}
	
}
let mapStateToProps = state=>({});
let mapDispatchToProps=dispatch=>{
	return{
		changeTabbarStatus(status){
			dispatch(tabbar(status));
		}
	}
}


Login = connect(mapStateToProps,mapDispatchToProps)(Login);

export {Login};
