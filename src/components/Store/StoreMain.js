import React,{Component} from 'react';

import {Route} from 'react-router-dom';

import axios from 'axios';

//引入样式
import '../../sass/store.scss';

//引入宫格
import { Grid } from 'antd-mobile';

//fontAwesome
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faSearch
    } from '@fortawesome/free-solid-svg-icons';

library.add(
	faSearch
);



class StoreMain extends Component{
	constructor(){
		super();
		this.state={
			icon:[
				{
					iconSearch:"search"
				}
			],
			menu:[
				{
					icon:'https://images.91160.com/primary/201811/2018112918030859629.png',
					text:'体检',
					path:'/examination'
				},
				{
					icon:'https://images.91160.com/primary/201811/2018112918032677084.png',
					text:'药房',
					path:'/pharmacy'
				},
				{
					icon:'https://images.91160.com/primary/201811/2018112918033635931.png',
					text:'保险',
					path:'/insurance'
				},
				{
					icon:'https://images.91160.com/primary/201811/2018112918034865829.png',
					text:'基因专区',
					path:'/gene'
				},
				{
					icon:'https://images.91160.com/primary/201811/2018112918040056962.png',
					text:'中医',
					path:'/chinesemedicine'
				},
				{
					icon:'https://images.91160.com/primary/201811/2018112918042198834.png',
					text:'母婴',
					path:'/fransnana'
				},
				{
					icon:'https://images.91160.com/primary/201811/2018112918043587247.png',
					text:'医美',
					path:'/beautyclinic'
				},
				{
					icon:'https://images.91160.com/primary/201811/2018112918053477420.png',
					text:'口腔',
					path:'/stomatology'
				},
				{
					icon:'https://images.91160.com/primary/201811/2018112918054495751.png',
					text:'国际医疗',
					path:'/internationalmedical'
				},
				{
					icon:'https://images.91160.com/primary/201811/2018112918055840695.png',
					text:'健康管理',
					path:'/healthy'
				}
			],
			//list
			list:[],
		
		}
		this.handlerGotoTarget = this.handlerGotoTarget.bind(this);
		this.watchScroll = this.watchScroll.bind(this);
	}
	
	//请求store列表页数据
	componentWillMount(){
		
		var data = {
			qty:8,
			targetPage:1
		}
		axios.post('http://localhost:3003/api/goodslist/goodslist',data)
		.then((res)=>{
			this.setState({
				list:res.data.data
			})
//			console.log("set data:",this.state.list)
		})
		.catch((err)=>{
			console.log(err)
		})
	}
	
	
	//点击menu菜单，跳转到不同的页面
	handlerGotoTarget(target){
		let{history} = this.props;
		history.push({
			pathname:this.props.location.pathname+target.path,
			state:target
		})
	}
	//去商品详情页
	handlerGoToGoodsDeatails(id){
		let {history,match} = this.props;
		
		//store/details/:id
		let url = match.path + '/details/:'+id;
		history.push(url);
	}
	//加载更多事件
	componentDidMount(){
	    window.addEventListener('scroll', function(){this.watchScroll});
	}
	//
	watchScroll() {
       console.log('scroll2222');
   }
	
//	componentWillUpdate(){
//		if(this.state.scroll.scrollTop > this.state.scroll.maxScroll){
//	       alert("滚动到底了");
//	       return false;
// 		}
//	}
	
    render(){
    	return <div className="store" id="store">
	    	<div className="store_top">
	    		<span><FontAwesomeIcon icon={this.state.icon[0].iconSearch}/></span>
	    		<input type="text" placeholder="输入关键字搜索"/>
	    		<b>取消</b>
	    	</div>
	    	<div className="store_menu">
	    		    <Grid
					    data={this.state.menu}
					    columnNum={5} 
					    itemStyle ={{ width: '75px', height: '90px' }} 
					    renderItem={(menu,idx)=>{
					  	return(
					  		<div className="menu-item"
					  		style={{ padding:'15px 0 0 0'}}>
					  			<img src={menu.icon} 
					  			style={{ width: '40px',height: '40px',}}
					  			
					  			/>
					  			<p 
					  			style={{color: 'rgb(112, 112, 112)',margin: '0'}}>
					  			{menu.text}</p>
					  		</div>
					  	)
					}}
					onClick={this.handlerGotoTarget}
					/> 
			</div>
			<div className="store_list">
				<ul>
					{
						this.state.list.map((item,idx)=>{
							return <li key={item.id}
									onClick={this.handlerGoToGoodsDeatails.bind(this,item.id)}
								>
								<img src={item.img}/>
								<h4>{item.name}</h4>
								<span>{item.addManage}</span>
								<p>
									<b>￥{item.price}</b>
									<b>￥{item.orgPrice}</b>
								</p>
							</li>
						})
					}
				</ul>	
				
			</div>
    	</div>
    }
}

export {StoreMain};
