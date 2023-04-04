import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularMaterialModule } from './shared/modules/AngularMaterial.module';
import { SpringBootComponent } from './spring-boot/spring-boot.component';
import { AngularComponent } from './angular/angular.component';
import { OpenFiegnComponent } from './open-fiegn/open-fiegn.component';

@NgModule({
  declarations: [			
    AppComponent,
      SpringBootComponent,
      AngularComponent,
      OpenFiegnComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularMaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
