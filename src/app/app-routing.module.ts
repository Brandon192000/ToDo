import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PendientesComponent } from './pages/pendientes/pendientes.component';
import { CompletadasComponent } from './pages/completadas/completadas.component';
import { DetallesComponent } from './pages/detalles/detalles.component';
import { AboutComponent } from './pages/about/about.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

const routes: Routes = [

  {
     path: '',
      component: HomeComponent
  },
  {
    path: 'pendientes',
    component: PendientesComponent
  },
  {
    path: 'completadas',
     component: CompletadasComponent
  },
  {
    path: 'detalles/:id',
    component: DetallesComponent
  },
  {
    path: 'about',
     component: AboutComponent
  },
  {
    path: '**',
    component: NotFoundComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
