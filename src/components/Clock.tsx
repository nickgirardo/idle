import { ReactElement, useEffect } from 'react';

import { useSelector } from 'react-redux';

import { useAppDispatch } from '../store';
import { Store } from '../@types/redux/store';
import { ActivityOption } from '../@types/Idle';

import { execActivity } from '../utils/activity';

import { changeActivity, clearActivity } from '../redux/activity';
import { TreeClasses } from '../data/Trees';
import Tree from './Tree';

export default ():ReactElement => {
    const dispatch = useAppDispatch();
    const currentActivity = useSelector((state: Store) => state.activity);

    useEffect(() => {
        const duration = currentActivity.duration;
        if (!duration)
            return;

        const timer = setInterval(() => execActivity(dispatch, currentActivity.id), duration);

        return () => clearInterval(timer);
    });

    return <></>;
}
