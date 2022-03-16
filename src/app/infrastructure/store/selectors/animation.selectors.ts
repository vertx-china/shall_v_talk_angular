import {createSelector} from '@ngrx/store';

import {AnimationState} from '../reducers/animation.reducer';

const selectPlayerStates = (state: AnimationState) => state;

export const getAnimatioVisible = createSelector(selectPlayerStates, (state: AnimationState): any => state.isVisible);
