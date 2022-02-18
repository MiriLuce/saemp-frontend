import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        data: {
            title: 'Tesorería'
        },
        children: [
            {
                path: '',
                redirectTo: 'pago-cuotas'
            },
            {
                path: 'pago-cuotas',
                loadChildren: () => import('./payment/payment.module').then(m => m.PaymentModule)
            },
            {
                path: 'cobranza',
                loadChildren: () => import('./collection/collection.module').then(m => m.CollectionModule)
            },
            {
                path: 'reporte',
                loadChildren: () => import('./report/report.module').then(m => m.ReportModule)
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TreasuryRoutingModule { }
