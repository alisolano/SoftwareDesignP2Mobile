import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  private _user = new BehaviorSubject<Usuario | null>(null);
  private _isAuthenticated = new BehaviorSubject<boolean>(false);
  user$ = this._user.asObservable();
  isAuthenticated$ = this._isAuthenticated.asObservable();
  headers = new HttpHeaders({
    "ngrok-skip-browser-warning": "true",
    "Cache-Control": "no-cache",
    "Pragma": "no-cache"
  });

  constructor(private http: HttpClient, private storage: StorageService) {
    this.verificarToken();
  }

  async verificarUsuario(correo: string, password: string) {
    const headers = this.headers;

    const observable = this.http.get<{ msg: string; id: string }>(
      `${this.API_URL}/public/usuario/verificar?correo=${correo}&password=${password}`,
      { headers }
    );

    observable.subscribe(async (res) => {
      await this.saveToken(res.id);
    });

    return firstValueFrom(observable);
  }

  async saveToken(token: any): Promise<void> {
    await this.storage.set("user-token", token);
    this.verificarToken();
  }

  async getToken(): Promise<{ msg: String; data: Usuario } | null> {
    const token = await this.storage.get("user-token");

    if (token == null) {
      return null;
    }

    const headers = this.headers;
    const observable = this.http.get<{ msg: String; data: Usuario }>(
      `${this.API_URL}/public/usuario/unique/${token}`,
      { headers }
    );

    return firstValueFrom(observable);
  }

  async removeToken(): Promise<void> {
    await this.storage.remove("user-token");
    this.verificarToken();
  }

  async verificarToken() {
    this.getToken().then((res) => {
      this._user.next(res?.data || null);
      this._isAuthenticated.next(res != null);
    });
  }
}
