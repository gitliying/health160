import React,{Component} from 'react';
 
import {Route,Switch} from 'react-router-dom';

import {connect} from 'react-redux';

import {tabbar} from '../../actions';

import '../../sass/storeDetails.scss';

//axios
import axios from 'axios';

class Details extends Component{
	constructor(){
		super();
		this.state = {
			details:'',
			detailsMore:[],
		}
	}
	componentWillMount(){
		let {match} = this.props;
		var data = {
			id:match.params.id.slice(1)
		}
		//详情数据1
		axios.post('http://localhost:3003/api/goodslist/details',data)
		.then((res)=>{
			this.setState({
				details:res.data.data[0]
			})
		})
		.catch((err)=>{
			console.log(err)
		})
		
		//详情数据2
		axios.get('/registration/health/detail.html?goods_id=6521&order_id=&cid=&jstoken=')
		.then((res)=>{
			console.log('type:',res.data.data.detailParts)
			this.setState({
				detailsMore:res.data.data.detailParts
			})
		})
		
		//隐藏tab菜单
		console.log('details:',this.props)
		this.props.changeTabbarStatus(false);
	}
	componentWillUnmount(){
		this.props.changeTabbarStatus(true);
	}
	
	
	render(){
		let {details} = this.state;	
		return<div className="details">
				<div className="detailsTop">
					<img src={details.img}/> 
				</div>
				<div className="detailsContent">
					<h4>{details.name}</h4>
					<span>{details.subhead}</span>
					<p>
						<b>￥{details.price}</b>
						<b>￥{details.orgPrice}</b>
					</p>
					<div>
					 <b>预付定金￥{details.price}</b>
					 <b>到店再付￥0.00</b>
					</div>
				</div>
				<div className="detailsStory">
					<p>品牌故事</p>
					<div className="detailsHostpital">
						<h4>{details.addManage}</h4>
						<p>医院评价</p>
					</div>
				</div>
				<div className="detailsOver">
					<div className="detailsOverTop">
						详情
					</div>
					<div className="detailsOverContent"
					dangerouslySetInnerHTML = {{__html:this.state.detailsMore.detail}}
					>
					</div>
					
				</div>
			</div>
	}
	
}

let mapStateToProps=state=>({});
let mapDispatchToProps = dispatch=>{
    return {
        // 把changeTabbarStatus方法映射到props
        changeTabbarStatus(status){
            dispatch(tabbar(status));
        }
    }
}

Details = connect(mapStateToProps,mapDispatchToProps)(Details);

export {Details};
