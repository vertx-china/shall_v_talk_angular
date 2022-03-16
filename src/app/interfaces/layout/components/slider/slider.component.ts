import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {CommonService, storage} from "../../../../infrastructure/utils";
import {NICKNAME} from "../../../../infrastructure/config";

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.less']
})
export class SliderComponent implements OnInit {
  active: any = 1;
  menus: any = [
    {icon: 'chat', path: 'index'},
    {icon: 'setting', path: 'init'},
  ];

  constructor(private router: Router,
              private readonly commentService: CommonService) {
  }

  ngOnInit(): void {
  }

  navtoPage(menu: any, index: any): void {
    if (storage.getItem(NICKNAME)) {
      this.navigateByUrl(menu.path);
      this.active = index;
    }
  }

  exit(): void {
    storage.removeItem(NICKNAME);
    window.location.reload();
  }

  navigateByUrl(url: string) {
    this.router.navigateByUrl(url, {replaceUrl: true});
  }
}
