import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { CarroService } from 'src/app/services/carro.service';
import { Carro } from 'src/app/models/carro';

@Component({
  selector: 'app-countryCapPage',
  templateUrl: './carros.page.html',
  styleUrls: ['./carros.page.scss'],
})
export class carrosPage implements OnInit {
  carros: Carro[] = [];
  loading: boolean = true;
  
  constructor(
    private loadingCtrl: LoadingController,
    private carroService: CarroService
  ) {}

  ngOnInit() {
    this.loadCarros();
  }

  loadCarros(){
  this.carroService.carros$.subscribe((carros: Carro[]) => {
    this.carros = carros;
    this.loading = false;
  })
}
}

