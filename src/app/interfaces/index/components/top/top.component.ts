import {Component, OnInit} from '@angular/core';
import {formatDate, getTime} from "../../../../infrastructure/utils";

@Component({
  selector: 'app-top',
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.less']
})
export class TopComponent implements OnInit {

  active: string = 'light';
  time: any = null;

  constructor() {
   setInterval(() => {
      this.time = formatDate(getTime());
    }, 1000);
  }

  ngOnInit(): void {
  }

  changeTheme() {
    this.active = this.active == 'light' ? 'dark' : 'light';
  }
}
