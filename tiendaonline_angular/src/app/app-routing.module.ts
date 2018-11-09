import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PrincipalComponent } from './principal/principal.component';
import { PedidoComponent } from './pedido/pedido.component';

const routes: Routes = [
  {path:'', component:LoginComponent},
  {path:'principal', component:PrincipalComponent},
  {path:'pedido', component:PedidoComponent},
  {path:'**', redirectTo:'principal'}
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  declarations: [],
  exports:[
    RouterModule
  ]
})
export class AppRoutingModule { }
