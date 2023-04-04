import { Component, OnInit } from '@angular/core';

interface endpoint {
  method: string;
  path: string;
  
}

@Component({
  selector: 'app-open-fiegn',
  templateUrl: './open-fiegn.component.html',
  styleUrls: ['./open-fiegn.component.scss']
})
export class OpenFiegnComponent implements OnInit {

  input = "";
  output = "";



  constructor() { }

  ngOnInit() {
  }

  generateOutput(): void
  {
    let inputs = this.input.split("\n");

    console.log(inputs);
  }

}
