import React,{Component} from 'react';

import {Route,Switch} from 'react-router-dom';

//引入组件 
import {Reg} from './Reg';
import {Login} from './Login';
import {Info} from './Info';



class My extends Component{
	constructor(){
		super();
		
	}
	//判断如果是登录状态，就跳转到info页面
	componentWillMonunt(){
//		console.log("login666",this.props)
//		let checkLogin = sessionStorage.getItem('userHealth');
//		console.log('checkLogin:',checkLogin)
	//		if(checkLogin){
	//			
	//		}
		}
	render(){
		let {match} = this.props;
		return<Switch>
				<Route exact path={match.url + "/reg"} component={Reg}/>
				<Route exact path={match.url } component={Login}/>
				<Route exact path={match.url + "/info"} component={Info}/>
			</Switch>
	}
	
}

export {My};