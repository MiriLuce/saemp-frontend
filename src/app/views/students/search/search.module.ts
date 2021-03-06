import { NgModule } from '@angular/core';

// Routing
import { SearchRoutingModule } from './search-routing.module';

import { SearchComponent } from './search.component';

@NgModule({
    imports: [
        SearchRoutingModule
    ],
    declarations: [
        SearchComponent
    ]
})
export class SearchModule { }
