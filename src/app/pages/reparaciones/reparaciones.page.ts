import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { Reparacion } from 'src/app/models/reparacion';
import { ReparacionesService } from 'src/app/services/reparaciones.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-reparaciones',
  templateUrl: './reparaciones.page.html',
  styleUrls: ['./reparaciones.page.scss'],
  standalone: false,
})
export class ReparacionesPage implements OnInit {
  state: string = "";
  isAuthenticated = true;
  reparaciones: Reparacion[] = [];
  map: Map<string, Reparacion[]> = new Map();

  constructor(private authService: UsuarioService, private reparacionesService: ReparacionesService, private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.init();
  }

  init() {
    this.reparacionesService.reparaciones$.subscribe((value) => {
      this.map = value;
    })

    this.authService.isAuthenticated$.subscribe((value) => {
      this.isAuthenticated = value;
    })
    
    this.activatedRoute.params.subscribe((params) => {
      this.state = params['state'];
      this.reparaciones = this.map.get(this.state) || [];
    });
  }

  async selectElem(state: string, target: EventTarget | null) {
    document.querySelectorAll(".menu-item").forEach(item => item.classList.remove("selected"));
    const elem = target as HTMLElement;
    elem.classList.add("selected");

    await this.router.navigate(["reparaciones", state], { replaceUrl: true });
    console.log(this.state);
  }

  getReparaciones() {
    const array = this.map.get(this.state);
  }
  
}
