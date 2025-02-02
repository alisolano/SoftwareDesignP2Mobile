import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Reparacion } from '../models/reparacion';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { UsuarioService } from './usuario.service';

@Injectable({
  providedIn: 'root'
})
export class ReparacionesService {
  private _reparaciones = new BehaviorSubject<Map<string, Reparacion[]>>(new Map());
  reparaciones$ = this._reparaciones.asObservable();
  API_URL = environment.API;
  headers = new HttpHeaders({
    "ngrok-skip-browser-warning": "true",
    "Cache-Control": "no-cache",
    "Pragma": "no-cache"
  });

  constructor(private authService: UsuarioService, private http: HttpClient) {
    this.init();
  }

  init() {
    this.getCarros();
  }

  async getReparacionesPorCarro(id: string) {
    const headers = this.headers;
    
    const observable = this.http.get<{ msg: String; data: Reparacion[] }>(
      `${this.API_URL}/public/reparacion/show/${id}`,
      { headers }
    );

    return firstValueFrom(observable);
  }

  async approveReparacion(id: string, state: string) {
    const headers = this.headers;
    
    const observable = this.http.put<{msg: String}>(
      `${this.API_URL}/public/reparacion/approve/${id}?state=${state}`,
      { headers }
    );

    observable.subscribe((res) => {
      console.log(res.msg);
    })
  }

  getCarros() {
    this.authService.user$.subscribe((user) => {
      if (user == null) {
        this._reparaciones.next(new Map());
      }

      if (user?.carros){
        this._reparaciones.getValue().set("pending", []);
        this._reparaciones.getValue().set("declined", []);
        this._reparaciones.getValue().set("approved", []);
        this._reparaciones.getValue().set("repairing", []);
        this._reparaciones.getValue().set("completed", []);

        for (const idCarro of user.carros) {
          this.getReparacionesPorCarro(idCarro).then((res) => {
            console.log(res);
            res.data.map(x => this.saveReparacion(x));
          })
        }
      }
    });
  }

  saveReparacion(reparacion: Reparacion) {
    if (reparacion.aprobado == "pending") {
      this._reparaciones.getValue().get("pending")?.push(reparacion);
      return;
    }
    if (reparacion.aprobado == "declined") {
      this._reparaciones.getValue().get("declined")?.push(reparacion);
      return;
    }
    if (reparacion.estado == "Reparando") {
      this._reparaciones.getValue().get("repairing")?.push(reparacion);
      return;
    }
    if (reparacion.estado == "Finalizado") {
      this._reparaciones.getValue().get("completed")?.push(reparacion);
      return;
    }

    this._reparaciones.getValue().get("approved")?.push(reparacion);
  }
}
