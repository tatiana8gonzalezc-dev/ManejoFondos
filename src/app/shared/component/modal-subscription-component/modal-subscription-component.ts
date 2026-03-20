import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Services } from '../../services/services';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-subscription-component',
  imports: [FormsModule, CommonModule],
  templateUrl: './modal-subscription-component.html',
  styleUrl: './modal-subscription-component.css',
})
export class ModalSubscriptionComponent {

  @Input() openDetail: any;
  @Output() clickClose = new EventEmitter<void>();
  amount: number = 0;
  errorMessage: string = '';

  constructor(private service: Services, private router: Router) { }

  //cerrar popup suscribirse
  close() {
    this.clickClose.emit();
  }

  //metodo para suscribirse
  subscribe(fund: any) {
    try {
      this.errorMessage = '';

      this.service.subscribeFund(fund, this.amount);

      console.log('Suscripción exitosa', {fund, amount: this.amount });
      Swal.fire({icon: 'success',text: 'Suscripción exitosa' });
      this.close()
      this.router.navigate(["/"]);

    } catch (error: any) {
      console.log('Error en la suscripción:', error.message);
      this.errorMessage = error.message;
    }
  }

}
