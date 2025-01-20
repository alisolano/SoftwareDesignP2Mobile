import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-auth-modal',
  templateUrl: './auth-modal.component.html',
  styleUrls: ['./auth-modal.component.scss']
})
export class AuthModalComponent {
  email: string = '';
  password: string = '';

  constructor(private modalController: ModalController) {}

  dismissModal() {
    this.modalController.dismiss();
  }

  onSubmit() {
    console.log('Correo:', this.email);
    console.log('Contraseña:', this.password);
    // validar con base
    this.dismissModal(); 
  }

  passwordType: string = 'password';
  passwordIcon: string = 'eye-off'; 

passwordVisibility() {
  if (this.passwordType === 'password') {
    this.passwordType = 'text';
    this.passwordIcon = 'eye';
  } else {
    this.passwordType = 'password';
    this.passwordIcon = 'eye-off';
}

}
}
