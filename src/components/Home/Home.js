import React,{Component} from 'react';
 
import {Route,withRouter,Switch,Redirect} from 'react-router-dom';



//引入Register组件 
import {Register} from './Register';

//引入Main组件 
import {Main} from './Main';

//引入样式 
import '../../sass/home.scss';


class Home extends Component{
	constructor(){
		super();
		this.handlerGotoRegistration = this.handlerGotoRegistration.bind(this);
	}
	
	
	//去挂号
	handlerGotoRegistration(hospital){
		let {history} = this.props;
		console.log("this.props:",this.props);
		history.push({
			pathname:'/home/register',
			state:hospital
		})
		console.log(hospital)
	}
	
	
	render(){
		let {match} = this.props;
		return<div className="home">
			    <Switch>
			       <Route path={'/home'} component={Main} exact/>
			       <Route path={match.url + "/register"} component={Register} exact/>
				</Switch>
		</div>
	}
	
}

//编程式导航
Home = withRouter(Home);

export {Home};
