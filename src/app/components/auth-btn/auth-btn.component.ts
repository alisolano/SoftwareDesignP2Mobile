import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthModalComponent } from '../auth-modal/auth-modal.component';
import { ModalController } from '@ionic/angular';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-auth-btn',
  templateUrl: './auth-btn.component.html',
  styleUrls: ['./auth-btn.component.scss'],
})
export class AuthBtnComponent  implements OnInit {
  public isAuthenticated: boolean = false;

  constructor(private modalController: ModalController, private router: Router, private authService: UsuarioService) { }

  ngOnInit() {
    this.authService.isAuthenticated$.subscribe((value) => {
      this.isAuthenticated = value;
    })
  }

  async logBtn() {
    if (this.isAuthenticated) {
      this.router.navigate(["/user"]);
    } else {
      const modal = await this.modalController.create({
      component: AuthModalComponent,
    });
    await modal.present();
    }
  }

}
