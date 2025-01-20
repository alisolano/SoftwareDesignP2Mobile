import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CountryServiceRoutingModule } from './carros-routing.module';

import { carrosPage } from './carros.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CountryServiceRoutingModule,
    ComponentsModule
  ],
  declarations: [carrosPage] 
})
export class CarrosPageModule {}
