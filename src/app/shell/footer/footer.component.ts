import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { I18nService } from '@app/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  menuHidden = true;
  @Input() activeRoute: any;

  constructor(private router: Router, private i18nService: I18nService) {}

  ngOnInit() {}
}
