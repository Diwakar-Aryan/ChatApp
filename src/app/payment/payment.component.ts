import { Component } from '@angular/core';
import { PaymentService } from '../services/payment.service';
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent {
  paymentHandler: any = null;

  constructor(private paymentService: PaymentService) {}

  ngOnInit() {
    this.invokeStripe();
  }
  makePayment(amount: number) {
    this.paymentHandler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51ORUZoSCrku6xn0v3Wq5fCOqEZAxGYpoOewtwn5Q8Mh8SoO4DcG9i4OqMGTuKmFSBYwWqL51OvXDKE7H3Yqe2IKr00ZjVMiFxy',
      locale: 'auto',
      token: function (stripeToken) {
        console.log(stripeToken, 'here');
        paymentStripe(stripeToken);
      },
    });
    const paymentStripe = async (stripeToken) => {
      let data = await this.paymentService.makePayment(stripeToken);
      console.log(data);
    }
    this.paymentHandler.open({
      name: 'ChatShare',
      description: 'A simple friendly app',
      amount: amount * 100,
    });
  }
  invokeStripe() {
    if (!window.document.getElementById('stripe-script')) {
      const script = window.document.createElement('script');
      script.id = 'stripe-script';
      script.type = 'text/javascript';
      script.src = 'https://checkout.stripe.com/checkout.js';
      script.onload = () => {
        this.paymentHandler = (<any>window).StripeCheckout.configure({
          key: 'pk_test_51ORUZoSCrku6xn0v3Wq5fCOqEZAxGYpoOewtwn5Q8Mh8SoO4DcG9i4OqMGTuKmFSBYwWqL51OvXDKE7H3Yqe2IKr00ZjVMiFxy',
          locale: 'auto',
          token: function (stripeToken: any) {
            console.log(stripeToken);
          },
        });
      };
      window.document.body.appendChild(script);
    }
  }

}
