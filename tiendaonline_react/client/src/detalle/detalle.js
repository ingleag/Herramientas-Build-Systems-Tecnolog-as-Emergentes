import React, { Component } from 'react';
import './detalle.css';
import Barrasuperior from '../barrasuperior/barrasuperior';

class Detalle extends Component {
    state = {
        carrito:localStorage.getItem('carrito').length > 0 ? JSON.parse(localStorage.getItem('carrito')) : [],
        id:0
    }

    constructor(){
        super();

        if(localStorage.getItem('isLoggedIn') === "true"){
        }else{
          window.location.href = '/';
        }
    }
    

    componentWillMount(){
        this.setState({producto:[]});
        var data = {articulo: this.props.match.params.nombre};
        
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
                this.setState({producto:this.state.producto.concat([data])});
            })

            console.log(this.state.producto);
        });
    }

      getCarrito(id){
    
        console.log(document.getElementById('cant'+id).value);
        console.log(document.getElementById('nom'+id).attributes.name.value);
    
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

          window.location.href = '/productos';

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
                    {this.state.producto.map((item, i) => {
                        return <div key={i} className="row">

                            <div id={'nom'+item["id"]} name={item["nombre"]}></div>
                            <div id={'pre'+item["id"]} name={item["precio"]}></div>
                            <div id={'img'+item["id"]} name={item["imagen"]}></div>
                            

                            <div className="card">
                                <div className="col s4">
                                    <div className="card-image">
                                        <img src={"../img/" + item["imagen"]} style={{height: '18rem'}} />
                                    </div>
                                </div>
                                <div className="col s8">
                                    <div className="card-content">
                                        <h5>{item["nombre"]}</h5>
                                        <h6>Precio: {item["precio"]}</h6>
                                        <h6>Unidades disponibles: {item["disponible"]}</h6>
                                    </div>
                                    <div className="card-action" style={{width: '100%', margin: '0%', padding: '0%'}}>
                                    <a class='btn' style={{margin: '1%', width: '40%',color: 'white'}} href="/productos" modal>Volver</a>
                                        <a className="waves-effect waves-light btn-small orange btn-anadir" id={item['id']} onClick={event => {this.getCarrito(event.target.id)}} >Añadir</a>
                                        <input type="number" className="browser-default input-cant" id={'cant'+item["id"]} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    })}
                </div>
            </div>
        
        );
    }
}

export default Detalle;
