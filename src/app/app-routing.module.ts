import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SpringBootComponent } from './spring-boot/spring-boot.component';
import { OpenFiegnComponent } from './open-fiegn/open-fiegn.component';
import { AngularComponent } from './angular/angular.component';
import { SpringBootV02Component } from './spring-boot-v02/spring-boot-v02.component';

const routes: Routes = [
  {
    path: 'spring_boot',
    component: SpringBootComponent
  },
  {
    path: 'openfiegn',
    component: OpenFiegnComponent
  },
  {
    path: 'angular',
    component: AngularComponent
  },
  {
    path: 'spring_boot_v02',
    component: SpringBootV02Component
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
