import { Component } from '@angular/core';
import { Tarea } from '../../interface/tarea.interface';
import { TareasService } from '../../services/tareas.service';

@Component({
  selector: 'app-completadas',
  standalone: false,

  templateUrl: './completadas.component.html',
  styleUrl: './completadas.component.css'
})
export class CompletadasComponent {

  public tareas: Tarea[] = [];
  public filtrar: Tarea[] = [];
  public buscar: string = "";

  constructor(private tareasService: TareasService) {}

  ngOnInit(): void {

    this.tareasService.obtenerTareas()
    .subscribe(data => {

      this.tareas = data.filter(tarea => tarea.completed);
      this.filtrar = [...this.tareas];

    });
  }

  public buscarTarea(): void {

    try {

      this.filtrar = this.tareasService.
        filtrarTareas(this.tareas, this.buscar);

    } catch (e) {

      console.error("Error a la hora de buscar la tarea", e)

    }

  }

}
