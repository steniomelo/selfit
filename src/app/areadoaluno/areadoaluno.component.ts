import { Component, OnInit } from '@angular/core';

import { environment } from '@env/environment';

@Component({
  selector: 'app-areadoaluno',
  templateUrl: './areadoaluno.component.html',
  styleUrls: ['./areadoaluno.component.scss']
})
export class AreadoalunoComponent implements OnInit {
  menuHidden = true;

  constructor() {}

  ngOnInit() {}

  toggleMenu() {
    this.menuHidden = !this.menuHidden;
  }
}
