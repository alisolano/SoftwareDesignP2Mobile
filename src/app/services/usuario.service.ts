import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Usuario } from '../models/usuario';
import { StorageService } from './storage.service';
import { BehaviorSubject, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  API_URL = environment.API;
  private _isAuthenticated = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this._isAuthenticated.asObservable();

  constructor(private http: HttpClient, private storage: StorageService) {
    this.verificarToken();
  }

  async verificarUsuario(correo: string, password: string) {
    const observable = this.http.get<{ msg: String; data: Usuario | null }>(
      `${this.API_URL}/public/usuario/verificar?correo=${correo}&password=${password}`
    );

    observable.subscribe((res) => {
      this.saveToken(res.data?._id);
    });

    return firstValueFrom(observable);
  }

  async saveToken(token: any): Promise<void> {
    await this.storage.set("user-token", token);
    this.verificarToken();
  }

  async getToken(): Promise<{ msg: String; data: Usuario }> {
    const token = await this.storage.get("user-token");
    const observable = this.http.get<{ msg: String; data: Usuario }>(
      `${this.API_URL}/public/usuario/unique/${token}`
    );

    return firstValueFrom(observable);
  }

  async removeToken(): Promise<void> {
    await this.storage.remove("user-token");
    this.verificarToken();
  }

  verificarToken() {
    this.getToken().then((token) => {
      this._isAuthenticated.next(token != null);
    });
  }
}
