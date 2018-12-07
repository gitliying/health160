import React,{Component} from 'react';
 
import {Route,withRouter} from 'react-router-dom';
import axios from 'axios';
import '../../sass/cart.scss';
//fontAwesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
	faChevronCircleRight,

	} from '@fortawesome/free-solid-svg-icons'

library.add(
	faChevronCircleRight
)


class Cart extends Component{
	constructor(){
		super();
		this.state={
			goodslist:[],
			icon:{
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
		axios.post('http://localhost:3003/api/cartslist/cartfind',data)
		.then((res)=>{
			this.setState({
				goodslist:res.data.data[0]
			})
		})
	}
	render(){
		let checkLogin = sessionStorage.getItem('userHealth');
		let{goodslist,icon} =this.state;
		console.log(goodslist);
		return<div className="cart">
				<div className="cartTop">
					<span><FontAwesomeIcon icon={icon.header}/></span>
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
							<button>-</button>
							<input type='text'value={goodslist.total}/>
							<button>+</button>
						</p>
					</div>
				</div>
			</div>
	}
	
}



export {Cart};
