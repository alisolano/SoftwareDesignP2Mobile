import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {
  public user: Usuario | null = null;

  constructor(private authService: UsuarioService) { }

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    this.authService.getToken().then((res) => {
      this.user = res.data;
      console.log(res.msg);
    });
  }
}
