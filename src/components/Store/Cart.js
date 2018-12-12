import React,{Component} from 'react';
 
import {Route,withRouter} from 'react-router-dom';

import {connect} from 'react-redux';
import {tabbar} from '../../actions';

import axios from 'axios';
import '../../sass/cart.scss';
//fontAwesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
	faChevronLeft,
	faChevronCircleRight,

	} from '@fortawesome/free-solid-svg-icons'

library.add(
	faChevronLeft,
	faChevronCircleRight
)


class Cart extends Component{
	constructor(){
		super();
		this.state={
			goodslist:[],
			icon:{
				back:'chevron-left',
				header:'chevron-circle-right'
			}
		}
	}
	componentWillMount(){
		
		let {match} = this.props;
		let id = match.params.id;
		var data ={
			id:id
		}
		axios.post('/api/cartslist/cartfind',data)
		.then((res)=>{
			if(!res.data.data[0]){
				this.setState({
					goodslist:res.data.data[0]
				})
			}
		})
		
		//隐藏底部菜单
		this.props.changeTabbarStatus(false);
	}
	
	//减少数量
	handlerCut(){
		if(this.refs.Num.value<2){
			this.refs.Num.value=1
		}else{
			this.refs.Num.value--;
		}
		
		let {match} = this.props;
		let id = match.params.id;
		var data ={
			id:id,
			total:this.refs.Num.value
		}
		axios.post('/api/cartslist/cartupdate',data)
		.then((res)=>{
			this.setState({
				goodslist:res.data.data[0]
			})
		})
		
	}
	//增加数量
	handlerAdd(){ 
		let {match} = this.props;
		let id = match.params.id;
		var data ={
			id:id,
			total:++this.refs.Num.value
		}
		axios.post('/api/cartslist/cartupdate',data)
		.then((res)=>{
			
				this.setState({
					goodslist:res.data.data[0]
				})
			
			
		})
	}
	
	//回退到details
	backToDetails(){
		let {history} = this.props;
		history.goBack(-1)
	}
	
	//结束隐藏底部菜单
	componentWillUnmount(){
    	this.props.changeTabbarStatus(true);
    }
	
	render(){
		let checkLogin = sessionStorage.getItem('userHealth');
		let{goodslist,icon} =this.state;
		console.log(goodslist);
		return<div className="cart">
				<div className="cartTop" onClick={this.backToDetails.bind(this)}>
					<span><FontAwesomeIcon icon={icon.back}/></span>
					<span>{goodslist.addManage}</span>
				</div>
				<div className="content">
					<div className="contentLeft">
					     <img src={goodslist.img}/>
					</div>
					<div className="contentRight">
						<p>{goodslist.name}</p>
						<p>￥{goodslist.price}</p>
						<p>
							<span>预付订金￥0.00</span>
							<span>X{goodslist.total}</span>
						</p>
					</div>
				</div>
				<div className="contentBottom">
					<span>合计支付:￥{goodslist.price*goodslist.total}</span>
				</div>
				<div className="massage">
					<div>
					<span>优惠券</span>
					<span>优惠券无可适用优惠券<FontAwesomeIcon icon={icon.header}/></span>
					
					</div>
					<div>
						<span>联系人</span>
						<span>{checkLogin}</span>
					</div>
					<div className="sum">
						<span>购买数量</span>
						<p>
							<button onClick={this.handlerCut.bind(this)}>-</button>
							<input type='text' id="num" ref="Num" disabled="disabled" defaultValue={goodslist.total}/>
							<button onClick={this.handlerAdd.bind(this)}>+</button>
						</p>
					</div>
				</div>
				<div className="toBuy"
					style={{
						position:'fixed',
						bottom: '0',
		                left: '0',
		                right: '0',
		                height:'50px',
		                backgroundColor: '#00d3c2',
		                textAlign: 'center',
		                color: 'white',
		                 fontSize: '16px',
		                 lineHeight:'50px',
		                 zIndex: '999'
					}}
				>
					确定支付￥{goodslist.price*goodslist.total}
				</div>
			</div>
	}
	
}

let mapStateToProps = state=>({});
let mapDispatchToProps = dispatch=>{
	return{
		changeTabbarStatus(status){
			dispatch(tabbar(status));
		}
	}
}


Cart = connect(mapStateToProps,mapDispatchToProps)(Cart);
export {Cart};
