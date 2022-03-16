import {Action, createReducer, on} from '@ngrx/store';
import {changeVisible} from './../actions';

export interface AnimationState {
  isVisible: boolean;
}

export const initVisibleState: AnimationState = {
  isVisible: true,
};

const reducer = createReducer(
  initVisibleState,
  on(changeVisible, (state: AnimationState) => {
    return ({isVisible: !state.isVisible});
  })
);


export function changeVisibleReducer(state: AnimationState, action: Action) {
  return reducer(state, action);
}
