import React,{Component} from 'react';
 
import {Route,Switch} from 'react-router-dom';

//引入axios
import axios from 'axios';

//引入搜索栏
import { SearchBar } from 'antd-mobile';


class City extends Component{
	constructor(){
		super();
		this.state={
			cities:''
		}
	}
	//请求城市数据
	componentWillMount(){
		let cities = null;
		axios.get("/city/itemcity/product?lver=7.8.0")
		.then((res)=>{
			cities = res.data.responseData.city;
//			console.log("then cities:",cities);
		})
		
//		this.setState({
//			cities:cities
//		})
//		console.log("cities:",cities)
	}
	//点击搜索城市??如何获取请求的city -> this.setState
	handlerClick(city){
		console.log("click city:",city)
//		this.setState({
//			
//		})
	}
	
	render(){
		let {match} = this.props;
		return<div className="city">
				
				<div
				className="defauleCity"
				onClick={this.handlerClick.bind(this)}
				>
				<span>全部城市</span>
				<SearchBar placeholder="搜索" maxLength={8} />
				</div>
				 
			</div>
	}
	
}

export {City};
