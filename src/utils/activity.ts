import { assertNever } from './typescript';
import { AppDispatch } from '../store';
import { ActivityOption } from '../@types/Idle'; 

import { updateActivity } from '../redux/activity';
import { getItem } from '../redux/inventory';
import { getExperience } from '../redux/experience';

// TODO this should be renamed and have all action info, not just trees
import { TreeClasses } from '../data/Trees';

export const execActivity = (dispatch: AppDispatch, activity: ActivityOption) => {
    const currentTree = TreeClasses.find(t => t.activity === activity);

    if (currentTree) {
        const result = currentTree.onComplete();
        if (result.loot)
            dispatch(getItem(result.loot));
        if (result.experience)
            dispatch(getExperience(result.experience));
        dispatch(updateActivity());
    }
};
