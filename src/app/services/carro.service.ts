import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Carro } from '../models/carro';  
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { UsuarioService } from './usuario.service';

@Injectable({
  providedIn: 'root'
})
export class CarroService {
  API_URL = environment.API;
  private _carros = new BehaviorSubject<Carro[]>([]);
  carros$ = this._carros.asObservable();
  headers = new HttpHeaders({
    "ngrok-skip-browser-warning": "true",
    "Cache-Control": "no-cache",
    "Pragma": "no-cache"
  });

  constructor(private http: HttpClient, private authService: UsuarioService) {
    this.cargarCarros();
  }

  async cargarCarros() {
    this.authService.user$.subscribe((value) => {
      const token = value?._id;

      if (token) {
        this.getCarrosByUserId(token).then(carros => {
          this._carros.next(carros);
        });
      }
    });
    
  }

  async getCarrosByUserId(token: string): Promise<Carro[]> {
    const headers = this.headers;

    const observable = this.http.get<{ msg: string, data: Carro[] }>(
      `${this.API_URL}/public/carro/${token}`,
      { headers }
    );

    const response = await firstValueFrom(observable);
    return response.data || [];
  }
}
