import {ActionReducerMap, MetaReducer} from '@ngrx/store';
import {AnimationState, changeVisibleReducer} from './animation.reducer';
import {environment} from "../../../../environments/environment";

export interface State {
  isVisible: AnimationState;
}

export const reducers: ActionReducerMap<any> = {
  isVisible: changeVisibleReducer,
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
