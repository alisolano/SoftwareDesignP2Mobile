import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UsuarioService } from '../../services/usuario.service';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-auth-modal',
  templateUrl: './auth-modal.component.html',
  styleUrls: ['./auth-modal.component.scss']
})
export class AuthModalComponent {
  email: string = '';
  password: string = '';

  constructor(private modalController: ModalController, private usuarioService: UsuarioService, private storage: StorageService) {}

  dismissModal() {
    this.modalController.dismiss();
  }

  onSubmit() {
    console.log('Correo:', this.email);
    console.log('Contraseña:', this.password);
    
    const promise = this.usuarioService.verificarUsuario(this.email, this.password);
    promise.then((res) => {
      const user = res.data;

      console.log(res.msg);
      console.log(user);
    });

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
