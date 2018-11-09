import React, { Component } from 'react';
import './barrasuperior.css';

class Barrasuperior extends Component {
  state = {
    carrito: localStorage.getItem('carrito').length > 0 ? JSON.parse(localStorage.getItem('carrito')) : []
  }
  constructor(){
    super();

    
  }

  OnSalir(){
      localStorage.setItem('isLoggedIn', "false");
      localStorage.setItem('carrito',"");
      window.location.href = '/';
  }

  render()
  {
    return (
      <div className="navbar-fixed">
        <nav>
          <div className="nav-wrapper">
            <a className="brand-logo" href="/productos"><h5>La Bodega</h5></a>
            <ul className="right hide-on-med-and-down">
              <li><a href="/productos"><i className="material-icons">apps</i></a></li>
              <li><a href="/pedido"><i className="material-icons notif">shopping_cart</i><small id="badgeCart" className="notification-badge">{this.state.carrito.length.toString()}</small></a></li>
              <li><a href="/productos"><i className="material-icons">inbox</i></a></li>
              <li><a onClick={this.OnSalir} href="/"><i className="material-icons">exit_to_app</i></a></li>
            </ul>
          </div>
        </nav>
      </div>
      
    );
  }
}

export default Barrasuperior;
