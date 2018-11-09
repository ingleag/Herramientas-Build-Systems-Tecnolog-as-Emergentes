import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private httpClient : HttpClient) { }

  login(usuario: any): Observable<any>{
    const datos = 'data=' + JSON.stringify(usuario);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/x-www-form-urlencoded; charset=UTF-8'
      })
    }
    return this.httpClient.post<any>('http://localhost/tiendaonline/server/check_login.php', datos, httpOptions);
  }

  getProductos(searchValue: string): Observable<any>{
    const datos = 'data=' + searchValue;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/x-www-form-urlencoded; charset=UTF-8'
      })
    }
    return this.httpClient.post<any>('http://localhost/tiendaonline/server/getproductos.php', datos, httpOptions)
  }

  setPedido(pedido: any): Observable<any>{
    const datos = 'data=' + JSON.stringify(pedido);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/x-www-form-urlencoded; charset=UTF-8'
      })
    }
    return this.httpClient.post<any>('http://localhost/tiendaonline/server/setPedidos.php', datos, httpOptions);
  }
}
