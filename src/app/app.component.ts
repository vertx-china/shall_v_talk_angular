import {Component} from '@angular/core';
import {filter, map, mergeMap} from "rxjs";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent {
  bg: string = 'https://www.wallpaperup.com/uploads/wallpapers/2016/10/03/1022492/63c97c977402a371a9bc4ec000704a83.jpg';

  constructor(
    private router: Router,
    private route: ActivatedRoute) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.route),
      map(route => {
        while (route.firstChild) {
          route = route.firstChild;
        }
        return route;
      }),
      mergeMap(route => {
        return route.data;
      }),
    ).subscribe((route: any) => {
      window.document.title = route.title;
    });
  }
}
