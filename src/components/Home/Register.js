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
			console.log("registration data:",regData)
			this.setState({
				dataSource:regData
			});
		})
	}
	
	  onEndReached = (event) => { 
	    if (this.state.isLoading == false) {
	      return;
	    }
	    console.log('reach end', event);
	    this.setState({ isLoading: true });
	    setTimeout(() => {
	      this.setState({
	        dataSource: this.state.dataSource,
	        isLoading: false,
	      });
	    }, 1000);
	  }
	
	
	render(){
		console.log('listdata:',this.state.dataSource)
		let {unit_id,unit_name,image,address,city_id} = this.state.dataSource;
		let {match} = this.props;
		return<div className="register">
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
				    {
					 /*列表，懒加载
					
				  
				        <div key={unit_id} style={{ padding: '0 15px' }}>
				          <div
				            style={{
				              lineHeight: '50px',
				              color: '#888',
				              fontSize: 18,
				              borderBottom: '1px solid #F6F6F6',
				            }}
				          >{unit_name}</div>
				          <div style={{ display: '-webkit-box', display: 'flex', padding: '15px 0' }}>
				            <img style={{ height: '64px', marginRight: '15px' }} src={image} alt="" />
				            <div style={{ lineHeight: 1 }}>
				              <div style={{ marginBottom: '8px', fontWeight: 'bold' }}>{address}</div>
				              <div><span style={{ fontSize: '30px', color: '#FF6E27' }}>{city_id}</span>¥</div>
				            </div>
				          </div>
				        </div>
				     
				    <ListView
				        ref={el => this.lv = el}
				        dataSource={this.state.dataSource}
				       
				        renderRow={this.state.dataSource[0]}
				        pageSize={4}
				        useBodyScroll
				        onScroll={() => { console.log('scroll'); }}
				        scrollRenderAheadDistance={500}
				        onEndReached={this.onEndReached}
				        onEndReachedThreshold={10}
				      />
				    */}
				    
				    
				    
				    
			</div>
	}
	
}

export {Register};
