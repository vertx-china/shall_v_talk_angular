import {createSelector} from '@ngrx/store';
import {Setting} from '../reducers/settings.reducer';

const selectSetting = (state: Setting):any => state;

export const getSetting = createSelector(selectSetting, (state: Setting): any => state);
