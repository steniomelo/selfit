import { Component, OnInit } from '@angular/core';

import { environment } from '@env/environment';
import { Credentials, CredentialsService } from '../core/authentication/credentials.service';

@Component({
  selector: 'app-areadoaluno',
  templateUrl: './areadoaluno.component.html',
  styleUrls: ['./areadoaluno.component.scss']
})
export class AreadoalunoComponent implements OnInit {
  menuHidden = true;
  credentials: Credentials;

  constructor(private credentialsService: CredentialsService) {
    //this.credentials = this.credentialsService.credentials;
  }

  ngOnInit() {
    this.credentials = this.credentialsService.credentials;
    console.log(this.credentials);
  }

  toggleMenu() {
    this.menuHidden = !this.menuHidden;
  }
}
