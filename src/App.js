import React,{Component} from 'react';
import {Route,NavLink,Switch,Redirect,withRouter} from 'react-router-dom';

import {connect} from 'react-redux';


//antd-mobile
import { TabBar } from 'antd-mobile';
//antd-mobile样式 
import 'antd-mobile/dist/antd-mobile.css';

//引入组件
import {Home} from './components/Home/Home';
import {Doctor} from './components/Doctor/Doctor';
import {Store} from './components/Store/Store';
import {Message} from './components/Message/Message';
import {My} from './components/My/My';
import {Notfound} from './components/Page/Page';

//引入公共样式
import './sass/common/common.scss';

//fontAwesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
	faHome,
	faUserMd,
	faCartArrowDown,
	faBell,
	faUser,
	faMapMarkerAlt,
	faSearch,
	faEnvelope,

	} from '@fortawesome/free-solid-svg-icons'

library.add(
	faHome,
	faUserMd,
	faCartArrowDown,
	faBell,
	faUser,
	faMapMarkerAlt,
	faSearch,
	faEnvelope,
)




class App extends Component{
	constructor(){
		super();
		this.state = {
			tabs:[
				{
					title:"首页",
					path:"/home",
					icon:"home"
				},
				{
					title:"名医",
					path:"/doctor",
					icon:"user-md"
				},
				{
					title:"商城",
					path:"/store",
					icon:"cart-arrow-down"
				},
				{
					title:"消息",
					path:"/message",
					icon:"bell"
				},
				{
					title:"我的",
					path:"/my",
					icon:"user"
				}
			],
			currentTab:0
		}
	}
	
	handlerClick(idx,path){
		this.setState({
			currentTab:idx
		})
		console.log("this.setState:",this.state.currentTab);
		
		//编程式导航 withRouter
		this.props.history.push(path)
	}
	
	componentWillMount(){
		let hash = window.location.hash.slice(1);
		//获取当前索引
		let currentTab = 0;
		this.state.tabs.some((item,idx)=>{
			currentTab = idx;
			return item.path===hash;
		});
		
		this.setState({
			currentTab
		});
		
	}
	
	
	render(){
		return(
		<div className="container">
				<Switch>
					<Route path="/home" component={Home}/>
					<Route path="/doctor" component={Doctor}/>
					<Route path="/store" component={Store}/>
					<Route path="/message" component={Message}/>
					<Route path="/my" component={My}/>
					<Route path="/404" component={Notfound}/>
					<Redirect from="/" to="/home" exact/>
					<Redirect to="/404" />
				</Switch>
			<TabBar 
			noRenderContent={true}
			hidden = {!this.props.tabbarStatus}
			>
				{
					this.state.tabs.map((tab,idx)=>{
						return <TabBar.Item
				            title={tab.title}
				            key={tab.path}
				            icon={<FontAwesomeIcon icon={tab.icon}/>}
				            selectedIcon={<FontAwesomeIcon icon={tab.icon}/>}
				            selected={this.state.currentTab === idx}
				            onPress={this.handlerClick.bind(this,idx,tab.path)}
				          >
			          </TabBar.Item>
					})
				}
		    </TabBar>
	    </div>
	    )  
	}
}

let mapStateToProps = state=>{
	console.log("app state:",state)
	return {
		tabbarStatus:state.commonReducer.tabbarStatus
	}
}

App = connect(mapStateToProps)(App);

//编程式导航
App = withRouter(App);

export default App;