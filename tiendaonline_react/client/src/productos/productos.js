import React, { Component } from 'react';
import './productos.css';
import Barrasuperior from '../barrasuperior/barrasuperior';

class Productos extends Component {
  
  constructor(props){
    super(props);

    if(localStorage.getItem('isLoggedIn') === "true"){
    }else{
      window.location.href = '/';
    }

    //localStorage.setItem('carrito', "");

    this.state = {
      productos:[],
      valueBuscar: '',
      carrito: localStorage.getItem('carrito').length > 0 ? JSON.parse(localStorage.getItem('carrito')) : [],
      id:0
    };

    this.handleChange = this.handleChange.bind(this);
  };

  handleChange(event){
      this.setState({valueBuscar: event.target.value});
      this.getProductos(event.target.value);
  }

  componentWillMount(){
    this.getProductos("");
  }

  getProductos(producto){
    this.state.productos = [];
    var data = {articulo: producto};
    fetch('/api/productos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(productos =>{
      productos.forEach(producto => {
        let data = producto;
        this.setState({productos:this.state.productos.concat([data])});
      })
    });
  };

  verDetalle(event){
    window.location.href = '/detalle/' + event.target.name;
  }

  getCarrito(id){
    
    var producto = {
      nombre:document.getElementById('nom'+id).attributes.name.value,
      unidadCompra:document.getElementById('cant'+id).value,
      imagen:document.getElementById('img'+id).attributes.name.value,
      precio:document.getElementById('pre'+id).attributes.name.value,
      idUsuario:0,
      idProducto:id
    };
    
    if (producto.unidadCompra > 0){}else{producto.unidadCompra = 1}

    if (producto.unidadCompra > 0){
      var index = this.state.carrito.findIndex(function(elemento){
        return elemento.nombre == producto.nombre;
      });
      console.log(index)
      if (index >= 0){
        this.state.carrito[index].unidadCompra = +this.state.carrito[index].unidadCompra + +producto.unidadCompra;
      }else{
        producto.idUsuario = localStorage.getItem('isLoggedId');
        this.state.carrito.push(producto);
      }
      
      localStorage.setItem('carrito',JSON.stringify(this.state.carrito));

      document.getElementById("badgeCart").innerHTML = this.state.carrito.length.toString();

      console.log(this.state.carrito);
      console.log(JSON.parse(localStorage.getItem('carrito')));
    }
    
  }

  render()
  {
    return (
      <div>
        <Barrasuperior />
        <br/>
        <br/>
        <br/>
        <div className="container">
          <div className="row">
            <div className="col s12 m6 l8">
                <h4>Catálogo de Productos</h4>
            </div>
            
            <div className="col s12 m6 l4">
              <h5>¿Que estás buscando?</h5>
              <input placeholder="Buscar producto" type="text" className="browser-default input-buscar" value={this.state.valueBuscar} onChange={this.handleChange}/>
            </div>
          </div>
        </div>
      
        <div className="container">
          <div className="row">
          {this.state.productos.map((item, i) => {
            return <div key={i} className="col s12 m6 l3">

              <div id={'nom'+item["id"]} name={item["nombre"]}></div>
              <div id={'pre'+item["id"]} name={item["precio"]}></div>
              <div id={'img'+item["id"]} name={item["imagen"]}></div>
              
              <div className="card">
                <div className="card-image">
                <img src={item["img"]}></img>
                </div>
                <div className="card-content">
                  <h5>{item["nombre"]}</h5>
                  <h6>Precio: {item["precio"]}</h6>
                  <h6>Unidades disponibles: {item["disponible"]}</h6>
                </div>
                <div className="card-action">
                  <a className='btn btn-vermas' name={item["nombre"]} onClick={this.verDetalle.bind()}>Ver mas</a>
                  <a className="waves-effect waves-light btn-small orange btn-anadir" id={item['id']} onClick={event => {this.getCarrito(event.target.id)}} >Añadir</a>
                  <input type="number" className="browser-default input-cant" id={'cant'+item["id"]} />
                </div>
              </div>
            </div>
          })}
          </div>
        </div>
        </div>
    );
  }
}
/*
function getProductos(producto){
  var data = {articulo: producto};
  const resultado = fetch('/api/productos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  var productosArray = [];
  Object.keys(resultado).forEach(function(key) {
    productosArray.push(resultado[key]);
  });
  return productosArray;
};
*/
export default Productos;
