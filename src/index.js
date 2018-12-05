import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import App from './App';
import * as serviceWorker from './serviceWorker';

import {HashRouter} from 'react-router-dom';
import store from './store';

render(
	<Provider store={store}>
		<HashRouter>
		 <App />
		</HashRouter>
	</Provider>
	,
	document.getElementById('root'));

serviceWorker.unregister();
