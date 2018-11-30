import React,{Component} from 'react';
 
import {Route} from 'react-router-dom';

//引入axios
import axios from 'axios';

//引入antd-mobile 轮播图
import {Carousel} from 'antd-mobile';

//引入宫格
import { Grid } from 'antd-mobile';

//引入City组件 
import {City} from './City';

//引入样式 
import '../../sass/home.scss';


class Home extends Component{
	constructor(){
		super();
		//swiper的数据
		this.state = {
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
			//home-list
			list:[
				"推荐",
				"医生文章",
				"独家",
				"母婴",
				"生活",
				"两性",
				"问答"
			]
		}
	}
	
	componentWillMount(){
		axios.get("/api/doctor/categorylist.html")
		.then((res)=>{
			console.log("home data:",res)
		})
	}
	render(){
		let {match} = this.props;
		return<div className="home">
			<div className="carousel">
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
				  			style={{ width: '45px',height: '45px',}}/>
				  			<p 
				  			style={{color: 'rgb(112, 112, 112)',margin: '0'}}>
				  			{menu.text}</p>
				  		</div>
				  	)
				  }}
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
				  
				  
				  
				   <Grid
					   data={this.state.list} 
					   isCarousel={true}
					   columnNum={6}
					   carouselMaxRow={1}
					   hasLine={false}
					   style={{height:"50px"}}
					   renderItem={(list)=>{
				  	    return(
				  			<p 
					  			style={{color: '#363636',height:"10px"}}>
					  			{list}
				  			</p>
				  		)
				  	}}
					/>
		    </div>
		</div>
	}
	
}

export {Home};
