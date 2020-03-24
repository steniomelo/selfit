import { Component, OnInit, Input } from '@angular/core';

import { environment } from '@env/environment';
import { Credentials, CredentialsService } from '../core/authentication/credentials.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-areadoaluno',
  templateUrl: './areadoaluno.component.html',
  styleUrls: ['./areadoaluno.component.scss']
})
export class AreadoalunoComponent implements OnInit {
  menuHidden = true;
  credentials: Credentials;

  constructor(private credentialsService: CredentialsService, private spinner: NgxSpinnerService) {
    //this.credentials = this.credentialsService.credentials;
  }

  ngOnInit() {
    this.credentials = this.credentialsService.credentials;
  }

  toggleMenu() {
    this.menuHidden = !this.menuHidden;
  }

  getCredentials() {
    console.log('Atualizar credentials component');
    this.credentials = this.credentialsService.credentials;
  }
}
