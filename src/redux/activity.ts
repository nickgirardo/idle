import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ActivityOption } from '../@types/Idle';
import { Activity } from '../@types/redux/store';

// Read in past state from localStorage if possible
const getInitialState = (): Activity => {
    const baseInitialState: Activity = {
        when: Date.now(),
        id: ActivityOption.IDLE,
        duration: 0,
    };
    const activity = localStorage.getItem('activity');

    if (!activity)
        return baseInitialState;

    return JSON.parse(activity);
};

type ActivityPayload = Omit<Activity, 'when'>;

export const slice = createSlice({
    name: 'activity',
    initialState: getInitialState(),
    reducers: {
        changeActivity: (state: Activity, { payload }: PayloadAction<ActivityPayload>) => {
            const { id, duration } = payload;
            state.when = Date.now();
            state.id = id;
            state.duration = duration;
        },
        clearActivity: (state: Activity) => {
            state.when = Date.now();
            state.id = ActivityOption.IDLE;
            state.duration = 0;
        },
    },
});

export const { changeActivity, clearActivity } = slice.actions;
export const { reducer }  = slice;
export default slice.reducer;
