import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthBtnComponent } from './auth-btn/auth-btn.component';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SidemenuComponent } from './sidemenu/sidemenu.component';
import { RouterModule } from '@angular/router';
import { ReparacionCardComponent } from './reparacion-card/reparacion-card.component';



@NgModule({
  declarations: [
      AuthBtnComponent,
      SidemenuComponent,
      ReparacionCardComponent
    ],
    imports: [
      CommonModule,
      FormsModule,
      IonicModule,
      RouterModule
    ],
    exports: [
      AuthBtnComponent,
      SidemenuComponent,
      ReparacionCardComponent
    ]
})
export class ComponentsModule { }
