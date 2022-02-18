import { NgModule } from '@angular/core';

// Routing
import { DiscountRoutingModule } from './discount-routing.module';

import { DiscountComponent } from './discount.component';

@NgModule({
    imports: [
        DiscountRoutingModule
    ],
    declarations: [
        DiscountComponent
    ]
})
export class DiscountModule { }
