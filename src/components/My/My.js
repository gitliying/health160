import React,{Component} from 'react';

import {Route,Switch} from 'react-router-dom';

//引入组件 
import {Reg} from './Reg';
import {Login} from './Login';

class My extends Component{
	constructor(){
		super();
		
	}
	render(){
		let {match} = this.props;
		return<div>
			<Switch>
				<Route path={match.url + "/reg"} component={Reg}/>
				<Route path={match.url + "/login"} component={Login}/>
			</Switch>
		</div>
	}
	
}

export {My};