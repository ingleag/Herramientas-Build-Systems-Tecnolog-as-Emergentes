import { Component, OnInit } from '@angular/core';
import { HttpService } from '.././http.service';
import {Router} from "@angular/router";

@Component({
  selector: 'productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  productos: any[] = [];
  productoDet: any[] = [];
  carrito: any[] = localStorage.getItem('carrito').length > 0 ? JSON.parse(localStorage.getItem('carrito')) : [];
  showDetalle: boolean = false;
  
  constructor(private httpService: HttpService, private router: Router) { }

  ngOnInit() {
    if(localStorage.getItem('isLoggedIn') == "true"){
      this.retrieveProductos('');
    }else{
      this.router.navigate(['']);
    }

    if (this.carrito.length > 0){
      document.getElementById("badgeCart").innerHTML = this.carrito.length.toString();
    }else{
      document.getElementById("badgeCart").innerHTML = '0';
    }
  }

  onSearchChange(searchValue : string) {  
    this.retrieveProductos(searchValue);
  }

  retrieveProductos(searchValue : string){
    this.httpService.getProductos(searchValue)
      .subscribe(respuesta => {
        if(respuesta.msg == 'OK'){
          this.productos = respuesta.productos;
        }
      });
  }
  
  getCarrito(producto:any, unidades:number){
    if (unidades > 0){
      var index = this.carrito.findIndex(function(elemento){
        return elemento.nombre == producto.nombre;
      });
      console.log(index)
      if (index >= 0){
        this.carrito[index].unidadCompra = +this.carrito[index].unidadCompra + +unidades;
      }else{
        producto.unidadCompra = +unidades;
        producto.idUsuario = localStorage.getItem('isLoggedId');
        this.carrito.push(producto);
      }
      
      localStorage.setItem('carrito',JSON.stringify(this.carrito));

      if (this.showDetalle){this.showDetalle = false;}

      document.getElementById("badgeCart").innerHTML = this.carrito.length.toString();

      console.log(this.carrito);
      console.log(JSON.parse(localStorage.getItem('carrito')));
    }
  }
  
  verDetalle(nameProducto:string){
    if (nameProducto.length > 0 && !this.showDetalle){
      this.showDetalle = true;
      this.httpService.getProductos(nameProducto)
      .subscribe(respuesta => {
        if(respuesta.msg == 'OK'){
          this.productoDet = respuesta.productos;
        }
      });
    }else{
      this.showDetalle = false;
    }
  }
}
