import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
    ActivityOption,
    ItemQuantity,
    Skill,
    ExperienceDrop,
} from '../@types/Idle';

import { Inventory, Experience } from '../@types/redux/store';

import { Item } from '../data/Items';

// Read in past state from localStorage if possible
const getInitialState = (): Experience => {
    const lsExperience = localStorage.getItem('experience');

    const emptyExperience: Experience = {
        [Skill.CHOPPING]: 0,
        [Skill.BURNING]: 0,
    };

    if (!lsExperience)
        return emptyExperience;

    return JSON.parse(lsExperience);
};


type ExperiencePayload = ExperienceDrop[];

export const slice = createSlice({
    name: 'activity',
    initialState: getInitialState(),
    reducers: {
        getExperience: (state: Experience, { payload }: PayloadAction<ExperienceDrop[]>) => {
            payload.forEach(exp => {
                const [ skill, quantity ] = exp;
                state[skill] = (state[skill] || 0) + quantity;
            });
        },
        mergeExperience: (state: Experience, { payload }: PayloadAction<Experience>) => {
            Object.entries(payload).forEach(exp => {
                const [ skill , quantity ] = exp;
                state[skill as Skill] = (state[skill as Skill] || 0) + (quantity || 0);
            });
        },
    },
});

export const { getExperience, mergeExperience } = slice.actions;
export const { reducer }  = slice;
export default slice.reducer;
