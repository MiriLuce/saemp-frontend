import { NgModule } from '@angular/core';

// Routing
import { PaymentRoutingModule } from './payment-routing,module';

import { PaymentComponent } from './payment.component';

@NgModule({
    imports: [
        PaymentRoutingModule
    ],
    declarations: [
        PaymentComponent
    ]
})
export class PaymentModule { }
