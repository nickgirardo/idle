import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
    ActivityOption,
    ItemQuantity,
    Skill,
    ExperienceDrop,
} from '../@types/Idle';

import { Inventory, Experience } from '../@types/redux/store';

import { Item } from '../data/Items';

const initialState: Experience = {
    [Skill.CHOPPING]: 0,
    [Skill.BURNING]: 0,
};

type ExperiencePayload = ExperienceDrop[];

export const slice = createSlice({
    name: 'activity',
    initialState,
    reducers: {
        getExperience: (state: Experience, { payload }: PayloadAction<ExperiencePayload>) => {
            payload.forEach(exp => {
                const [ skill, quantity ] = exp;
                state[skill] = (state[skill] || 0) + quantity;
            });
        },
    },
});

export const { getExperience } = slice.actions;
export const { reducer }  = slice;
export default slice.reducer;
