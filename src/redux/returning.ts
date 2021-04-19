import { createSlice } from '@reduxjs/toolkit';

import { Returning, Activity, Experience, Inventory } from '../@types/redux/store';
import { ActivityOption, Skill, ExperienceDrop } from '../@types/Idle';
import { TreeClasses } from '../data/Trees';

const claimedState: Returning = {
    claimed: true,
    experience: {},
    inventory: {},
};

// Return the number of activity executions that a user missed in their time away
// Note that the time away is capped at one day
const getMissedActivities = (activity: Activity): number => {
    // Ms in a day
    const dayInMilliseconds = 86400000;
    // How much time was the player away for (at most one day)
    const timeAway = Math.min(Date.now() - activity.lastRun, dayInMilliseconds);
    // How many activities were missed
    return Math.floor(timeAway / activity.duration);
};

export const calcReturningInv = (activity: Activity): Inventory => {
    const activitiesMissed = getMissedActivities(activity);

    const currentTree = TreeClasses.find(t => t.activity === activity.id);
    if (!currentTree)
        return {};

    const tempInventory: Inventory = {};
    
    const newLoot = new Array(activitiesMissed).fill(0)
        .map(() => currentTree.onComplete().loot);

    newLoot.forEach(loots => {
        if (!loots)
            return;

        loots.forEach(loot => {
            const [ item, quantity ] = loot;
            tempInventory[item] = (tempInventory[item] || 0) + quantity;
        });
    });

    return tempInventory;
};

export const calcReturningExp = (activity: Activity): Experience => {
    const activitiesMissed = getMissedActivities(activity);

    const currentTree = TreeClasses.find(t => t.activity === activity.id);

    if (!currentTree)
        return {};

    const isExpDrop = (exp: ExperienceDrop[] | undefined): exp is ExperienceDrop[] =>
        Boolean(exp);

    const mergeExp = (a: Experience, b: Experience): Experience => {
        const ret: Experience = {};

        Object.entries(a).forEach(([skill, quantity]) => {
            ret[skill as Skill] = (ret[skill as Skill] || 0) + (quantity || 0);
        });

        Object.entries(b).forEach(([skill, quantity]) => {
            ret[skill as Skill] = (ret[skill as Skill] || 0) + (quantity || 0);
        });

        return ret;
    };
    
    return new Array(activitiesMissed).fill(0)
        .map(() => currentTree.onComplete().experience)
        .filter(isExpDrop)
        .reduce((acc: Experience, expDrop) => {
            const newExp = expDrop.reduce((acc: Experience, [skill, exp]) => {
                acc[skill as Skill] = (acc[skill as Skill] || 0) + exp;
                return acc;
            }, {} as Experience);

            return mergeExp(acc, newExp);
        }, {} as Experience);
};

const getInitialState = () => {
    const lsActivity = localStorage.getItem('activity');

    if (!lsActivity)
        return claimedState;

    const activity = JSON.parse(lsActivity);


    const experience = calcReturningExp(activity);
    const inventory = calcReturningInv(activity);

    // TODO these should be elsewhere
    const isEmptyExperience = (experience: Experience): boolean =>
        Object.keys(experience).length === 0;

    const isEmptyInventory = (inventory: Inventory): boolean =>
        Object.keys(inventory).length === 0;

    if (isEmptyExperience(experience) && isEmptyInventory(inventory))
        return claimedState;

    return ({
        claimed: false,
        experience,
        inventory,
    });
};

export const slice = createSlice({
    name: 'activity',
    initialState: getInitialState(),
    reducers: {
        claimReturning: (state: Returning) => {
            state.claimed = true;
            state.experience = {};
            state.inventory = {};
        },
    },
});

export const { claimReturning } = slice.actions;
export const { reducer }  = slice;
export default slice.reducer;
