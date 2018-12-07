import React,{Component} from 'react';
 
import {Route,Switch,withRouter} from 'react-router-dom';

import {connect} from 'react-redux';

import {tabbar} from '../../actions';

import '../../sass/storeDetails.scss';

//axios
import axios from 'axios';

//fontAwesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
	faPhone,
	faComments,
	faStar
	} from '@fortawesome/free-solid-svg-icons'

library.add(
	faPhone,
	faComments,
	faStar
)


class Details extends Component{
	constructor(){
		super();
		this.state = {
			details:'',
			detailsMore:[],
			orderlist:{
				iconCall:'phone',
				iconComments:'comments',
				iconStart:'star'
			}
		}
		this.handlerToCart = this.handlerToCart.bind(this);
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
//			console.log('type:',res.data.data.detailParts)
			this.setState({
				detailsMore:res.data.data.detailParts
			})
		})
		
		//隐藏tab菜单
//		console.log('details:',this.props)
		this.props.changeTabbarStatus(false);
	}
	componentWillUnmount(){
		this.props.changeTabbarStatus(true);
	}
	
	//去购物车,并传入数据库
	handlerToCart(){
		const total = 1;
		let {id} = this.state.details;
		console.log('id111',id)
		let {img} = this.state.details;
		let {name} = this.state.details;
		let {addManage} = this.state.details;
		let {price} = this.state.details;
		let checkLogin = sessionStorage.getItem('userHealth');
		let {history,match} = this.props;
		if(!checkLogin){
			history.push('/my');
		}else{
			history.push('/store/cart/'+id);
//			let id = match.params.id.slice(1);
			let data = {
				id:id,
				total:total,
				name:name,
				img:img,
				addManage:addManage,
				price:price
			}
			//把相应的商品信息加入购物车
			axios.post('http://localhost:3003/api/cartslist/cart',data)
			.then((res)=>{
				console.log("cart res:",res)
//				alert(res.data.msg)
			})
		}
	}
	
	render(){
		let {details} = this.state;	
		let {orderlist} = this.state;
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
				<div className="detailsOrder">
					<div className="left">
						<div>
							<span><FontAwesomeIcon icon={orderlist.iconCall}/></span>
							<p>电话咨询</p>
						</div>
						<div>
							<span><FontAwesomeIcon icon={orderlist.iconComments}/></span>
							<p>在线咨询</p>
						</div>
						<div>
							<span><FontAwesomeIcon icon={orderlist.iconStart}/></span>
							<p>收藏</p>
						</div>
					</div>
					<div className="right" onClick={this.handlerToCart}><span className="buy">立即购买</span></div>
				
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

Details = withRouter(Details);
export {Details};
