import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ActivityOption } from '../@types/Idle';
import { Activity } from '../@types/redux/store';

// Read in past state from localStorage if possible
const getInitialState = (): Activity => {
    const baseInitialState: Activity = {
        when: Date.now(),
        lastRun: Date.now(),
        id: ActivityOption.IDLE,
        duration: 0,
    };
    const activity = localStorage.getItem('activity');

    if (!activity)
        return baseInitialState;

    const parsed = JSON.parse(activity);
    parsed.lastRun = Date.now();

    return parsed;
};

type ActivityPayload = Omit<Activity, 'when' | 'lastRun'>;

export const slice = createSlice({
    name: 'activity',
    initialState: getInitialState(),
    reducers: {
        changeActivity: (state: Activity, { payload }: PayloadAction<ActivityPayload>) => {
            const { id, duration } = payload;
            state.when = Date.now();
            state.lastRun = Date.now();
            state.id = id;
            state.duration = duration;
        },
        clearActivity: (state: Activity) => {
            state.when = Date.now();
            state.lastRun = Date.now();
            state.id = ActivityOption.IDLE;
            state.duration = 0;
        },
        updateActivity: (state: Activity) => {
            state.lastRun = Date.now();
        },
    },
});

export const { changeActivity, clearActivity, updateActivity } = slice.actions;
export const { reducer }  = slice;
export default slice.reducer;
