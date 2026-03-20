import { Component } from '@angular/core';
import { Services } from '../../shared/services/services';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-record-component',
  imports: [CommonModule],
  templateUrl: './record-component.html',
  styleUrl: './record-component.css',
})
export class RecordComponent {

  records: any = {};

  constructor(private service: Services) { }

  //Init para obtener los datos del historial
  ngOnInit() {
    this.service.getData().subscribe({
      next: (data) => {
        this.records = data;
      },
      error: (err) => {
        console.log('Error al obtener datos del historial:', err);
      }
    });
  }


}
