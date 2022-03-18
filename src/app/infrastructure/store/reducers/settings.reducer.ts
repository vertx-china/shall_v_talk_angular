import {Action, createReducer, on} from '@ngrx/store';
import {cacheSettings} from './../actions';
import {SETTING} from "../../config";
import {storage} from "../../utils";


export interface Setting {
  animation: boolean;
  inInit: boolean;
  theme: string;
  nickname?: string;
}

let set = storage.getItem(SETTING);
export const setting: any = JSON.parse(set);

const reducer = createReducer(
  setting,
  on(cacheSettings, (state: Setting, {setting}) => {
    let obj: Setting = <any>{};
    obj = Object.assign(obj, setting);
    storage.setItem(SETTING, JSON.stringify(obj));
    return ({
      animation: obj.animation,
      inInit: obj.inInit,
      theme: obj.theme,
      nickname: obj.nickname
    });
  })
);

export function cacheSettingsReducer(state: Setting, action: Action) {
  return reducer(state, action);
}
