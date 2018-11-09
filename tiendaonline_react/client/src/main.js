import React from 'react';
import { render } from 'react-dom';

import { Router, Route, browserHistory, IndexRoute } from 'react-router';

import App from './App';
import Login from './login/login';
import Productos from './productos/productos';

render(
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Login} />
            <Route path="/productos" component={Productos} />
        </Route>
    </Router>
    ,
    document.getElementById('app')
)

/*
<Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Login} />
            <Route path="/productos" component={Productos} />
        </Route>
    </Router>
*/