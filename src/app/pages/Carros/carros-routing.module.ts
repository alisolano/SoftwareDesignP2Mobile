import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { carrosPage } from './carros.page';

const routes: Routes = [
  {
    path: '',
    component: carrosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CountryServiceRoutingModule {}
