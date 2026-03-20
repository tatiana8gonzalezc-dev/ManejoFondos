import { Component, Input, Output, ElementRef, EventEmitter, HostListener } from '@angular/core';
import { Services } from '../../services/services';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-fund-detail-modal-component',
  imports: [CommonModule],
  templateUrl: './fund-detail-modal-component.html',
  styleUrl: './fund-detail-modal-component.css',
})
export class FundDetailModalComponent {
  @Input() fund: any;
  @Output() clickOutside = new EventEmitter<void>();
  errorMessage: string = '';

  constructor(private service: Services, private router: Router) { }

    // Botón de cerrar popup
    close() {
      this.clickOutside.emit();
    }

    //metodo para cancelar la suscripcion
    cancel(fund: any) {
    try {
      this.errorMessage = '';
      this.service.cancelFund(fund.id);
      console.log('Cancelación exitosa', {fund});
      Swal.fire({icon: 'success',text: 'Cancelación exitosa' });
      this.close()
      this.router.navigate(["/"]);

    } catch (error: any) {
      console.log('Error en la cancelación:', error.message);
      this.errorMessage = error.message;
    }
  }

}
