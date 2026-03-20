import { Component, OnInit} from '@angular/core';
import { ModalSubscriptionComponent } from '../../shared/component/modal-subscription-component/modal-subscription-component';
import { CommonModule } from '@angular/common';
import { Services } from '../../shared/services/services';

@Component({
  selector: 'app-funds-component',
  imports: [ModalSubscriptionComponent, CommonModule],
  templateUrl: './funds-component.html',
  styleUrl: './funds-component.css',
})
export class FundsComponent implements OnInit{
  openDetail: any = null;
  funds: any = {};

  constructor(private service: Services) { }

  //Init para llamar el metodo con lod datos de los fondos
  ngOnInit() {
    this.service.getData().subscribe({
      next: (data) => {
        this.funds = data;
      },
      error: (err) => {
        console.log('Error al obtener datos de los fondos:', err);
      }
    });
  }


  //abre popup para suscribirse
  openSubscribe(fund: any) {
      this.openDetail = fund;
  }

  //cierra el popup para suscribirse
  closeModal() {
      this.openDetail = null;
    }

}
