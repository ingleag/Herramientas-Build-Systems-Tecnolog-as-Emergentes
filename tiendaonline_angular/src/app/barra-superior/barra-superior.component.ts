import { Component, OnInit } from '@angular/core';

import {Router} from "@angular/router";

@Component({
  selector: 'barra-superior',
  templateUrl: './barra-superior.component.html',
  styleUrls: ['./barra-superior.component.css']
})
export class BarraSuperiorComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }

  OnSalir(){
    localStorage.setItem('isLoggedIn', "false");
    localStorage.setItem('carrito',"");
  }

  verPedido(){
    this.router.navigate(['pedido']);
  }
}
