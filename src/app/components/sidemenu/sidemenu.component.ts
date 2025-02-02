import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.scss'],
  standalone: false,
})
export class SidemenuComponent  implements OnInit {

  constructor(private controller: MenuController) { }

  ngOnInit() {}

  cerrarMenu() {
    this.controller.close();
  }

}
