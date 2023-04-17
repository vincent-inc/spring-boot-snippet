import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SpringBootComponent } from './spring-boot/spring-boot.component';
import { AngularComponent } from './angular/angular.component';
import { OpenFiegnComponent } from './open-fiegn/open-fiegn.component';
import { SpringBootV02Component } from './spring-boot-v02/spring-boot-v02.component';
import { NgEssentialModule } from './shared/module/ng-essential.module';
import { NgMaterialModule } from './shared/module/ng-material.module';
import { NgComponentModule } from './shared/module/ng-component.module';

@NgModule({
  declarations: [				
    AppComponent,
      SpringBootComponent,
      AngularComponent,
      OpenFiegnComponent,
      SpringBootV02Component
   ],
  imports: [
    NgEssentialModule,
    NgMaterialModule,
    NgComponentModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
