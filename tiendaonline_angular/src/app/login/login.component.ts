import { Component, OnInit } from '@angular/core';
import { HttpService } from '.././http.service';

import {Router} from "@angular/router";

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private httpService: HttpService, private router: Router) { }

  ngOnInit() {
    localStorage.setItem('isLoggedIn', "false");
  }

  enviarForm(form){
    //this.data = this.dataService.login(form.value);
    //this.dataService.login(form.value);
    this.httpService.login(form.value)
      .subscribe(respuesta => {
        if (respuesta['msg'] == 'OK'){
          //alert('Bienvenido');
          localStorage.setItem('isLoggedIn', "true");
          localStorage.setItem('isLoggedId', respuesta['id']);
          this.router.navigate(['principal']);
        }else{
          localStorage.setItem('isLoggedIn', "false");
          alert(respuesta['msg']);
        }
      });
  }
}
