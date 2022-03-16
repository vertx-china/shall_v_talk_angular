import {Component, Input, OnInit} from '@angular/core';
import {LIGHT} from "../../../../infrastructure/config";
import {Setting} from "../../../../infrastructure/store/reducers/settings.reducer";

@Component({
  selector: 'app-right',
  templateUrl: './right.component.html',
  styleUrls: ['./right.component.less']
})
export class RightComponent implements OnInit {
  @Input() setting: Setting = <any>{};

  constructor() {
  }

  ngOnInit(): void {
  }

}
