import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Services {

  //data y variables necesarias para calculos
  private data = {
    balance: 500000,
    funds: [
      { id: 1, name: "FPV_BTG_PACTUAL_RECAUDADORA", amount: 75000, type: "FPV" },
      { id: 2, name: "FPV_BTG_PACTUAL_ECOPETROL", amount: 125000, type: "FPV", },
      { id: 3, name: "DEUDAPRIVADA", amount: 50000, type: "FIC" },
      { id: 4, name: "FDO-ACCIONES", amount: 250000, type: "FIC" },
      { id: 5, name: "FPV_BTG_PACTUAL_DINAMICA", amount: 100000, type: "FPV" }
    ],
    subscribedFunds: [] as any[],
    transactions: [] as any[]
  };

  private dataSubject = new BehaviorSubject(this.data);
  data$ = this.dataSubject.asObservable();

  getData() {
    return this.data$;
  }

  // SUSCRIBIRSE
  subscribeFund(fund: any, amount: number) {

    if (!amount || amount <= 0) {
      throw new Error('El monto debe ser mayor a 0');
    }
    if (amount > this.data.balance) {
      throw new Error('Saldo insuficiente');
    }
    if (amount < fund.amount) {
      throw new Error(`El monto mínimo para este fondo es ${fund.amount}`);
    }

    this.data.balance -= amount;

    const existing = this.data.subscribedFunds.find(f => f.id === fund.id);

    if (existing) {
      existing.amount += amount;
    } else {
      this.data.subscribedFunds.push({ ...fund, minAmount: fund.amount, amount: amount });
    }

    this.data.transactions.push({
      id: Date.now(),
      type: 'SUSCRITO',
      fundName: fund.name,
      amount: amount,
      date: new Date()
    });

    this.dataSubject.next({
      ...this.data,
      subscribedFunds: [...this.data.subscribedFunds],
      transactions: [...this.data.transactions]
    });
  }

  //CANCELAR SUSCRIPCION
  cancelFund(fundId: number) {

    const fund = this.data.subscribedFunds.find(f => f.id === fundId);

    if (fund) {

      this.data.balance += fund.amount;
      this.data.transactions.push({
        id: Date.now(),
        type: 'CANCELADA',
        fundName: fund.name,
        amount: fund.amount,
        date: new Date()
      });

      this.data.subscribedFunds = this.data.subscribedFunds.filter(f => f.id !== fundId);
      this.dataSubject.next(this.data);
    }
  }
}