import React,{Component} from 'react';
 
import {Route,withRouter,Switch,Redirect} from 'react-router-dom';

//引入axios
import axios from 'axios';

//引入antd-mobile 轮播图
import {Carousel} from 'antd-mobile';

//引入宫格
import { Grid } from 'antd-mobile';

//引入City组件 
import {City} from '../Common/City';



class Main extends Component{
	constructor(){
		super();
		//swiper的数据
		this.state = {
			//轮播图
			data:[
				{val:"1",imgurl:'https://images.91160.com/primary/201811/2018112214573210911.jpg'},
				{val:"2",imgurl:'https://images.91160.com/primary/201811/2018110914424081162.png'},
				{val:"3",imgurl:'https://images.91160.com/primary/201810/2018102914513362317.jpg'},
				{val:"4",imgurl:'https://images.91160.com/primary/201811/2018110913520426597.jpg'},
				{val:"5",imgurl:'https://images.91160.com/primary/201811/2018110913570559323.jpg'},
			],
			imgHeight: 176,
			//小菜单的数据
		    menu:[
				{
					icon:'http://images.91160.com/AppConfig/201807/2018070416071940112.png',
					text:'挂号',
					path:'/register'
				},
				{
					icon:'http://images.91160.com/AppConfig/201807/2018070416092190636.png',
					text:'找名医',
					path:'/finddocter'
				},
				{
					icon:'http://images.91160.com/AppConfig/201807/2018070416085339746.png',
					text:'问医生',
					path:'/askdoctor'
				},
				{
					icon:'http://images.91160.com/AppConfig/201807/2018070416100299382.png',
					text:'买药',
					path:'/buymedicine'
				},
				{
					icon:'http://images.91160.com/AppConfig/201807/2018070416103176483.png',
					text:'挂号必看',
					path:'/takecare'
				}
			],
			//二级menu
			menu2:[
				{
					icon:'http://images.91160.com/AppConfig/201807/2018070416071940112.png',
					text:'体检',
					path:'/register'
				},
				{
					icon:'https://images.91160.com/primary/201811/2018111409224447512.png',
					text:'口腔',
					path:'/finddocter'
				},
				{
					icon:'https://images.91160.com/primary/201811/2018111409225854709.png',
					text:'妇产儿科',
					path:'/askdoctor'
				},
				{
					icon:'https://images.91160.com/primary/201811/2018111409231150460.png',
					text:'中医',
					path:'/buymedicine'
				},
				{
					icon:'https://images.91160.com/primary/201811/2018111409233011542.png',
					text:'医美',
					path:'/takecare'
				},
				{
					icon:'https://images.91160.com/primary/201811/2018111409234774118.png',
					text:'母婴',
					path:'/takecare'
				},
				{
					icon:'https://images.91160.com/primary/201811/2018111409241722080.png',
					text:'眼科',
					path:'/takecare'
				},
				{
					icon:'https://images.91160.com/primary/201811/2018111409243510178.jpg',
					text:'保险',
					path:'/takecare'
				},
				{
					icon:'https://images.91160.com/primary/201811/2018111409245355176.png',
					text:'心理',
					path:'/takecare'
				},
				{
					icon:'https://images.91160.com/primary/201811/2018111409250870383.png',
					text:'更多',
					path:'/takecare'
				}
			],
			//activity
			activity:[
				{
					icon:'http://images.91160.com/AppConfig/201811/2018112615461573250.png',
					text:'种植牙补贴'
				},
				{
					icon:'http://images.91160.com/AppConfig/201811/2018112610450229539.png',
					text:'香港疫苗专场'
				},
				{
					icon:'http://images.91160.com/AppConfig/201811/2018112111465728555.png',
					text:'种植牙补贴秋季补水美肤特惠'
				},
				{
					icon:'http://images.91160.com/AppConfig/201811/2018111618474238568.png',
					text:'女性福利大放送'
				},
				{
					icon:'http://images.91160.com/AppConfig/201811/2018111616180050217.jpg',
					text:'公益：洁牙美肤1元抢'
				},
				{
					icon:'http://images.91160.com/AppConfig/201811/2018111510225359832.png',
					text:'HPV疫苗基因专区'
				}
			
			],
			//home-list
			list:[
				"推荐",
				"医生文章",
				"独家",
				"母婴",
				"生活",
				"两性"
			],
			
			//城市所对应的医院名称
			hospital:[],
		}
		
		this.handlerGotoRegistration = this.handlerGotoRegistration.bind(this);
	}
	
	componentWillMount(){
		//名医
		axios.get("/api/doctor/categorylist.html")
		.then((res)=>{
//			console.log("tab doctor data:",res)
		})
		//找名医
		//https://weixin.91160.com/
		axios.get("/api/doctor/fastRecommendDoctor.html?cid=&size=10&p=1&lat=0&lng=0")
		.then((res)=>{
//			console.log("find doctor data:",res)
		})
	}
	//去挂号
	handlerGotoRegistration(hospital){
//		console.log("hospital path",hospital.path)
		let {history} = this.props;
//		console.log('1111:',this.props.location.pathname+hospital.path);
		history.push({
			pathname:this.props.location.pathname+hospital.path,
			state:hospital
		})
	}
	
	
	render(){
		
		return <div className="home">
		<Route component={City} />
				   <Carousel
				         autoplay={true}
				         infinite
				        >
				          {this.state.data.map(res => (
				            <a
				              key={res.val}
				              style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
				            >
				              <img
				                src={res.imgurl}
				                alt=""
				                style={{ width: '100%', verticalAlign: 'top' }}
				                onLoad={() => {
				                  // fire window resize event to change height
				                  window.dispatchEvent(new Event('resize'));
				                  this.setState({ imgHeight: 'auto' });
				                }}
				              />
				            </a>
				          ))}
				    </Carousel>
				    <Grid
					    data={this.state.menu}
					    columnNum={5} 
					    itemStyle ={{ width: '75px', height: '90px' }} 
					    renderItem={(menu,idx)=>{
					  	return(
					  		<div className="menu-item"
					  		style={{ padding:'15px 0 0 0'}}>
					  			<img src={menu.icon} 
					  			style={{ width: '45px',height: '45px',}}
					  			
					  			/>
					  			<p 
					  			style={{color: 'rgb(112, 112, 112)',margin: '0'}}>
					  			{menu.text}</p>
					  		</div>
					  	)
					}}
					onClick={this.handlerGotoRegistration}
					/> 
					  <Grid data={this.state.menu2} 
					  columnNum={5} 
					    renderItem={(menu2,idx)=>{
					  	return(
					  		<div className="menu2-item" style={{ padding:'15px 0 0 0'}}>
					  			<img src={menu2.icon} 
					  			style={{ width: '24px',height: '24px',}}/>
					  			<p 
					  			style={{color: 'rgb(112, 112, 112)',margin: '0'}}>
					  			{menu2.text}</p>
					  		</div>
					  		)
					  	}}
					  />
					<div className="activity">
			  			<div className="activityTop">
			  				<span><b></b> 精彩活动</span>
			  				<span>更多 </span>
			  				
			  			</div>
			  			<div className="activityContent"> 
							    {
							    	this.state.activity.map((item,idx)=>{
							    		return(
									  		<div 
										  		className="activityItem" 
										  		key={item.text}
										  		style={{ padding:'15px 0 0 0'}}
									  		>
									  			<img src={item.icon} 
									  				style={{ width: '110px',height: '80px'}}
									  			/>
									  			<p
									  				style={{color: 'rgb(112, 112, 112)',margin: '10px'}}
									  			>
									  			{item.text}
									  			</p>
									  		</div>
									  	)
							    	})
							    }
			  			</div>
		  			</div>
		  			
		  			<div className="listContent">
					  	{
					  		this.state.list.map((item,idx)=>{
					  			return(
					  				<span style={{color: '#363636',marginLeft:"25px"}} key={item}>
					  					<a href="">
					  					{item}
					  					</a>
					  				</span>
					  			)
					  		})
					  	}
		  			</div>
		</div>
	}
	
}


export {Main};
