import { NgModule } from '@angular/core';

// Routing
import { CollectionRoutingModule } from './collection-routing.module';

import { CollectionComponent } from './collection.component';

@NgModule({
    imports: [
        CollectionRoutingModule
    ],
    declarations: [
        CollectionComponent
    ]
})
export class CollectionModule { }
