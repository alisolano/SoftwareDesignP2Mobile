import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-countryCapPage',
  templateUrl: './carros.page.html',
  styleUrls: ['./carros.page.scss'],
})
export class carrosPage implements OnInit {
  constructor(
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {
  }
  
}

