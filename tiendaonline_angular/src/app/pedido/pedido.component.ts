import { Component, OnInit } from '@angular/core';
import { HttpService } from '.././http.service';
import {Router} from "@angular/router";

@Component({
  selector: 'pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.css']
})
export class PedidoComponent implements OnInit {
  carrito: any[] = localStorage.getItem('carrito').length > 0 ? JSON.parse(localStorage.getItem('carrito')) : [];
  totalPedido = 0;
  
  constructor(private httpService: HttpService, private router: Router) { }

  ngOnInit() {
    this.carrito.forEach((value) => {this.totalPedido += (value.unidadCompra * value.precio);});
    //this.totalPedido = this.formatNumber.new(this.totalPedido, "$");
    if (this.carrito.length > 0){
      document.getElementById("badgeCart").innerHTML = this.carrito.length.toString();
    }else{
      document.getElementById("badgeCart").innerHTML = '0';
    }
  }
  
  formatNumber = {
    separador: ".", // separador para los miles
    sepDecimal: ',', // separador para los decimales
    formatear:function (num){
      num +='';
      var splitStr = num.split('.');
      var splitLeft = splitStr[0];
      var splitRight = splitStr.length > 1 ? this.sepDecimal + splitStr[1] : '';
      var regx = /(\d+)(\d{3})/;
      while (regx.test(splitLeft)) {
        splitLeft = splitLeft.replace(regx, '$1' + this.separador + '$2');
      }
      return this.simbol + splitLeft +splitRight;
    },
    new:function(num, simbol){
      this.simbol = simbol ||'';
      return this.formatear(num);
    }
  }

  confirmarPedido(){
    this.httpService.setPedido(this.carrito)
      .subscribe(respuesta => {
        if(respuesta.msg == 'OK'){
          alert("El pedido se grabo satisfactoriamente.");
          localStorage.setItem('carrito',"");
          this.router.navigate(['principal']);
        }else{
          alert(respuesta.msg);
        }
      });
  }
}
