import React, { Component } from 'react';
import './pedido.css';

import Barrasuperior from '../barrasuperior/barrasuperior';

class Pedido extends Component {
    state = {
        carrito:localStorage.getItem('carrito').length > 0 ? JSON.parse(localStorage.getItem('carrito')) : [],
        totalPedido:0
    }

  constructor(){
    super();

    
  }

  componentWillMount(){
    this.state.carrito.forEach((value) => {this.state.totalPedido += (value.unidadCompra * value.precio);});
  }

  confirmarPedido(){
    fetch('/api/setpedido', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(JSON.parse(localStorage.getItem('carrito'))),
      })
      .then(response => response.json())
      .then(respuesta =>{
        if (respuesta[0].msg === "OK"){
            localStorage.setItem('carrito', '');
            alert('Pedido creado');
            window.location.href = '/productos';
        }else{
            alert(respuesta.msg);
        }
      });
}

  render()
  {
    return (
        <div>
            <Barrasuperior />
            <br/>
            <br/>
            <br/>
            <br/>
            <table className="bordered striped highlight responsive-table" style={{backgroundColor: 'white'}}>
                <thead>
                    <tr>
                        <th></th>
                        <th style={{textalign: 'center'}}>Descripción</th>
                        <th style={{textalign: 'center'}}>Precio</th>
                        <th style={{textalign: 'center'}}>Cantidad</th>
                        <th style={{textalign: 'center'}}>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.carrito.map((item, i) => {
                        return <tr key={i}>
                            <td style={{textalign: 'center', width: '0%'}}><img src={'../img/'+item["imagen"]} style={{height: '4rem',border: '0ch',padding: '0%'}} /></td>
                            <td style={{textalign: 'left'}}>{item["nombre"]}</td>
                            <td style={{textalign: 'right'}}>{item["precio"]}</td>
                            <td style={{textalign: 'center'}}>{item["unidadCompra"]}</td>
                            <td style={{textalign: 'right'}}>{item["unidadCompra"] * item["precio"]}</td>
                        </tr>
                    })}
                </tbody>
                <tfoot>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>TOTAL:</td>
                        <td style={{textalign: 'right'}}>{this.state.totalPedido}</td>
                    </tr>
                </tfoot>
            </table>
            
            <div className="card-action" style={{width: '100%', margin: '0%', padding: '0%', textalign: 'right'}}>
                <a className='btn' href="/productos" style={{margin: '1%', width: '10%',color: 'white'}}>Volver</a>
                <a className="waves-effect waves-light btn-small orange" style={{margin: '1%', width: '10%',color: 'white'}} onClick={this.confirmarPedido.bind()}>Confirmar</a>
            </div>
        </div>
      
    );
  }
}

export default Pedido;
