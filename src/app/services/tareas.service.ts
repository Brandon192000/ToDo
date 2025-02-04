import { Usuario } from './../interface/usuario.interface';
import { Tarea } from './../interface/tarea.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TareasService {

  private urlAPI: string = 'https://jsonplaceholder.typicode.com';

  constructor(private http: HttpClient) { }

  public obtenerTareas(): Observable<Tarea[]> {
    const url: string = `${this.urlAPI}/todos`;

    return this.http.get<any>(url)
    .pipe(

      map((response) => {

        console.log("tareas:", response);

        return response.map((item: any) => ({

          id: item.id,
          userId: item.userId,
          title: item.title,
          completed: item.completed

        }));

      }),
      catchError((error) => {

        console.error('Error obteniendo tareas', error);
        return of([]); // devuelvo un array vacio en caso de error

      })
    );
  }

  public obtenerTareaPorId(id: number): Observable<Tarea | null> {

    const url: string = `${this.urlAPI}/todos/${id}`;

    return this.http.get<any>(url)
    .pipe(

      map((item: any) => ({

        id: item.id,
        userId: item.userId,
        title: item.title,
        completed: item.completed

      }) as Tarea),///nuevo objeto

      catchError((e) => {

        console.error(`Error obteniendo tarea con ID ${id}`, e);
        return of(null);

      })
    );
  }

  // obtengo el usuario que tiene asignada una tarea
  public obtenerUsuarioPorId(idUsuario: number): Observable<Usuario | null> {

    const url: string = `${this.urlAPI}/users/${idUsuario}`;

    return this.http.get<any>(url)

    .pipe(

      map((item: any) => ({

        id: item.id,
        name: item.name,
        email: item.email,
        phone: item.phone,

      }) as Usuario),

      catchError((e) => {

        console.error(`Error obteniendo usuario con ID ${idUsuario}`, e);
        return of(null);

      })
    );
  }


  public filtrarTareas(tareas: Tarea[], buscar: string): Tarea[] {
    try {

      if (!buscar.trim()) {

        return [...tareas];

      }

      return tareas.filter(tarea =>

        tarea.title.toLowerCase()
          .includes(buscar.toLowerCase())
      );

    } catch (e) {

      console.error("Error a la hora de buscar la tarea", e);
      return [];

    }
  }




}



