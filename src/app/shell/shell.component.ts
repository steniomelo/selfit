import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']
})
export class ShellComponent implements OnInit {
  activeRoute: any;
  closeMenu: any;
  isAreadoaluno: any;

  constructor(public router: Router) {
    router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        console.log('ROTEVENTO', event);
        this.closeMenu = true;
        this.activeRoute = event.url;

        if (this.activeRoute.indexOf('areadoaluno') === 1) {
          this.isAreadoaluno = true;
        } else {
          this.isAreadoaluno = false;
        }
      }
    });
    // router.events.subscribe(event:Event => {
    // if(event instanceof NavigationStart) {
    //   console.log(event);
    // }
    // NavigationEnd
    // NavigationCancel
    // NavigationError
    // RoutesRecognized
    // });
  }

  ngOnInit() {}
}
