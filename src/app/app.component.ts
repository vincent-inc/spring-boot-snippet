import { Component } from '@angular/core';
import { VARIABLE } from './shared/models/Constants';

export interface Field
{
  dataType?: string;
  name?: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'spring-boot-snipset';
  select = "spring-boot";
}
