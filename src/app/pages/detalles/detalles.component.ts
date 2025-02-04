import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TareasService } from '../../services/tareas.service';
import { Tarea } from '../../interface/tarea.interface';
import { Usuario } from '../../interface/usuario.interface';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  standalone: false,
  styleUrls: ['./detalles.component.css']
})
export class DetallesComponent implements OnInit {
  tarea: Tarea | null = null;
  usuario: Usuario | null = null;

  constructor(private route: ActivatedRoute, private tareasService: TareasService
  ) {}

  ngOnInit(): void {

    const tareaId = Number(this.route.snapshot.paramMap.get('id'));


    this.tareasService.obtenerTareaPorId(tareaId)
    .subscribe(data => { // obtengo detalles de la tarea

      this.tarea = data;

      if (this.tarea) {

        this.tareasService.obtenerUsuarioPorId(this.tarea.userId)
        .subscribe(user => {// obtengo detalles del usuario asignado a la

          this.usuario = user;

        });
      }

    });
  }
}
