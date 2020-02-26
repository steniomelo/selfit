import { Component, OnInit, Input, HostListener, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService, CredentialsService, I18nService, Credentials } from '@app/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  menuHidden = true;
  topActive = false;
  credentials: Credentials;

  @Input() activeRoute: any;
  @Input() closeMenu: any;
  @Input() isAreadoaluno: boolean;

  @HostListener('window:scroll', ['$event']) onScrollEvent($event: any) {
    if (window.pageYOffset > 100) {
      this.topActive = true;
    } else {
      this.topActive = false;
    }
  }

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private credentialsService: CredentialsService,
    private i18nService: I18nService
  ) {}

  ngOnInit() {
    this.credentials = this.credentialsService.credentials;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.credentials = this.credentialsService.credentials;
    this.menuHidden = this.closeMenu;
  }

  toggleMenu() {
    this.menuHidden = !this.menuHidden;
  }

  setLanguage(language: string) {
    this.i18nService.language = language;
  }

  logout() {
    this.authenticationService.logout().subscribe(() => this.router.navigate(['/login'], { replaceUrl: true }));
  }

  get currentLanguage(): string {
    return this.i18nService.language;
  }

  get languages(): string[] {
    return this.i18nService.supportedLanguages;
  }

  get username(): string | null {
    const credentials = this.credentialsService.credentials;
    return credentials ? credentials.nomecliente : null;
  }

  get logado(): boolean {
    return this.credentialsService.isAuthenticated();
  }
}
