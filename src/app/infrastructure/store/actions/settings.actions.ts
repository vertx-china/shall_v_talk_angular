import {createAction, props} from '@ngrx/store';
import {Setting} from "../reducers/settings.reducer";
export const cacheSettings = createAction('[SHALL_V_TALK]SETTING', props<{ setting: Setting }>());
