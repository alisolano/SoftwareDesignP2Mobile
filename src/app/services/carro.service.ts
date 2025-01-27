import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Carro } from '../models/carro';  
import { StorageService } from './storage.service';
import { BehaviorSubject, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarroService {
  API_URL = environment.API;
  private _carros = new BehaviorSubject<Carro[]>([]);
  carros$ = this._carros.asObservable();

  constructor(private http: HttpClient, private storage: StorageService) {
    this.cargarCarros();
  }

  async cargarCarros() {
    const token = await this.storage.get('user-token');
    if (token) {
      this.getCarrosByUserId(token).then(carros => {
        this._carros.next(carros);
      });
    }
  }

  async getCarrosByUserId(token: string): Promise<Carro[]> {
    const observable = this.http.get<{ msg: string, data: Carro[] }>(
      `${this.API_URL}/public/carro/${token}`
    );

    const response = await firstValueFrom(observable);
    return response.data || [];
  }
}
