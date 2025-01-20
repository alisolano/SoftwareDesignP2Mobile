import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AuthModalComponent } from 'src/app/auth-modal/auth-modal.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  constructor(private modalController: ModalController) {}

  async openAuthModal() {
    const modal = await this.modalController.create({
      component: AuthModalComponent,
    });
    await modal.present();
  }
}
