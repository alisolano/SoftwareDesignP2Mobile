import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-reparaciones',
  templateUrl: './reparaciones.page.html',
  styleUrls: ['./reparaciones.page.scss'],
})
export class ReparacionesPage implements OnInit {
    constructor(
      private loadingCtrl: LoadingController
    ) {}

  ngOnInit() {;
  }

  
}
