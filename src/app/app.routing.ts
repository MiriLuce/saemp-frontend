import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
import { DefaultLayoutComponent } from './containers';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/login.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: '404',
    component: P404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    component: P500Component,
    data: {
      title: 'Error 500'
    }
  },
  {
    path: 'iniciar-sesion',
    component: LoginComponent,
    data: {
      title: 'iniciar Sesión'
    }
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Inicio'
    },
    children: [
      {
        path: 'estudiantes',
        loadChildren: () => import('./views/students/students.module').then(m => m.StudentsModule)
      },
      {
        path: 'planificacion-institucional',
        loadChildren: () => import('./views/institutional-planning/institutional-planning.module').then(m => m.InstitutionalPlanningModule)
      },
      {
        path: 'tesoreria',
        loadChildren: () => import('./views/treasury/treasury.module').then(m => m.TreasuryModule)
      },
      {
        path: 'home',
        loadChildren: () => import('./views/home/home.module').then(m => m.HomeModule)
      }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
