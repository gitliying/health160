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
	render(){
		let {match} = this.props;
		console.log("my path:",this.props)
		return<Switch>
				<Route exact path={match.url + "/reg"} component={Reg}/>
				<Route exact path={match.url } component={Login}/>
				<Route exact path={match.url + "/info"} component={Info}/>
			</Switch>
	}
	
}

export {My};