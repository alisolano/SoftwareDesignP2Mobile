import { Component, Input, OnInit } from '@angular/core';
import { Reparacion } from 'src/app/models/reparacion';
import { ReparacionesService } from 'src/app/services/reparaciones.service';

@Component({
  selector: 'app-reparacion-card',
  templateUrl: './reparacion-card.component.html',
  styleUrls: ['./reparacion-card.component.scss'],
})
export class ReparacionCardComponent  implements OnInit {

  constructor(private reparacionService: ReparacionesService) { }

  @Input() reparacion: Reparacion | null = null;
  @Input() tag: string = "";

  ngOnInit() {}

  aprobarReparacion(state: string) {
    if (this.reparacion) {
      this.reparacionService.approveReparacion(this.reparacion._id, state);
    }    
  }

  tagDeAprobacion() {
    return ["pending", "approved", "declined"].includes(this.tag);
  }

  tagPendiente() {
    return this.tag == "pending";
  }

}
