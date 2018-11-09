import React, { Component } from 'react'
import './App.css'
import Login from './login/login';
import Productos from './productos/productos';
import Detalle from './detalle/detalle';
import Pedido from './pedido/pedido';

import { BrowserRouter as Router, Route } from 'react-router-dom';

class App extends Component {
  render() {
   return(
     <Router>
       <div>
       <Route exact path="/" component={Login} />
       <Route path="/productos" component={Productos} />
       <Route path="/detalle/:nombre" component={Detalle} />
       <Route path="/pedido" component={Pedido} />
       </div>
      </Router>
   );
  }
}

export default App;

/*
<div>
       <ul>
         <li><Link to="/productos">Productos</Link></li>
       </ul>
       <div>{this.props.children}</div>
     </div>
*/