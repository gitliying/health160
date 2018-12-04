import React,{Component} from 'react';

import {Route} from 'react-router-dom';

//引入样式
import '../../sass/store.scss';

import {City} from '../Common/City';


class Store extends Component{
    render(){
    	return <div className="store">
    		<Route component={City} />
    	</div>
    }
}

export {Store};
