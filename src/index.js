import React from 'react';
import {render} from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

import {HashRouter} from 'react-router-dom';

render(
	<HashRouter>
	 <App />
	</HashRouter>
	,
	document.getElementById('root'));

serviceWorker.unregister();
