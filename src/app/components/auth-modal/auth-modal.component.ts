import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-auth-modal',
  templateUrl: './auth-modal.component.html',
  styleUrls: ['./auth-modal.component.scss'],
  standalone: false,
})
export class AuthModalComponent {
  email: string = '';
  password: string = '';

  constructor(private modalController: ModalController, private usuarioService: UsuarioService) {}

  async dismissModal() {
    await this.modalController.dismiss();
  }

  onSubmit() {
    let email = document.getElementById("emailInput") as HTMLInputElement;
    let password = document.getElementById("passwordInput") as HTMLInputElement;
    
    if (email?.value.trim() === "") {
      alert("Por favor, ingrese un correo electrónico.");
      return;
    }
    if (password?.value.trim() === "") {
      alert("Por favor, ingrese una contraseña.");
      return;
    }
    
    console.log('Correo:', this.email);
    console.log('Contraseña:', this.password);
    
    const promise = this.usuarioService.verificarUsuario(this.email, this.password);
    promise.then((res) => {
      alert(res.msg);
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
