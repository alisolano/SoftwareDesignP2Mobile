import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
  standalone: false,
})
export class UserPage implements OnInit {
  public user: Usuario | null = null;

  constructor(private authService: UsuarioService, private router: Router) { }

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    this.authService.user$.subscribe((res) => {
      this.user = res;
    });
  }

  logout() {
    this.router.navigate(["/home"], { replaceUrl: true });
    this.authService.removeToken();
  }
}
