import { Component, OnInit } from '@angular/core';

import { environment } from '@env/environment';

@Component({
  selector: 'app-areadoaluno-meuperfil',
  templateUrl: './areadoaluno.meuperfil.component.html',
  styleUrls: ['./areadoaluno.component.scss']
})
export class AreadoalunoMeuperfilComponent implements OnInit {
  editing: boolean = false;
  constructor() {}

  ngOnInit() {}

  edit() {
    this.editing = true;
  }

  cancel() {
    this.editing = false;
  }
}
