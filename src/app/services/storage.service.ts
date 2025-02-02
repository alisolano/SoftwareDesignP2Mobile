import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import CordovaSQLiteDriver from 'localforage-cordovasqlitedriver';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    await this.storage.defineDriver(CordovaSQLiteDriver);
    this._storage = await this.storage.create();

    console.log('Driver en uso:', this._storage.driver);
  }

  async set(key: string, value: any): Promise<void> {
    if (this._storage) {
      try {
        await this._storage.set(key, value);
        console.log(`${key} guardada exitosamente`);
      } catch (error) {
        console.log("No se logró almacenar el valor");
      }
      
      return;
    }

    console.log("No se ha iniciado un almacenamiento");
  }

  async get(key: string): Promise<any> {
    if (this._storage) {
      try {
        const value = await this._storage.get(key);
        console.log(`Valor en ${key} obtenido`);
        return value;
      } catch (error) {
        console.log("No se logró encontrar llave");
        return null;
      }
    }

    console.log("No se ha iniciado un almacenamiento");
    return null;
  }

  async remove(key: string): Promise<void> {
    if (this._storage) {
      try {
        await this._storage.remove(key);
        console.log(`Almacenamiento de ${key} exitoso`);
      } catch (error) {
        console.log("No se logró almacenar el valor");
      }
      
      return;
    }

    console.log("No se ha iniciado un almacenamiento");
  }

  async clear(): Promise<void> {
    if (this._storage) {
      try {
        await this._storage.clear();
        console.log("Limpieza de alamcenamiento exitosa");
      } catch (error) {
        console.log("No se logró limpiar el almacenamiento");
      }
      
      return;
    }

    console.log("No se ha iniciado un almacenamiento");
  }
}
