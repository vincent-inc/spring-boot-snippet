import { Component, OnInit } from '@angular/core';
import { Field } from '../app.component';

@Component({
  selector: 'app-spring-boot-v02',
  templateUrl: './spring-boot-v02.component.html',
  styleUrls: ['./spring-boot-v02.component.scss']
})
export class SpringBootV02Component implements OnInit {

  packageName: string = '';
  entityName: string = '';
  fields: Field[] = [];
  numberOfField: number = 0;

  constructor() { }

  ngOnInit() {
  }
  
  updateFieds() : void
  {
    while(this.fields.length > this.numberOfField)
      this.fields.pop();

    while(this.fields.length < this.numberOfField)
    {
      let field: Field = {dataType: "String", name: "name" + this.fields.length}
      this.fields.push(field);
    }
  }

}
