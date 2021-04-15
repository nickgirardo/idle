import { ReactElement } from 'react';

import { useSelector } from 'react-redux';

import { useAppDispatch } from '../store';
import { Store } from '../@types/redux/store';
import { TreeStats, ActivityOption } from '../@types/Idle';

import { changeActivity, clearActivity } from '../redux/activity';
import { TreeClasses } from '../data/Trees';
import Tree from './Tree';

export default (): ReactElement => {
    const dispatch = useAppDispatch();
    const currentActivity = useSelector((store: Store) => store.activity.id);

    const toggleActivity = (tree: TreeStats) => {
        if (tree.activity === currentActivity) {
            dispatch(clearActivity());
        } else {
            dispatch(changeActivity({ id: tree.activity, duration: tree.hardiness }));
        }
    }

    return (
        <div className='trees'>
            {
                TreeClasses.map(t =>
                    <Tree
                        key={ t.name }
                        onClick={ () => toggleActivity(t) }
                        active={ currentActivity === t.activity }
                        { ...t }
                    />
                )
            }
        </div>
    );
};
