import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FundDetailModalComponent } from '../../shared/component/fund-detail-modal-component/fund-detail-modal-component';
import { Services } from '../../shared/services/services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-component',
  imports: [FundDetailModalComponent, CommonModule],
  templateUrl: './home-component.html',
  styleUrl: './home-component.css',
})
export class HomeComponent implements OnInit {

  selectedFund: any = null;
  infoUser: any = {};

  constructor(private service: Services, private router: Router) { }

  //init para obtener los datos
  ngOnInit() {
    this.service.getData().subscribe({
      next: (data) => {
        this.infoUser = data;
        console.log(data)
      },
      error: (err) => {
        console.log('Error al obtener datos:', err);
      }
    });
  }

  //abre modal para detalles y cancelacion
  openModal(fund: any) {
    this.selectedFund = fund;
  }

  //cierra modal para detalles y cancelacion
  closeModal() {
    this.selectedFund = null;
  }

  //metodo para redirigir los botones de "ver fondos" y "ver historial"
  redirect(url:string){
    this.router.navigate([url]);
  }
}
