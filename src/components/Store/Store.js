import React,{Component} from 'react';

import {Route,Switch,withRouter} from 'react-router-dom';


//引入storeMain组件
import {StoreMain} from './StoreMain';
import {Examination} from './Examination';
import {Details} from './Details';

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



class Store extends Component{
	constructor(){
		super();
	}
	
	render(){
		let {match} = this.props;
    	return <div className="store">
	    	 <Switch>
			       <Route path={'/store'} component={StoreMain} exact/>
			       <Route path={match.url + "/examination"} component={Examination} exact/>
			       <Route path={match.url + "/details/:id"} component={Details} exact/>
				</Switch>
    	</div>
    }
}

//编程式导航
Store = withRouter(Store);

export {Store};
