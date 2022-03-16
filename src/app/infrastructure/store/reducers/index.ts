import {ActionReducerMap, MetaReducer} from '@ngrx/store';
import {environment} from "../../../../environments/environment";
import {cacheSettingsReducer, Setting} from "./settings.reducer";

export interface State {
  setting: Setting;
}
export const reducers: ActionReducerMap<any> = {
  setting: cacheSettingsReducer,
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
