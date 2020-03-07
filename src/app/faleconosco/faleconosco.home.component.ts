import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-faleconosco-home',
  templateUrl: './faleconosco.home.component.html',
  styleUrls: ['./faleconosco.component.scss']
})
export class FaleconoscoHomeComponent implements OnInit {
  faleconoscoForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.createForm();
  }

  private createForm() {
    this.faleconoscoForm = this.formBuilder.group({
      nome: ['', Validators.required],
      email: ['', Validators.email],
      aluno: ['', Validators.required],
      assunto: ['', Validators.required],
      mensagem: ['', Validators.required]
    });
  }
}
