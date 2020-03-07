import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-faleconosco-divulgue',
  templateUrl: './faleconosco.divulgue.component.html',
  styleUrls: ['./faleconosco.component.scss']
})
export class FaleconoscoDivulgueComponent implements OnInit {
  faleconoscoForm!: FormGroup;

  constructor() {}

  ngOnInit() {}

  faleconosco() {
    console.log('Enviou');
  }
}
