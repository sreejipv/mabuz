import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { BrowserRouter} from 'react-router-dom';

import Home from './Pages/Home';



const AppRouter = (

<Router>
		<Switch>
		<BrowserRouter basename={window.location.pathname || ''}>
			<Route path='/' exact component={Home} />
		</BrowserRouter>
		</Switch>
	</Router>
);

export default AppRouter