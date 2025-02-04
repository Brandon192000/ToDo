import { Component, OnInit } from '@angular/core';
import { Tarea } from '../../interface/tarea.interface';
import { TareasService } from '../../services/tareas.service';

@Component({
  selector: 'app-pendientes',
  standalone: false,

  templateUrl: './pendientes.component.html',
  styleUrl: './pendientes.component.css'
})
export class PendientesComponent implements OnInit{

  public tareas: Tarea[]=[];
  public filtrar: Tarea[]=[];
  public buscar:string = "";

  constructor(private tareaServ: TareasService){}

  ngOnInit(): void {

    this.tareaServ.obtenerTareas()
    .subscribe(data => {

      console.log("tareas recibidas:", data);

      this.tareas = data

        .filter(tarea =>
          tarea.completed === false);
          
          this.filtrar = [...this.tareas];//copio las tareas para ir filtrandolas

      console.log("tareas filtradas", this.tareas);

    });
  }

  public buscarTarea(): void {

    try {

      this.filtrar = this.tareaServ
          .filtrarTareas(this.tareas, this.buscar);

    } catch (e) {

      console.error("Error a la hora de buscar la tarea", e)

    }


  }


}
