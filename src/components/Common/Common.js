import React,{Component} from 'react';


//antd-mobile
import { TabBar } from 'antd-mobile';
//antd-mobile样式 
import 'antd-mobile/dist/antd-mobile.css';

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




class Common extends Component{
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
			<TabBar noRenderContent={true}>
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


export {Common};