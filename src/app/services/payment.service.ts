import { Injectable } from '@angular/core';
import axios from 'axios';
@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  constructor() {}

  makePayment(stripeToken) {
    const url = 'http://localhost:3000/api/payments/checkout';
    axios.post(url, { token: stripeToken });
  }
}
