import React,{Component} from 'react';
 
import {Route,Switch} from 'react-router-dom';

//引入axios
import axios from 'axios';

//引入导航
import { NavBar, Icon} from 'antd-mobile';

//引入长列表
import { ListView } from 'antd-mobile';



class Register extends Component{
	constructor(){
		super();
		this.state={
			dataSource:[],
			isLoading: true,
			
		}
	}
	//请求挂号的数据
		componentWillMount(){
		//挂号
		axios.get("/registration/newunit/getUnitList.html?code=0&lng=0&lat=0&page=1&business_type=unit_list&area_id=0&sort_type=1&org_type=")
		.then((res)=>{
			let regData = res.data.data.rows;
//			console.log("registration data:",regData)
			this.setState({
				dataSource:regData
			});
		})
	}


	render(){
		console.log('listdata:',this.state.dataSource)
		let {unit_id,unit_name,image,address,city_id} = this.state.dataSource;
		let {match} = this.props;
		return<div className="register" 
		style={{height:"800px"}}>
				<NavBar
			        mode="dark"
			        icon={<Icon type="left" />}
			        rightContent={null}
			        onLeftClick={() => window.history.back(-1)}
			        rightContent={[
			        <Icon key="0" type="search" />
			        ]}
				    >
				    <ul style={{listStyle:"none",float:'left',width:'100px'}}>
				    	<li>按医院</li>
				    </ul>
				    </NavBar>
			</div>
	}
	
}

export {Register};
