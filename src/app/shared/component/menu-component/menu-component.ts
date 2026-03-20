import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-component',
  imports: [],
  templateUrl: './menu-component.html',
  styleUrl: './menu-component.css',
})
export class MenuComponent {

  constructor(private router: Router) { }

  //metodo para desplazarse por las opciones del menu
  redirect(url:string){
    this.router.navigate([url]);
  }
  
}
